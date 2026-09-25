import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { formatUSD } from "@/lib/catalog";
import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router";
import { useQuery } from "convex/react";

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  const order = useQuery(api.orders.orderByNumber, {
    orderNumber: orderNumber ?? "",
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          {order === undefined ? (
            <p className="text-sm text-muted-foreground">Loading your order…</p>
          ) : order === null ? (
            <>
              <h1 className="font-display text-4xl">Order not found</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                We couldn't find this order under your account.
              </p>
              <Button asChild className="mt-8 tracking-wide-xs uppercase">
                <Link to="/shop">Back to the collection</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent">
                <CheckCircle2 className="size-7 text-accent-foreground" />
              </div>
              <h1 className="mt-6 font-display text-4xl md:text-5xl">
                Thank you, {order.shippingAddress.fullName.split(" ")[0] || "bride"}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Order <span className="font-medium text-foreground">{order.orderNumber}</span>{" "}
                is confirmed. We've sent the details to {order.email}.
              </p>

              <div className="mt-12 border bg-card p-8 text-left">
                <h2 className="font-display text-2xl">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">1.</span> Within
                    24 hours, our stylist messages you on WhatsApp to confirm
                    measurements{order.items.some((i) => i.size === "Custom") ? " — please keep your phone nearby" : ""}.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">2.</span> Your
                    piece goes into production at our Lahore atelier.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">3.</span> We
                    send photos before dispatch for your approval.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">4.</span> DHL
                    Express delivers in 3–5 days, duties prepaid to the US.
                  </li>
                </ol>

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                    Order Summary
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {order.items.map((item) => (
                      <li key={`${item.slug}-${item.size}`} className="flex justify-between text-sm">
                        <span>
                          {item.name} — {item.size} × {item.quantity}
                        </span>
                        <span className="tabular-nums">
                          {formatUSD(item.priceCents * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2 border-t pt-4 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="tabular-nums">{formatUSD(order.subtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className="tabular-nums">
                        {order.shippingCents === 0
                          ? "Complimentary"
                          : formatUSD(order.shippingCents)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="tabular-nums">{formatUSD(order.totalCents)}</span>
                    </div>
                  </div>
                  <div className="mt-6 border-t pt-4 text-sm">
                    <p className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                      Shipping to
                    </p>
                    <p className="mt-2 leading-6">
                      {order.shippingAddress.fullName}
                      <br />
                      {order.shippingAddress.line1}
                      {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
                      <br />
                      {order.shippingAddress.city}
                      {order.shippingAddress.state ? `, ${order.shippingAddress.state}` : ""}{" "}
                      {order.shippingAddress.postalCode}
                      <br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline" className="tracking-wide-xs uppercase">
                  <Link to="/account">View My Orders</Link>
                </Button>
                <Button asChild className="tracking-wide-xs uppercase">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
