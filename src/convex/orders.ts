import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Catalog pricing constants — kept in sync with src/lib/catalog.ts
const SHIPPING_FLAT_CENTS = 6500; // $65 DHL Express worldwide
const FREE_SHIPPING_THRESHOLD_CENTS = 250000; // free over $2,500
const PRODUCTS: { slug: string; name: string; price: number }[] = [
  { slug: "noor-gold-velvet-bridal", name: "Noor", price: 385000 },
  { slug: "gulnaar-maroon-bridal", name: "Gulnaar", price: 345000 },
  { slug: "mah-e-noor-ivory-pishwas", name: "Mah-e-Noor", price: 295000 },
  { slug: "shan-e-emerald-velvet-formal", name: "Shan-e-Emerald", price: 165000 },
  { slug: "zohra-chikankari-suit", name: "Zohra", price: 89000 },
  { slug: "raat-ki-raani-black-gown", name: "Raat Ki Rani", price: 135000 },
  { slug: "mehndi-noor-teal-lehenga", name: "Noor-e-Mehndi", price: 185000 },
  { slug: "haldi-sunshine-anarkali", name: "Dhoop", price: 95000 },
  { slug: "shehnai-blush-pret-set", name: "Shehnai", price: 55000 },
  { slug: "afsaneh-ivory-cape-set", name: "Afsaneh", price: 78000 },
];

/**
 * Server-side pricing. The cart is never trusted — every line item is
 * re-priced from the catalog before an order is written.
 */
function priceOrder(items: { slug: string; size: string; quantity: number }[]) {
  const priced = items.map((item) => {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    if (!product) throw new Error(`Unknown product: ${item.slug}`);
    const quantity = Math.max(1, Math.min(10, Math.floor(item.quantity)));
    return {
      slug: product.slug,
      name: product.name,
      size: item.size,
      priceCents: product.price,
      quantity,
    };
  });

  const subtotalCents = priced.reduce(
    (sum, i) => sum + i.priceCents * i.quantity,
    0,
  );
  const shippingCents =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FLAT_CENTS;
  return {
    items: priced,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
  };
}

function orderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AZ-${stamp}-${rand}`;
}

/**
 * Demo-mode payment: in this preview environment there is no live payment
 * processor connected yet, so the "Place order" step validates the order
 * server-side and marks it confirmed. When Stripe keys are added, replace
 * `confirmPayment` with a real PaymentIntent flow — the order record,
 * pricing, and emails below stay the same.
 */
export const placeOrder = mutation({
  args: {
    email: v.string(),
    items: v.array(
      v.object({
        slug: v.string(),
        size: v.string(),
        quantity: v.number(),
      }),
    ),
    shippingAddress: v.object({
      fullName: v.string(),
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      state: v.optional(v.string()),
      postalCode: v.string(),
      country: v.string(),
      phone: v.optional(v.string()),
    }),
    eventDate: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Please sign in to place an order.");
    }

    if (!args.email || !args.email.includes("@")) {
      throw new Error("A valid email is required.");
    }
    if (args.items.length === 0) {
      throw new Error("Your bag is empty.");
    }

    const priced = priceOrder(args.items);

    const orderNumberValue = orderNumber();
    const id = await ctx.db.insert("orders", {
      orderNumber: orderNumberValue,
      userId,
      email: args.email,
      status: "pending",
      items: priced.items,
      subtotalCents: priced.subtotalCents,
      shippingCents: priced.shippingCents,
      totalCents: priced.totalCents,
      currency: "usd",
      shippingAddress: args.shippingAddress,
      eventDate: args.eventDate,
      notes: args.notes,
    });

    return { orderId: id, orderNumber: orderNumberValue, ...priced };
  },
});

/** Demo-mode confirmation — mirrors what a Stripe webhook would do. */
export const confirmOrder = mutation({
  args: { orderId: v.id("orders"), orderNumber: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in.");

    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) {
      throw new Error("Order not found.");
    }
    if (order.orderNumber !== args.orderNumber) {
      throw new Error("Order number mismatch.");
    }
    await ctx.db.patch(args.orderId, { status: "paid" });
    return { status: "paid" as const };
  },
});

export const myOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const orderByNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const order = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) => q.eq("orderNumber", args.orderNumber))
      .first();
    if (!order || order.userId !== userId) return null;
    return order;
  },
});
