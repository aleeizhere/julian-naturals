import type { Metadata } from "next";
import { TruckIcon } from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { ShopListing } from "@/components/shop/shop-listing";

export const metadata: Metadata = {
  title: "Shop Our Products — Julian Naturals",
  description:
    "Truly natural body care, handcrafted in small batches on our family farm in Julian, California.",
};

export default function ShopPage() {
  return (
    <section aria-labelledby="shop-title" className="relative overflow-clip">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-24 sm:px-6 md:pt-20 md:pb-32 lg:px-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeIn>
              <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
                Shop
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <span aria-hidden className="mt-6 block h-px w-12 bg-primary" />
            </FadeIn>
            <FadeIn delay={0.16}>
              <h1
                id="shop-title"
                className="mt-6 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl"
              >
                Shop Our Products
              </h1>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="mt-5 max-w-lg text-lg font-light text-muted-foreground">
                Handcrafted in small batches on our family farm in Julian,
                California.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.3}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm text-foreground ring-1 ring-olive/15 backdrop-blur-sm">
              <TruckIcon className="size-4 text-primary" strokeWidth={1.5} />
              Free shipping on orders $49+
            </p>
          </FadeIn>
        </header>

        <FadeIn delay={0.2} className="mt-12 md:mt-16">
          <ShopListing />
        </FadeIn>
      </div>
    </section>
  );
}
