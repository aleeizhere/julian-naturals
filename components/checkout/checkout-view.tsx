"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  LockIcon,
  RepeatIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { FREE_SHIPPING_THRESHOLD, useCart, type CartItem } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/products";
import { EASE_OUT_QUINT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Delivery options. Free standard shipping over $49 matches the live store;
 * the other amounts are placeholders. Replace them with the real rates.
 */
const DELIVERY = [
  {
    id: "standard",
    name: "Standard shipping",
    eta: "3–5 business days",
    price: (subtotal: number) => (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 6),
  },
  {
    id: "express",
    name: "Express shipping",
    eta: "1–2 business days",
    price: () => 15,
  },
] as const;

type DeliveryId = (typeof DELIVERY)[number]["id"];

/* ───────────────────────── form primitives ───────────────────────── */

const inputClass =
  "h-12 w-full rounded-xl bg-white/70 px-4 text-[15px] text-foreground ring-1 ring-olive/20 outline-none transition placeholder:text-muted-foreground/70 focus:bg-white focus:ring-2 focus:ring-primary";

function Field({
  label,
  className,
  ...props
}: React.ComponentProps<"input"> & { label: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm text-foreground/80">
        {label}
        {!props.required && <span className="text-muted-foreground"> (optional)</span>}
      </label>
      <input id={id} className={inputClass} {...props} />
    </div>
  );
}

function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-olive/15 pt-8 first:border-t-0 first:pt-0">
      <h2 className="flex items-center gap-3 font-serif text-2xl font-medium text-foreground sm:text-3xl">
        <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-sans text-primary-foreground">
          {step}
        </span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* ───────────────────────── order summary ───────────────────────── */

function SummaryLine({ item }: { item: CartItem }) {
  return (
    <li className="flex items-center gap-4 py-3">
      <div className="relative shrink-0">
        <div className="relative size-16 overflow-hidden rounded-xl bg-[#ecebe8] ring-1 ring-olive/10">
          <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
        </div>
        <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-foreground/80 text-[11px] font-medium text-white tabular-nums">
          {item.qty}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-serif text-base leading-snug font-medium text-foreground">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.optionName}</p>
        {item.subscribe && (
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary">
            <RepeatIcon className="size-3" /> Every 2 weeks · 15% off
          </p>
        )}
      </div>
      <p className="shrink-0 text-sm font-medium tabular-nums">
        {formatPrice(item.unitPrice * item.qty)}
      </p>
    </li>
  );
}

function OrderSummary({ shipping }: { shipping: number }) {
  const { items, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [codeNote, setCodeNote] = useState(false);
  const total = subtotal + shipping;

  return (
    <div>
      <ul className="divide-y divide-olive/10">
        {items.map((item) => (
          <SummaryLine key={item.key} item={item} />
        ))}
      </ul>

      {/* discount code */}
      <form
        className="mt-5 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) setCodeNote(true);
        }}
      >
        <label htmlFor="discount" className="sr-only">
          Discount code
        </label>
        <input
          id="discount"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setCodeNote(false);
          }}
          placeholder="Discount code"
          className={cn(inputClass, "flex-1")}
        />
        <Button
          type="submit"
          variant="outline"
          className="h-12 rounded-xl bg-white/60 px-5 text-[15px]"
        >
          Apply
        </Button>
      </form>
      {codeNote && (
        <p role="status" className="mt-2 text-sm text-muted-foreground">
          Discount codes aren’t available yet.
        </p>
      )}

      <dl className="mt-6 space-y-2.5 text-[15px]">
        <div className="flex justify-between">
          <dt className="text-foreground/80">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-foreground/80">Shipping</dt>
          <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-foreground/80">Taxes</dt>
          <dd className="text-muted-foreground">Calculated at payment</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-olive/15 pt-4">
          <dt className="text-lg text-foreground">Total</dt>
          <dd className="font-serif text-3xl font-medium text-foreground tabular-nums">
            <span className="mr-1.5 align-middle font-sans text-xs text-muted-foreground">USD</span>
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* ───────────────────────── page ───────────────────────── */

