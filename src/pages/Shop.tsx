import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category");

  const filtered = useMemo(() => {
    if (!active) return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="flex-1">
        <header className="border-b">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              The Collection
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">
              {active ? active : "All Pieces"}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Every piece is handmade to order in our Lahore atelier and shipped
              worldwide by DHL Express.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 py-6 text-[13px] uppercase tracking-wide-xs">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={!active ? "text-foreground underline-offset-8 underline" : "text-muted-foreground hover:text-foreground"}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSearchParams({ category: c })}
                className={active === c ? "text-foreground underline-offset-8 underline" : "text-muted-foreground hover:text-foreground"}
              >
                {c}
              </button>
            ))}
            <span className="ml-auto text-xs normal-case tracking-normal text-muted-foreground">
              {filtered.length} piece{filtered.length === 1 ? "" : "s"}
            </span>
          </nav>

          <div className="rule-t grid gap-x-8 gap-y-14 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

        <section className="border-t bg-card">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl">Not sure where to start?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Message us on WhatsApp — we'll help you choose fabric, color
                and silhouette for your event.
              </p>
            </div>
            <Button asChild variant="outline" className="tracking-wide-xs uppercase">
              <Link to="/#story">Talk to a stylist</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
