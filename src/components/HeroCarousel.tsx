import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "The Wedding Edit",
    title: "Noor",
    subtitle: "Bridal '26",
    cta: "Shop Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "The Wedding Edit",
    title: "Gulnaar",
    subtitle: "Bridal '26",
    cta: "Shop Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "Evening Luxe",
    title: "Zaib",
    subtitle: "Formals '26",
    cta: "Shop Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "Mehndi Season",
    title: "Dhoop",
    subtitle: "Occasion Wear",
    cta: "Shop Now",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[86vh] min-h-[540px] overflow-hidden bg-neutral-950">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          className={
            "absolute inset-0 transition-opacity duration-1000 " +
            (i === index ? "opacity-100" : "opacity-0 pointer-events-none")
          }
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-[center_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
          <div className="absolute inset-x-0 bottom-16 flex flex-col items-center text-center text-white">
            <p className="text-[11px] uppercase tracking-[0.45em] text-white/75">
              {slide.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-6xl font-light md:text-8xl">
              {slide.title}
            </h1>
            <p className="mt-2 text-[13px] uppercase tracking-[0.5em] text-white/85">
              {slide.subtitle}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 border border-white bg-transparent tracking-[0.3em] text-white hover:bg-white hover:text-neutral-900"
              variant="outline"
            >
              <Link to="/shop">{slide.cta}</Link>
            </Button>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={
              "size-2 rounded-full transition-all " +
              (i === index ? "bg-white" : "bg-white/40 hover:bg-white/70")
            }
          />
        ))}
      </div>
    </section>
  );
}
