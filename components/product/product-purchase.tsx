"use client";

import { useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_DISCOUNT, formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const pill =
  "relative isolate inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] transition-colors";

/** Option picker, purchase type, quantity and Add to Cart (opens the cart). */
export function ProductPurchase({ product }: { product: Product }) {
  const { option } = product;
  const [choice, setChoice] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, setOpen } = useCart();

  const unit = option.choices[choice].price * (subscribe ? 1 - SUBSCRIPTION_DISCOUNT : 1);
  const total = unit * qty;

  return (
    <div>
      {/* price */}
      <div className="flex items-baseline gap-3" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={total}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="font-serif text-4xl font-medium text-primary tabular-nums sm:text-5xl"
          >
            {formatPrice(total)}
          </motion.p>
        </AnimatePresence>
        {subscribe && (
          <span className="text-base text-muted-foreground line-through tabular-nums">
            {formatPrice(option.choices[choice].price * qty)}
          </span>
        )}
      </div>

      {/* option */}
      <fieldset className="mt-10">
        <legend className="text-sm font-medium tracking-[0.2em] text-foreground uppercase">
          {option.label}
        </legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {option.choices.map((c, i) => {
            const active = i === choice;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={active}
                onClick={() => setChoice(i)}
                className={cn(
                  pill,
                  active
                    ? "text-primary-foreground"
                    : "bg-white/60 text-foreground ring-1 ring-olive/20 hover:bg-white/90",
                )}
              >
                {active && (
                  <motion.span
                    layoutId={`option-${product.slug}`}
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {c.name}
                {new Set(option.choices.map((x) => x.price)).size > 1 && (
                  <span className={cn("text-sm tabular-nums", active ? "text-primary-foreground/75" : "text-muted-foreground")}>
                    {formatPrice(c.price)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* purchase options */}
      {product.subscription && (
        <fieldset className="mt-8">
          <legend className="text-sm font-medium tracking-[0.2em] text-foreground uppercase">
            Purchase options
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { sub: false, title: "One time", hint: "Buy once" },
              {
                sub: true,
                title: `Subscribe & save ${SUBSCRIPTION_DISCOUNT * 100}%`,
                hint: "Every 2 weeks · pause or cancel anytime",
              },
            ].map((o) => {
              const active = subscribe === o.sub;
              return (
                <button
                  key={o.title}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSubscribe(o.sub)}
                  className={cn(
                    "rounded-2xl px-5 py-4 text-left ring-1 transition-colors",
                    active
                      ? "bg-olive-50 ring-2 ring-primary"
                      : "bg-white/60 ring-olive/20 hover:bg-white/90",
                  )}
                >
                  <span className="block text-base font-medium text-foreground">{o.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{o.hint}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* quantity + add to cart */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="inline-flex h-14 w-fit items-center rounded-full bg-white/60 ring-1 ring-olive/20"
          role="group"
          aria-label="Quantity"
        >
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-14 place-items-center rounded-full text-foreground transition-colors hover:text-primary disabled:opacity-30"
          >
            <MinusIcon className="size-4" />
          </button>
          <span className="w-8 text-center text-lg font-medium tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="grid size-14 place-items-center rounded-full text-foreground transition-colors hover:text-primary"
          >
            <PlusIcon className="size-4" />
          </button>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={() => {
            addItem({ slug: product.slug, optionIndex: choice, subscribe, qty });
            setOpen(true);
            setQty(1);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 2200);
          }}
          className="h-14 w-full shrink-0 rounded-full px-9 text-[17px] sm:w-auto sm:flex-1 font-normal shadow-[0_10px_30px_-10px_rgb(63_90_42/0.6)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "added" : "add"}
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {added ? (
                <>
                  <CheckIcon className="size-5" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBagIcon className="size-5" strokeWidth={1.5} /> Add to Cart ·{" "}
                  {formatPrice(total)}
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
