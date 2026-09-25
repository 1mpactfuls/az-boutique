import { CartCover } from "@/components/CartCover";
import { CartDrawer } from "@/components/CartDrawer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatUSD, getProduct, SIZES } from "@/lib/catalog";
import { Check, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";

export default function ProductPage() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const handleAdd = () => {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-1 text-xs uppercase tracking-wide-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" /> Back to collection
          </Link>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 md:py-16">
          {/* Image */}
          <div>
            <CartCover
              hue={product.hue}
              image={product.image}
              name={product.name}
              className="aspect-[3/4] w-full"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <CartCover
                  key={i}
                  hue={product.hue + i * 8}
                  image={product.image}
                  name={product.name}
                  className="aspect-square w-full"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="md:pt-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              {product.tagline}
            </p>
            <p className="mt-6 text-xl tabular-nums">
              {formatUSD(product.price)}
            </p>

            <Separator className="my-8" />

            {/* Sizes */}
            <div>
              <p className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                Size {product.sizes.includes("Custom") && "— made to measure"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={
                      "min-w-12 border px-4 py-2 text-sm transition-colors " +
                      (size === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
              {size === "Custom" && (
                <p className="mt-3 text-sm text-muted-foreground">
                  After checkout, we'll message you on WhatsApp to take 30+
                  measurements — no tailor needed.
                </p>
              )}
            </div>

            <Button
              size="lg"
              disabled={!size}
              onClick={handleAdd}
              className="mt-8 w-full tracking-wide-xs uppercase"
            >
              {added ? (
                <>
                  <Check className="mr-2 size-4" /> Added to bag
                </>
              ) : (
                "Add to bag"
              )}
            </Button>
            {!size && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Select a size to continue
              </p>
            )}

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  The Story
                </h2>
                <p className="mt-2 text-sm leading-6">{product.description}</p>
              </div>
              <div>
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  Fabric
                </h2>
                <p className="mt-2 text-sm leading-6">{product.fabric}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {product.includes}
                </p>
              </div>
              <div>
                <h2 className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                  Details
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {product.details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm leading-6">
                      <span className="text-muted-foreground">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
