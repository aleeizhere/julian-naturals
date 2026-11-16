"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MinusIcon,
  PlusIcon,
  RepeatIcon,
  ShoppingBagIcon,
  Trash2Icon,
  TruckIcon,
  XIcon,
} from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "motion/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/animate-ui/components/radix/sheet";
import { Button } from "@/components/ui/button";
import {
  FREE_SHIPPING_THRESHOLD,
  useCart,
  type CartItem,
} from "@/components/cart/cart-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

function QtyStepper({ item }: { item: CartItem }) {
  const { updateQty } = useCart();
  return (
    <div
      role="group"
      aria-label={`Quantity for ${item.name}`}
      className="inline-flex h-9 items-center rounded-full bg-white/70 ring-1 ring-olive/20"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => updateQty(item.key, item.qty - 1)}
        className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:text-primary"
      >
        <MinusIcon className="size-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-medium tabular-nums">
        {item.qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => updateQty(item.key, item.qty + 1)}
        className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:text-primary"
      >
        <PlusIcon className="size-3.5" />
      </button>
    </div>
  );
}

function CartLine({ item }: { item: CartItem }) {
  const { removeItem, setOpen } = useCart();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
      transition={{ duration: 0.35 }}
      className="flex gap-4 border-b border-olive/10 py-5 last:border-b-0"
    >
      <Link
        href={`/shop/${item.slug}`}
        onClick={() => setOpen(false)}
        className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-[#ecebe8] ring-1 ring-olive/10"
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/shop/${item.slug}`}
            onClick={() => setOpen(false)}
            className="font-serif text-lg leading-snug font-medium text-foreground hover:text-primary"
          >
            {item.name}
          </Link>
          <p className="shrink-0 text-[15px] font-medium tabular-nums">
            {formatPrice(item.unitPrice * item.qty)}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {item.optionLabel}: {item.optionName}
        </p>
        {item.subscribe && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-primary">
            <RepeatIcon className="size-3.5" /> Subscribe & save · every 2 weeks
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <QtyStepper item={item} />
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            aria-label={`Remove ${item.name} from cart`}
            className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/70 hover:text-foreground"
          >
            <Trash2Icon className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.li>
  );
}

/**
 * Cart drawer: slides in from the right on desktop, rises as a bottom sheet on
 * phones (drag the handle down to dismiss). Rendered once in the root layout.
 */
export function CartDrawer() {
  const { items, count, subtotal, isOpen, setOpen } = useCart();
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const dragControls = useDragControls();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        showCloseButton={false}
        // transparent shell: positioning + slide animation only
        className={cn(
          "gap-0 border-0 bg-transparent shadow-none",
          isDesktop ? "h-full w-[min(440px,92vw)]" : "h-auto w-full",
        )}
      >
        {/* visible panel; on phones it can be dragged down to dismiss */}
        <motion.div
          className={cn(
            "flex flex-col border-white/70 bg-[#fbfcf8]/95 backdrop-blur-2xl",
            isDesktop
              ? "h-full border-l shadow-[-20px_0_60px_-30px_rgb(43_42_38/0.35)]"
              : "max-h-[88svh] rounded-t-[2rem] border-t shadow-[0_-20px_60px_-30px_rgb(43_42_38/0.35)]",
          )}
          drag={isDesktop ? false : "y"}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.7 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 110 || info.velocity.y > 600) setOpen(false);
          }}
        >
          {/* drag handle (phone) */}
          {!isDesktop && (
            <div
              className="flex shrink-0 cursor-grab touch-none justify-center select-none pt-3 pb-1 active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <span className="h-1.5 w-12 rounded-full bg-olive/25" />
            </div>
          )}

          {/* header */}
          <div className="flex shrink-0 items-center justify-between px-6 pt-4 pb-4 md:pt-7">
            <div>
              <SheetTitle className="font-serif text-3xl font-medium text-foreground">
                Your cart
              </SheetTitle>
              <SheetDescription className="mt-0.5 text-sm text-muted-foreground">
                {count === 0
                  ? "Nothing here yet"
                  : `${count} ${count === 1 ? "item" : "items"}`}
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="grid size-10 place-items-center rounded-full text-foreground ring-1 ring-olive/15 transition-colors hover:bg-white/80"
            >
              <XIcon className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 pt-6 pb-12 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-olive-50">
                <ShoppingBagIcon
                  className="size-7 text-primary"
                  strokeWidth={1.25}
                />
              </span>
              <p className="mt-5 font-serif text-2xl text-foreground">
                Your cart is empty
              </p>
              <p className="mt-2 max-w-xs text-[15px] text-muted-foreground">
                Fresh small batches are waiting on the shelf.
              </p>
              <Button
                asChild
                className="mt-7 h-12 rounded-full px-7 text-[15px] font-normal"
              >
                <Link href="/shop" onClick={() => setOpen(false)}>
                  Shop our products
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* free shipping progress */}
              <div className="mx-6 shrink-0 rounded-2xl bg-olive-50/80 px-4 py-3">
                <p className="flex items-center gap-2 text-sm text-foreground">
                  <TruckIcon
                    className="size-4 text-primary"
                    strokeWidth={1.5}
                  />
                  {remaining > 0 ? (
                    <>
                      You’re{" "}
                      <strong className="font-medium">
                        {formatPrice(remaining)}
                      </strong>{" "}
                      away from free shipping
                    </>
                  ) : (
                    <>You’ve unlocked free shipping</>
                  )}
                </p>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white">
                  <motion.div
                    className="h-full origin-left rounded-full bg-primary"
                    initial={false}
                    animate={{ scaleX: progress }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
              </div>

              {/* items */}
              <ul className="mt-2 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartLine key={item.key} item={item} />
                  ))}
                </AnimatePresence>
              </ul>

              {/* summary */}
              <div className="shrink-0 border-t border-olive/15 px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <div className="flex items-baseline justify-between">
                  <span className="text-base text-foreground">Subtotal</span>
                  <span className="font-serif text-2xl font-medium text-foreground tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  asChild
                  className="mt-5 h-14 w-full rounded-full text-[17px] font-normal shadow-[0_10px_30px_-10px_rgb(63_90_42/0.6)]"
                >
                  <Link href="/checkout" onClick={() => setOpen(false)}>
                    Checkout · {formatPrice(subtotal)}
                  </Link>
                </Button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 w-full text-center text-[15px] text-primary underline-offset-4 hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            </>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
