import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { formatUSD } from "@/lib/catalog";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "convex/react";

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const orders = useQuery(api.orders.myOrders, {});
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                My Account
              </p>
              <h1 className="mt-3 font-display text-4xl md:text-5xl">
                {user?.name || "Welcome"}
              </h1>
              {user?.email && (
                <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="gap-2 self-start tracking-wide-xs uppercase"
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          </div>

          <div className="rule-t mt-12">
            <h2 className="pt-8 font-display text-2xl">Order History</h2>

            {orders === undefined ? (
              <p className="mt-6 text-sm text-muted-foreground">Loading orders…</p>
            ) : orders.length === 0 ? (
              <div className="mt-6 border bg-card p-8 text-center">
                <p className="font-display text-xl">No orders yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your orders will appear here once you make your first purchase.
                </p>
                <Button asChild className="mt-6 tracking-wide-xs uppercase">
                  <Link to="/shop">Shop the Collection</Link>
                </Button>
              </div>
            ) : (
              <ul className="mt-6 space-y-4">
                {orders.map((order) => (
                  <li key={order._id} className="border bg-card">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-4">
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order._creationTime).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={
                            "px-2 py-0.5 text-[11px] uppercase tracking-wide-xs " +
                            (order.status === "paid"
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground")
                          }
                        >
                          {order.status === "paid" ? "Confirmed" : "Processing"}
                        </span>
                        <span className="tabular-nums text-sm">
                          {formatUSD(order.totalCents)}
                        </span>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {order.items.map((item) => (
                          <li key={`${item.slug}-${item.size}`}>
                            {item.name} — {item.size} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/order/${order.orderNumber}`}
                        className="mt-4 inline-block text-xs uppercase tracking-wide-xs underline-offset-4 hover:underline"
                      >
                        View details
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
