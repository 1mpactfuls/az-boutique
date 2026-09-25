import type { Product } from "@/lib/catalog";
import {
  FREE_SHIPPING_THRESHOLD_CENTS,
  SHIPPING_FLAT_CENTS,
} from "@/lib/catalog";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  name: string;
  category: string;
  /** USD cents */
  price: number;
  size: string;
  image: string | null;
  hue: number;
  quantity: number;
}

export function cartKey(slug: string, size: string) {
  return `${slug}::${size}`;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  freeShipping: boolean;
  addItem: (product: Product, size: string, quantity?: number) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "az-boutique-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.slug === "string" &&
        typeof item?.price === "number" &&
        typeof item?.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart stays in memory
    }
  }, [items]);

  const addItem = useCallback(
    (product: Product, size: string, quantity = 1) => {
      setItems((prev) => {
        const key = cartKey(product.slug, size);
        const existing = prev.find((i) => cartKey(i.slug, i.size) === key);
        if (existing) {
          return prev.map((i) =>
            cartKey(i.slug, i.size) === key
              ? { ...i, quantity: Math.min(i.quantity + quantity, 10) }
              : i,
          );
        }
        return [
          ...prev,
          {
            slug: product.slug,
            name: product.name,
            category: product.category,
            price: product.price,
            size,
            image: product.image,
            hue: product.hue,
            quantity,
          },
        ];
      });
      setCartOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback((slug: string, size: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => cartKey(i.slug, i.size) !== cartKey(slug, size))
        : prev.map((i) =>
            cartKey(i.slug, i.size) === cartKey(slug, size)
              ? { ...i, quantity: Math.min(quantity, 10) }
              : i,
          ),
    );
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => cartKey(i.slug, i.size) !== cartKey(slug, size)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalCents = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const freeShipping =
      subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS || subtotalCents === 0;
    const shippingCents = freeShipping ? 0 : SHIPPING_FLAT_CENTS;
    return {
      items,
      count,
      subtotalCents,
      shippingCents,
      totalCents: subtotalCents + shippingCents,
      freeShipping,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isCartOpen,
      setCartOpen,
    };
  }, [items, isCartOpen, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
