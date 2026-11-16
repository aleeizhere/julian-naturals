"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import type { ProductImage } from "@/lib/products";
import { EASE_OUT_QUINT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Large crossfading main image with selectable thumbnails. */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#ecebe8] shadow-[0_30px_60px_-34px_rgb(43_42_38/0.4)] ring-1 ring-olive/10">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[active].src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_QUINT }}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              preload={active === 0}
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4" role="group" aria-label="Product images">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#ecebe8] ring-2 transition-all duration-300",
              i === active
                ? "ring-primary"
                : "opacity-70 ring-transparent hover:opacity-100",
            )}
          >
            <Image src={img.src} alt="" fill sizes="160px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
