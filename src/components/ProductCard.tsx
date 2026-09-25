import type { Product } from "@/lib/catalog";
import { formatUSD } from "@/lib/catalog";
import { Link } from "react-router";
import { CartCover } from "./CartCover";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block"
      aria-label={`View ${product.name}`}
    >
      <div className="overflow-hidden bg-secondary">
        <CartCover
          hue={product.hue}
          image={product.image}
          name={product.name}
          className="aspect-[3/4] w-full"
        />
      </div>
      <div className="pt-4 text-center">
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground tabular-nums">
          {formatUSD(product.price)}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wide-xs text-transparent transition-colors group-hover:text-muted-foreground">
          Inquire Now
        </p>
      </div>
    </Link>
  );
}
