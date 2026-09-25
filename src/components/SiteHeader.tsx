import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/use-auth";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CartDrawer } from "./CartDrawer";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PRODUCTS } from "@/lib/catalog";

export function SiteHeader() {
  const { count, setCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 6)
    : [];

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Announcement bar — WhatsApp, like the reference */}
      <div className="bg-maroon text-maroon-foreground">
        <p className="mx-auto max-w-7xl px-6 py-2.5 text-center text-[13px]">
          Have any queries? Call/WhatsApp us at{" "}
          <a
            href="https://wa.me/14046901416"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline-offset-4 hover:underline"
          >
            +1 404 690 1416
          </a>
        </p>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Left: hamburger + menu sheet */}
          <div className="flex items-center">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="border-b px-6 py-5">
                  <SheetTitle asChild>
                    <div>
                      <Logo badgeSize={44} />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-6 py-6">
                  {[
                    { label: "Home", to: "/" },
                    { label: "Shop All", to: "/shop" },
                    { label: "Bridal", to: "/shop?category=Bridal" },
                    { label: "Formal", to: "/shop?category=Formal" },
                    { label: "Mehndi", to: "/shop?category=Mehndi" },
                    { label: "Pret", to: "/shop?category=Pret" },
                    { label: "Our Story", to: "/#story" },
                    { label: "Reviews", to: "/#reviews" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => go(item.to)}
                      className="border-b border-border py-4 text-left font-display text-xl tracking-wide"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => go(isAuthenticated ? "/account" : "/auth")}
                    className="mt-6 text-left text-xs uppercase tracking-wide-xs text-muted-foreground"
                  >
                    {isAuthenticated ? "My Account" : "Sign in"}
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: logo lockup */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2"
            aria-label="AZ Boutique home"
          >
            <Logo badgeSize={44} wordmarkClassName="text-xl md:text-2xl" />
          </Link>

          {/* Right: search, account (desktop), bag */}
          <div className="flex items-center gap-1">
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Search">
                  <Search className="size-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="top-20 max-w-xl translate-y-0 p-0 sm:top-24">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle className="font-display text-2xl">
                    Search
                  </DialogTitle>
                </DialogHeader>
                <div className="px-6 pb-6">
                  <Input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search bridal, formal, mehndi…"
                    className="h-11"
                  />
                  {query.trim() && (
                    <ul className="mt-4 max-h-80 divide-y overflow-y-auto">
                      {results.length === 0 ? (
                        <li className="py-6 text-center text-sm text-muted-foreground">
                          Nothing found for “{query}”
                        </li>
                      ) : (
                        results.map((p) => (
                          <li key={p.slug}>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between py-3 text-left hover:bg-muted/50"
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                                navigate(`/shop/${p.slug}`);
                              }}
                            >
                              <span className="font-display text-lg">
                                {p.name}
                              </span>
                              <span className="text-xs uppercase tracking-wide-xs text-muted-foreground">
                                {p.category}
                              </span>
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Link
              to={isAuthenticated ? "/account" : "/auth"}
              className="hidden items-center gap-2 px-3 text-[13px] tracking-wide-xs uppercase text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <User className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center px-3 py-2 text-foreground transition-colors hover:text-muted-foreground"
              aria-label={`Open bag, ${count} items`}
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 right-0 flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
