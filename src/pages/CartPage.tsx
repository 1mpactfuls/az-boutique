import { CartCover } from "@/components/CartCover";
import { CartDrawer } from "@/components/CartDrawer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/catalog";
import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { Link } from "react-router";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotalCents,
    shippingCents,
    totalCents,
    freeShipping,
  } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <h1 className="font-display text-4xl md:text-5xl">Your Bag</h1>

          {items.length === 0 ? (
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <p className="font-display text-2xl">Nothing here yet</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Explore bridal, formal and mehndi wear handmade in Pakistan and
                shipped worldwide.
              </p>
              <Button asChild className="mt-2 tracking-wide-xs uppercase">
                <Link to="/shop">Shop the Collection</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_380px]">
              {/* Line items */}
              <div>
                <ul className="divide-y border-y">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.size}`}
                      className="flex gap-6 py-8"
                    >
                      <Link
                        to={`/shop/${item.slug}`}
                        className="w-24 shrink-0 sm:w-32"
                      >
                        <CartCover
                          hue={item.hue}
                          image={item.image}
                          name={item.name}
                          className="aspect-[3/4] w-full"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-4">
                          <div>
                            <Link
                              to={`/shop/${item.slug}`}
                              className="font-display text-2xl hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 text-xs uppercase tracking-wide-xs text-muted-foreground">
                              {item.category} — Size {item.size}
                            </p>
                          </div>
                          <p className="text-sm tabular-nums">
                            {formatUSD(item.price * item.quantity)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="p-2"
                              onClick={() =>
                                updateQuantity(item.slug, item.size, item.quantity - 1)
                              }
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="p-2"
                              onClick={() =>
                                updateQuantity(item.slug, item.size, item.quantity + 1)
                              }
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug, item.size)}
                            className="flex items-center gap-1 text-xs uppercase tracking-wide-xs text-muted-foreground hover:text-foreground"
                          >
                            <X className="size-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/shop"
                  className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-wide-xs text-muted-foreground hover:text-foreground"
                >
                  Continue shopping
                </Link>
              </div>

              {/* Summary */}
              <aside className="h-fit border bg-card p-8">
                <h2 className="font-display text-2xl">Summary</h2>
                <div className="mt-6 space-y-3 text-sm">
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
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="tabular-nums">{formatUSD(totalCents)}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Duties & taxes prepaid for US orders.
                    </p>
                  </div>
                </div>
                <Button asChild className="mt-8 w-full tracking-wide-xs uppercase">
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <li>— Worldwide DHL Express, 3–5 days after dispatch</li>
                  <li>— Made-to-measure pieces ship in 4–10 weeks</li>
                  <li>— Every order is re-checked by hand before packing</li>
                </ul>
              </aside>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
