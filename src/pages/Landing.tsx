import { Button } from "@/components/ui/button";
import { CartCover } from "@/components/CartCover";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CartDrawer } from "@/components/CartDrawer";
import { PRODUCTS, formatUSD } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const REVIEWS = [
  {
    quote:
      "Thank you so much!! Received my package. Dress is so beautiful and stitching is very neat 💕",
    name: "Marium",
    location: "United States",
    initials: "M",
    hue: 340,
  },
  {
    quote:
      "Mashallah.. this suit is very nice.",
    name: "Sameera",
    location: "USA",
    initials: "S",
    hue: 160,
  },
  {
    quote:
      "Ayesha… I received your dresses today. They are stunning and such great fit! I will send you pictures once I wear them.",
    name: "Madhrama",
    location: "United States",
    initials: "M",
    hue: 45,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Choose your piece",
    body: "Browse the collection and pick the silhouette, color and fabric that feel like your day.",
  },
  {
    n: "02",
    title: "Share measurements",
    body: "We guide you through 30+ measurements over WhatsApp or video call — no tailor needed.",
  },
  {
    n: "03",
    title: "Atelier craft",
    body: "Your outfit is cut, embroidered and finished by hand in our Lahore atelier over 4–10 weeks.",
  },
  {
    n: "04",
    title: "DHL to your door",
    body: "Shipped worldwide with DHL Express, duties prepaid to the US. 3–5 days after dispatch.",
  },
];

export default function Landing() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const bridal = PRODUCTS.filter((p) => p.category === "Bridal").slice(0, 2);
  const formals = PRODUCTS.filter((p) => p.category === "Formal").slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <CartDrawer />

      <main className="flex-1">
        <HeroCarousel />

        {/* Zaib-style collection sections */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <h2 className="text-center font-display text-4xl md:text-5xl">
            The Wedding Edit
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-12 sm:grid-cols-2">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="tracking-[0.3em] uppercase"
            >
              <Link to="/shop">View All</Link>
            </Button>
          </div>
        </section>

        {/* Bridal / Formals split, like the reference's titled rows */}
        <section className="border-y bg-card">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
            {[
              { title: "Bridal", items: bridal },
              { title: "Formals", items: formals },
            ].map((group) => (
              <div key={group.title}>
                <h2 className="text-center font-display text-3xl md:text-4xl">
                  {group.title}
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10">
                  {group.items.map((p) => (
                    <Link key={p.slug} to={`/shop/${p.slug}`} className="group">
                      <CartCover
                        hue={p.hue}
                        image={p.image}
                        name={p.name}
                        className="aspect-[3/4] w-full"
                      />
                      <p className="mt-3 text-center font-display text-lg">
                        {p.name}
                      </p>
                      <p className="text-center text-sm text-muted-foreground tabular-nums">
                        {formatUSD(p.price)}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="tracking-[0.25em] uppercase"
                  >
                    <Link to={`/shop?category=${group.title === "Bridal" ? "Bridal" : "Formal"}`}>
                      Shop {group.title}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section id="story" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Our Story
              </p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl leading-tight">
                From a Lahore atelier to brides everywhere
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
                AZ Boutique is the studio of Ayesha Zahid — a small team of
                cutters, embroiderers and finishers who believe couture should
                travel as beautifully as it photographs. Every piece is cut to
                your measurements, checked twice, and packed in our signature
                ivory box.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                We may stitch in Pakistan, but our hearts are with our brides
                in the US — 2,800+ followers and hundreds of dresses delivered
                across America, from Houston to New Jersey.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t pt-8">
                <div>
                  <p className="font-display text-4xl">2,844</p>
                  <p className="mt-1 text-xs uppercase tracking-wide-xs text-muted-foreground">
                    Instagram family
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl">755</p>
                  <p className="mt-1 text-xs uppercase tracking-wide-xs text-muted-foreground">
                    Posts of craft
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl">6 yrs</p>
                  <p className="mt-1 text-xs uppercase tracking-wide-xs text-muted-foreground">
                    Of atelier work
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CartCover
                hue={35}
                image="https://images.unsplash.com/photo-1611464908623-07f19927264e?auto=format&fit=crop&w=900&q=80"
                name="Atelier"
                className="aspect-[3/4]"
              />
              <CartCover
                hue={200}
                image="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80"
                name="Craft"
                className="mt-10 aspect-[3/4]"
              />
              <CartCover
                hue={150}
                image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80"
                name="Details"
                className="aspect-[3/4]"
              />
              <CartCover
                hue={60}
                image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
                name="Bride"
                className="mt-10 aspect-[3/4]"
              />
            </div>
          </div>
        </section>

        {/* Reviews — styled like the IG WhatsApp review highlights */}
        <section id="reviews" className="border-y bg-card">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
            <p className="text-center text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Customer Reviews
            </p>
            <h2 className="mt-3 text-center font-display text-4xl md:text-5xl">
              Loved across the United States
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure
                  key={r.name + r.quote.slice(0, 12)}
                  className="flex flex-col rounded-2xl bg-muted/60 p-7"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-10 items-center justify-center rounded-full font-display text-lg text-white"
                      style={{
                        background: `linear-gradient(135deg, oklch(0.55 0.09 ${r.hue}), oklch(0.42 0.08 ${r.hue}))`,
                      }}
                    >
                      {r.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.location}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-4 text-sm leading-6 text-foreground/90">
                    “{r.quote}”
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            From screen to your wedding week
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="border-t pt-6">
                <p className="font-display text-3xl text-muted-foreground/70">
                  {s.n}
                </p>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-maroon text-maroon-foreground">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
            <p className="text-[11px] uppercase tracking-[0.4em] text-maroon-foreground/70">
              Worldwide Shipping
            </p>
            <h2 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
              Your dress is waiting. Wherever you are.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-maroon-foreground/85">
              Complimentary DHL Express over $2,500 · Duties prepaid to the US ·
              Made-to-measure in 4–10 weeks
            </p>
            <Button
              asChild
              size="lg"
              className="mt-2 border border-white/70 bg-transparent tracking-[0.3em] text-white hover:bg-white hover:text-neutral-900"
              variant="outline"
            >
              <Link to="/shop">Shop the Collection</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
