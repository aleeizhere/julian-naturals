"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { SUBSCRIPTION_DISCOUNT, getProduct } from "@/lib/products";

/**
 * Client-side cart held in React context (in memory for now: it resets on a
 * full page reload). Swap the internals for a real cart/checkout API later;
 * the hook's shape can stay the same.
 */

export type CartItem = {
  /** slug + option + purchase type, so variants are separate lines */
  key: string;
  slug: string;
  name: string;
  image: string;
  optionLabel: string;
  optionName: string;
  subscribe: boolean;
  /** price per unit after any subscription discount */
  unitPrice: number;
  qty: number;
};

export type AddToCartInput = {
  slug: string;
  optionIndex: number;
  subscribe: boolean;
  qty: number;
};

export const FREE_SHIPPING_THRESHOLD = 49;

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (input: AddToCartInput) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const addItem = useCallback(({ slug, optionIndex, subscribe, qty }: AddToCartInput) => {
    const product = getProduct(slug);
    const choice = product?.option.choices[optionIndex];
    if (!product || !choice) return;

    const key = `${slug}|${choice.name}|${subscribe ? "sub" : "once"}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(99, i.qty + qty) } : i,
        );
      }
      return [
        ...prev,
        {
          key,
          slug,
          name: product.name,
          image: product.images[0].src,
          optionLabel: product.option.label,
          optionName: choice.name,
          subscribe,
          unitPrice: choice.price * (subscribe ? 1 - SUBSCRIPTION_DISCOUNT : 1),
          qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(99, qty) } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    return { items, count, subtotal, isOpen, setOpen, addItem, updateQty, removeItem, clear };
  }, [items, isOpen, addItem, updateQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
