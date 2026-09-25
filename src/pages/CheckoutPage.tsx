import { CartCover } from "@/components/CartCover";
import { CartDrawer } from "@/components/CartDrawer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/context/CartContext";
import { api } from "@/convex/_generated/api";
import { formatUSD } from "@/lib/catalog";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { useMutation } from "convex/react";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "United Arab Emirates",
  "Australia",
  "Saudi Arabia",
  "Germany",
  "Other",
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const placeOrderMutation = useMutation(api.orders.placeOrder);
  const confirmOrderMutation = useMutation(api.orders.confirmOrder);
  const { items, subtotalCents, shippingCents, totalCents, freeShipping, clearCart } =
    useCart();
  const { isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    eventDate: "",
    notes: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (
    key: keyof typeof form,
  ) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  if (items.length === 0 && !placing) {
    return <Navigate to="/cart" replace />;
  }

  const placeOrder = async () => {
    setError(null);

    if (!form.fullName || !form.line1 || !form.city || !form.postalCode) {
      setError("Please complete the shipping details.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("A valid email is required for your order updates.");
      return;
    }

    setPlacing(true);
    try {
      const result = await placeOrderMutation({
        email: form.email,
        items: items.map((i) => ({ slug: i.slug, size: i.size, quantity: i.quantity })),
        shippingAddress: {
          fullName: form.fullName,
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city.trim(),
          state: form.state || undefined,
          postalCode: form.postalCode,
          country: form.country,
          phone: form.phone || undefined,
        },
        eventDate: form.eventDate || undefined,
        notes: form.notes || undefined,
      });

      await confirmOrderMutation({
        orderId: result.orderId,
        orderNumber: result.orderNumber,
      });

      clearCart();
      toast.success("Order placed — check your email for updates.");
      navigate(`/order/${result.orderNumber}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong placing your order.",
      );
      setPlacing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>

          {!isAuthenticated && (
            <div className="mt-6 flex items-center gap-3 border bg-card px-5 py-4 text-sm">
              <Lock className="size-4 shrink-0 text-muted-foreground" />
              <p>
                Please{" "}
                <Link
                  to="/auth?returnTo=%2Fcheckout"
                  className="underline underline-offset-4"
                >
                  sign in
                </Link>{" "}
                to place your order — your bag is saved.
              </p>
            </div>
          )}

          <div className="mt-10 grid gap-16 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <div>
              <section>
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  1 — Contact
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-1.5"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (WhatsApp preferred)</Label>
                    <Input
                      id="phone"
                      className="mt-1.5"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+1 555 000 0000"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  2 — Shipping Address
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      className="mt-1.5"
                      value={form.fullName}
                      onChange={set("fullName")}
                      autoComplete="name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="line1">Address</Label>
                    <Input
                      id="line1"
                      className="mt-1.5"
                      value={form.line1}
                      onChange={set("line1")}
                      autoComplete="address-line1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="line2">Apartment, suite (optional)</Label>
                    <Input
                      id="line2"
                      className="mt-1.5"
                      value={form.line2}
                      onChange={set("line2")}
                      autoComplete="address-line2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      className="mt-1.5"
                      value={form.city}
                      onChange={set("city")}
                      autoComplete="address-level2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      className="mt-1.5"
                      value={form.state}
                      onChange={set("state")}
                      autoComplete="address-level1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">ZIP / Postal code</Label>
                    <Input
                      id="postalCode"
                      className="mt-1.5"
                      value={form.postalCode}
                      onChange={set("postalCode")}
                      autoComplete="postal-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      value={form.country}
                      onChange={set("country") as never}
                      className="mt-1.5 h-9 w-full border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  3 — Your Event (optional)
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="eventDate">Event date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      className="mt-1.5"
                      value={form.eventDate}
                      onChange={set("eventDate")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">Notes for the atelier</Label>
                    <textarea
                      id="notes"
                      value={form.notes}
                      onChange={set("notes")}
                      rows={3}
                      placeholder="Color preferences, sleeve length, dupatta style…"
                      className="mt-1.5 w-full border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    />
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  4 — Payment
                </h2>
                <div className="mt-4 border bg-card p-5 text-sm leading-6 text-muted-foreground">
                  <p>
                    In this preview, orders are confirmed in demo mode — no card
                    is charged. Connect Stripe keys to accept live payments.
                  </p>
                </div>
              </section>

              {error && <p className="mt-6 text-sm text-destructive">{error}</p>}
            </div>

            {/* Summary */}
            <aside className="h-fit border bg-card p-8">
              <h2 className="font-display text-2xl">Your Order</h2>
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={`${item.slug}-${item.size}`} className="flex gap-4">
                    <CartCover
                      hue={item.hue}
                      image={item.image}
                      name={item.name}
                      small
                      className="size-16 shrink-0"
                    />
                    <div className="flex flex-1 items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm tabular-nums">
                        {formatUSD(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-3 border-t pt-6 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatUSD(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping — DHL Express</span>
                  <span className="tabular-nums">
                    {freeShipping ? "Complimentary" : formatUSD(shippingCents)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3 font-medium">
                  <span>Total</span>
                  <span className="tabular-nums">{formatUSD(totalCents)}</span>
                </div>
              </div>
              <Button
                className="mt-8 w-full tracking-wide-xs uppercase"
                onClick={placeOrder}
                disabled={placing || items.length === 0}
              >
                {placing ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Placing…
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Encrypted checkout · USD pricing
              </p>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
