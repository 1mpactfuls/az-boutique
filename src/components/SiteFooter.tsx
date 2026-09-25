import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo badgeSize={52} />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Bridal & couture womenswear by Ayesha Zahid — atelier-made in
            Pakistan, delivered to brides across the US and worldwide.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com/azboutique_ayeshazahid"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://wa.me/14046901416"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle className="size-4" />
            </a>
            <a
              href="mailto:care@azboutique.com"
              aria-label="Email"
              className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide-xs text-muted-foreground">
            Shop
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:underline" to="/shop">All Pieces</Link></li>
            <li><Link className="hover:underline" to="/shop?category=Bridal">Bridal</Link></li>
            <li><Link className="hover:underline" to="/shop?category=Formal">Formal</Link></li>
            <li><Link className="hover:underline" to="/shop?category=Mehndi">Mehndi</Link></li>
            <li><Link className="hover:underline" to="/shop?category=Pret">Pret</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide-xs text-muted-foreground">
            Client Care
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Worldwide DHL Express — 3–5 days</li>
            <li>Free over $2,500 · $65 flat below</li>
            <li>Made-to-measure in 4–10 weeks</li>
            <li>
              WhatsApp: +1 (404) 690-1416 (US) · +971 50 467 1196 (UAE)
            </li>
            <li>+61 240 229 590 (AUS) · +92 323 665 0889 (PK)</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} AZ Boutique — Ayesha Zahid</p>
          <p>Handmade in Pakistan · Shipped worldwide</p>
        </div>
      </div>
    </footer>
  );
}
