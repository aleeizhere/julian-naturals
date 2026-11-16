"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, LeafIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { CATEGORIES, PRODUCTS, type CategorySlug, type Product } from "@/lib/products";
import { EASE_OUT_QUINT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = "all" | CategorySlug;

const countFor = (slug: CategorySlug) =>
  PRODUCTS.filter((p) => p.categories.includes(slug)).length;

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT_QUINT }}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ecebe8] shadow-[0_24px_48px_-30px_rgb(43_42_38/0.35)] ring-1 ring-olive/10">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {/* hover pill */}
          <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 translate-y-3 items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-primary opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            View product <ArrowRightIcon className="size-4" strokeWidth={1.75} />
          </span>
        </div>
        <div className="mt-5 px-1">
          <h3 className="font-serif text-2xl font-medium text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>
          <p className="mt-3 text-base font-medium text-primary tabular-nums">{product.price}</p>
        </div>
      </Link>
    </motion.li>
  );
}

export function ShopListing() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(filter));
  const activeName =
    filter === "all" ? "All Items" : CATEGORIES.find((c) => c.slug === filter)?.name;

  const chips: { slug: Filter; name: string; count: number }[] = [
    { slug: "all", name: "All Items", count: PRODUCTS.length },
    ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, count: countFor(c.slug) })),
  ];

  return (
    <div>
      {/* categories */}
      <nav aria-label="Product categories" className="relative">
        <ul className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pt-1 pb-3 sm:scroll-px-6 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {chips.map((c) => {
            const active = c.slug === filter;
            return (
              <li key={c.slug} className="shrink-0 snap-start">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c.slug)}
                  className={cn(
                    "relative isolate inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "bg-white/55 text-foreground/80 ring-1 ring-olive/15 backdrop-blur-sm hover:bg-white/80 hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="active-category"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {c.name}
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      active ? "text-primary-foreground/75" : "text-muted-foreground",
                    )}
                  >
                    {c.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {activeName} · {visible.length} {visible.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-6">
        <AnimatePresence mode="popLayout" initial>
          {visible.length > 0 ? (
            <motion.ul
              key="grid"
              layout
              className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.div
              key={`empty-${filter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
              className="flex flex-col items-center rounded-[1.75rem] bg-white/50 px-6 py-20 text-center ring-1 ring-white/70 backdrop-blur-md"
            >
              <span className="grid size-16 place-items-center rounded-full bg-olive-50">
                <LeafIcon className="size-7 text-primary" strokeWidth={1.25} />
              </span>
              <h3 className="mt-6 font-serif text-3xl font-medium text-foreground">
                Coming soon
              </h3>
              <p className="mt-3 max-w-sm text-base font-light text-muted-foreground">
                We’re still bringing {activeName} over to the new shop. Fresh
                batches are on their way.
              </p>
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-6 text-[15px] text-primary underline-offset-4 hover:underline"
              >
                Browse all items
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