export function CheckoutView() {
  const { items, subtotal, count } = useCart();
  const [delivery, setDelivery] = useState<DeliveryId>("standard");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const shipping = DELIVERY.find((d) => d.id === delivery)!.price(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center md:py-32">
        <span className="grid size-16 place-items-center rounded-full bg-olive-50">
          <ShoppingBagIcon className="size-7 text-primary" strokeWidth={1.25} />
        </span>
        <h1 className="mt-6 font-serif text-4xl font-medium text-foreground sm:text-5xl">
          Your cart is empty
        </h1>
        <p className="mt-4 text-lg font-light text-muted-foreground">
          Add a few small-batch favorites, then come back to check out.
        </p>
        <Button asChild className="mt-8 h-14 rounded-full px-9 text-[17px] font-normal">
          <Link href="/shop">Shop our products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 md:pt-12 md:pb-32 lg:px-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="size-4" /> Continue shopping
      </Link>
      <h1 className="mt-5 font-serif text-5xl leading-none font-medium tracking-tight text-foreground sm:text-6xl">
        Checkout
      </h1>

      {/* phone: collapsible summary */}
      <div className="mt-8 rounded-2xl bg-white/60 ring-1 ring-olive/15 backdrop-blur-md lg:hidden">
        <button
          type="button"
          aria-expanded={summaryOpen}
          onClick={() => setSummaryOpen((o) => !o)}
          className="flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="inline-flex items-center gap-2 text-[15px] text-primary">
            <ShoppingBagIcon className="size-4" strokeWidth={1.5} />
            {summaryOpen ? "Hide" : "Show"} order summary ({count})
            <ChevronDownIcon
              className={cn("size-4 transition-transform", summaryOpen && "rotate-180")}
            />
          </span>
          <span className="font-serif text-xl font-medium tabular-nums">{formatPrice(total)}</span>
        </button>
        <AnimatePresence initial={false}>
          {summaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT_QUINT }}
              className="overflow-hidden"
            >
              <div className="border-t border-olive/10 px-5 pt-2 pb-5">
                <OrderSummary shipping={shipping} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* form */}
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Section step={1} title="Contact">
            <div className="grid gap-4">
              <Field label="Email" type="email" name="email" autoComplete="email" required />
              <label className="flex items-center gap-3 text-[15px] text-foreground/85">
                <input type="checkbox" name="newsletter" className="size-4 accent-primary" />
                Email me farm notes and new small batches
              </label>
            </div>
          </Section>

          <Section step={2} title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="given-name" autoComplete="given-name" required />
              <Field label="Last name" name="family-name" autoComplete="family-name" required />
              <Field
                label="Address"
                name="address-line1"
                autoComplete="address-line1"
                required
                className="sm:col-span-2"
              />
              <Field
                label="Apartment, suite, etc."
                name="address-line2"
                autoComplete="address-line2"
                className="sm:col-span-2"
              />
              <Field label="City" name="city" autoComplete="address-level2" required />
              <div className="grid grid-cols-2 gap-4">
                <Field label="State" name="state" autoComplete="address-level1" required />
                <Field
                  label="ZIP code"
                  name="postal-code"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="country" className="mb-1.5 block text-sm text-foreground/80">
                  Country
                </label>
                <select id="country" name="country" autoComplete="country" className={inputClass}>
                  <option value="US">United States</option>
                </select>
              </div>
              <Field
                label="Phone"
                type="tel"
                name="tel"
                autoComplete="tel"
                className="sm:col-span-2"
              />
            </div>
          </Section>

          <Section step={3} title="Delivery">
            <div role="radiogroup" aria-label="Delivery method" className="grid gap-3">
              {DELIVERY.map((d) => {
                const active = d.id === delivery;
                const price = d.price(subtotal);
                return (
                  <label
                    key={d.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 ring-1 transition-colors",
                      active ? "bg-olive-50 ring-2 ring-primary" : "bg-white/60 ring-olive/20 hover:bg-white/90",
                    )}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={d.id}
                      checked={active}
                      onChange={() => setDelivery(d.id)}
                      className="size-4 accent-primary"
                    />
                    <span className="flex-1">
                      <span className="block text-base font-medium text-foreground">{d.name}</span>
                      <span className="block text-sm text-muted-foreground">{d.eta}</span>
                    </span>
                    <span className="text-[15px] font-medium tabular-nums">
                      {price === 0 ? "Free" : formatPrice(price)}
                    </span>
                  </label>
                );
              })}
            </div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <TruckIcon className="size-4 text-primary" strokeWidth={1.5} />
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free standard shipping.
              </p>
            )}
          </Section>

          <Section step={4} title="Payment">
            {/* Placeholder: mount the payment provider's secure card fields here
                (e.g. Square Web Payments SDK). Never collect raw card numbers. */}
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-olive/30 bg-white/50 px-6 py-10 text-center">
              <LockIcon className="size-6 text-primary" strokeWidth={1.5} />
              <p className="mt-3 text-base font-medium text-foreground">Secure payment</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Card and wallet payments will appear here once our payment provider is
                connected.
              </p>
            </div>
          </Section>

          <div>
            <Button
              type="submit"
              className="h-14 w-full rounded-full text-[17px] font-normal shadow-[0_10px_30px_-10px_rgb(63_90_42/0.6)]"
            >
              <LockIcon className="size-4" strokeWidth={1.75} /> Place order · {formatPrice(total)}
            </Button>
            <AnimatePresence>
              {submitted && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-2xl bg-olive-50 px-5 py-4 text-center text-[15px] text-foreground"
                >
                  Thanks! Your details look good. Online payment isn’t connected yet, so no
                  order has been placed.
                </motion.p>
              )}
            </AnimatePresence>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Handcrafted in small batches on our family farm in Julian, California.
            </p>
          </div>
        </form>

        {/* desktop: sticky summary */}
        <aside aria-label="Order summary" className="hidden lg:block">
          <div className="sticky top-28 rounded-[2rem] bg-white/55 p-8 ring-1 ring-white/70 backdrop-blur-md">
            <h2 className="font-serif text-3xl font-medium text-foreground">Order summary</h2>
            <div className="mt-4">
              <OrderSummary shipping={shipping} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
