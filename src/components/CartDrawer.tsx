import { X } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "@/context/CartContext";
import { formatUSD } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartCover } from "./CartCover";

export function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem, subtotalCents, shippingCents, totalCents, freeShipping } =
    useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
          <SheetTitle className="font-display text-xl tracking-[0.2em] uppercase">
            Your Bag
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <X className="size-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">
              Discover pieces made to measure, shipped worldwide.
            </p>
            <SheetClose asChild>
              <Button asChild className="mt-2 tracking-wide-xs uppercase">
                <Link to="/shop">Shop the Collection</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col divide-y">
                {items.map((item) => (
                  <li key={`${item.slug}-${item.size}`} className="flex gap-4 py-4">
                    <div className="size-20 shrink-0 overflow-hidden bg-secondary">
                      <CartCover hue={item.hue} image={item.image} name={item.name} small />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          to={`/shop/${item.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="font-display text-lg leading-tight hover:underline"
                        >
                          {item.name}
                        </Link>
                        <span className="text-sm">
                          {formatUSD(item.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                        {item.category} — {item.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            className="px-2 py-1 text-sm"
                            onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            className="px-2 py-1 text-sm"
                            onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.size)}
                          className="text-xs uppercase tracking-wide-xs text-muted-foreground underline-offset-4 hover:underline hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t px-6 py-4">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatUSD(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{freeShipping ? "Complimentary" : formatUSD(shippingCents)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1">
                  <span>Total</span>
                  <span>{formatUSD(totalCents)}</span>
                </div>
              </div>
              <SheetClose asChild>
                <Button asChild className="mt-4 w-full tracking-wide-xs uppercase">
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </SheetClose>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Duties & taxes calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
