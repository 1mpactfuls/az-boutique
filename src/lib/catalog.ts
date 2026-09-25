/**
 * AZ Boutique catalog — single source of truth.
 * Prices are in USD cents so order math stays exact.
 * Imported by the frontend pages AND the Convex checkout logic,
 * so the server always re-prices orders from this list.
 */

export type Category = "Bridal" | "Formal" | "Mehndi" | "Pret";

export const CATEGORIES: Category[] = ["Bridal", "Formal", "Mehndi", "Pret"];

export const SIZES = ["XS", "S", "M", "L", "XL", "Custom"] as const;
export type Size = (typeof SIZES)[number];

export const SHIPPING_FLAT_CENTS = 6500; // $65 DHL Express, worldwide
export const FREE_SHIPPING_THRESHOLD_CENTS = 250000; // free over $2,500

export interface Product {
  slug: string;
  name: string;
  category: Category;
  /** price in USD cents */
  price: number;
  tagline: string;
  fabric: string;
  includes: string;
  description: string;
  details: string[];
  /** Unsplash photo */
  image: string | null;
  /** Fallback tone for the art-directed cover block */
  hue: number;
  sizes: readonly string[];
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  {
    slug: "noor-gold-velvet-bridal",
    name: "Noor",
    category: "Bridal",
    price: 385000,
    tagline: "The gold velvet wedding lehenga",
    fabric: "Pure French velvet with zardozi & kora-dabka handwork",
    includes: "Lehenga, embroidered choli & tissue dupatta",
    description:
      "Our signature wedding piece. Deep antique-gold French velvet, hand-embroidered across every panel with zardozi, dabka and sequin work that catches light with every step. Finished with a scalloped tissue dupatta. Made to your measurements over 8–10 weeks.",
    details: [
      "Hand-embroidered zardozi on pure French velvet",
      "Fully lined with can-can flare and inner belt",
      "Hidden zip and hook closure, boned choli",
      "Made to measure — 30+ measurements taken",
      "Completion in 8–10 weeks, shipped by DHL Express",
    ],
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1400&q=80",
    hue: 43,
    sizes: ["Custom"],
    featured: true,
  },
  {
    slug: "gulnaar-maroon-bridal",
    name: "Gulnaar",
    category: "Bridal",
    price: 345000,
    tagline: "The classic maroon baraat lehenga",
    fabric: "Raw silk with antique dabka, tilla & kundan work",
    includes: "Lehenga, choli & net dupatta with embroidered border",
    description:
      "A timeless baraat lehenga in deep maroon raw silk, embroidered in antique gold dabka, tilla and kundan. The silhouette is a full circle with a heavily embroidered border — the lehenga brides ask for again and again.",
    details: [
      "Raw silk base, antique-gold hand embroidery",
      "Kundan and sequin highlights on border and choli",
      "Four-meter flare with structured waistband",
      "Made to measure over 8–10 weeks",
    ],
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80",
    hue: 355,
    sizes: ["Custom"],
    featured: true,
  },
  {
    slug: "mah-e-noor-ivory-pishwas",
    name: "Mah-e-Noor",
    category: "Bridal",
    price: 295000,
    tagline: "Ivory organza pishwas for the nikkah",
    fabric: "Crisp organza with pearl, tilla & chikankari-inspired work",
    includes: "Long pishwas, inner silk slip & organza dupatta",
    description:
      "For the nikkah bride who wants softness over drama. Ivory organza flows into a floor-length pishwas, hand-finished with pearls and tonal embroidery. Light as air, photographed beautifully against any backdrop.",
    details: [
      "Crisp imported organza, silk inner slip included",
      "Pearl and tilla handwork across panels",
      "Comes with matching organza dupatta",
      "Available in ivory, blush and powder blue",
    ],
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1400&q=80",
    hue: 40,
    sizes: ["Custom"],
    featured: true,
  },
  {
    slug: "shan-e-emerald-velvet-formal",
    name: "Shan-e-Emerald",
    category: "Formal",
    price: 165000,
    tagline: "Emerald velvet maxi with golden work",
    fabric: "Deep emerald velvet with antique gold embroidery",
    includes: "Floor-length maxi & embroidered net dupatta",
    description:
      "The walima showstopper. Rich emerald velvet cut into a floor-length flared maxi, bordered with antique gold embroidery and finished with a sheer net dupatta. Wears beautifully under winter lights.",
    details: [
      "Premium emerald velvet, fully lined",
      "Antique gold border and cuff embroidery",
      "Flared silhouette with side pockets",
      "Ready-to-ship sizes, minor alterations possible",
    ],
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1400&q=80",
    hue: 165,
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    featured: true,
  },
  {
    slug: "zohra-chikankari-suit",
    name: "Zohra",
    category: "Formal",
    price: 89000,
    tagline: "Chikankari lawn three-piece",
    fabric: "Hand-dyed lawn with chikankari embroidery",
    includes: "Shirt, trousers & chiffon dupatta",
    description:
      "Understated and elegant — our chikankari three-piece in hand-dyed lawn with delicate white-on-tone embroidery. The one you'll reach for at every lunch and dholki.",
    details: [
      "Hand-dyed premium lawn",
      "Chikankari hand embroidery on front, back & sleeves",
      "Dyed-to-match trousers and chiffon dupatta",
      "Ready-to-ship in standard sizes",
    ],
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1400&q=80",
    hue: 205,
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
  {
    slug: "raat-ki-raani-black-gown",
    name: "Raat Ki Rani",
    category: "Formal",
    price: 135000,
    tagline: "Midnight black net gown with sitara work",
    fabric: "Layered net with hand-scattered sitara & pearl",
    includes: "Gown with inner slip & tasseled dupatta",
    description:
      "A midnight-black layered net gown scattered with hand-set sitara and pearls, finished with a tasseled dupatta. Made for the mehndi-night-after or the reception stage.",
    details: [
      "Layered soft net with hand-scattered embellishment",
      "Satin-lined bodice with boned support",
      "Comes with tasseled net dupatta",
      "Made to measure in 5–6 weeks",
    ],
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80",
    hue: 265,
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    featured: false,
  },
  {
    slug: "mehndi-noor-teal-lehenga",
    name: "Noor-e-Mehndi",
    category: "Mehndi",
    price: 185000,
    tagline: "Teal and gold mehndi lehenga",
    fabric: "Raw silk with mirror & gotta work",
    includes: "Choli, lehenga & organza dupatta",
    description:
      "Drenched in the colors of the mehndi itself — teal raw silk with mirror, gotta and multicolor threadwork. Twirl-tested, dance-approved, and built to survive the whole function.",
    details: [
      "Raw silk with mirror and gotta handwork",
      "Twirl-friendly flare with secure waistband",
      "Contrast organza dupatta with gota edging",
      "Made to measure in 6–8 weeks",
    ],
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1400&q=80",
    hue: 178,
    sizes: ["Custom"],
    featured: true,
  },
  {
    slug: "haldi-sunshine-anarkali",
    name: "Dhoop",
    category: "Mehndi",
    price: 95000,
    tagline: "Sunshine yellow Anarkali",
    fabric: "Feather-light georgette with gotta patti",
    includes: "Anarkali, churidar & net dupatta",
    description:
      "Haldi-bright and weightless. A floor-sweeping yellow Anarkali in georgette with gotta patti detailing — the outfit everyone remembers from the day function.",
    details: [
      "Feather-light georgette, lined bodice",
      "Gotta patti neckline and sleeve detailing",
      "Comes with churidar and net dupatta",
      "Ready-to-ship in standard sizes",
    ],
    image:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1400&q=80",
    hue: 52,
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
  {
    slug: "shehnai-blush-pret-set",
    name: "Shehnai",
    category: "Pret",
    price: 55000,
    tagline: "Blush embroidered two-piece",
    fabric: "Cotton net with tone-on-tone embroidery",
    includes: "Embroidered shirt & straight trousers",
    description:
      "Soft blush cotton net with tone-on-tone embroidery — your rehearsal dinner, engagement photos, or the flight home. Cut long and easy like everything we make.",
    details: [
      "Breathable cotton net",
      "Tone-on-tone thread embroidery",
      "Straight trousers with elastic-back waist",
      "Ready-to-ship in standard sizes",
    ],
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1400&q=80",
    hue: 350,
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
  {
    slug: "afsaneh-ivory-cape-set",
    name: "Afsaneh",
    category: "Pret",
    price: 78000,
    tagline: "Ivory lace cape over slip",
    fabric: "French lace with sequin scatter",
    includes: "Cape, slip dress & belt",
    description:
      "An ivory French-lace cape floats over a slip dress, tied with a delicate belt. Western silhouette, eastern craft — made for the bride's civil ceremony or the sangeet.",
    details: [
      "French lace with hand-set sequins",
      "Satin slip dress included",
      "Detachable tie belt",
      "Ready-to-ship in standard sizes",
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    hue: 30,
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatUSD(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
