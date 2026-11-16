import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FeatureStrip } from "@/components/site/feature-strip";

export function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-4.5rem)] flex-col md:min-h-[calc(100svh-5rem)]"
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 pt-12 pb-10 sm:px-6 md:grid-cols-2 md:gap-6 md:py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-10">
        {/* Product image — hidden on mobile */}
        <div data-hero-image className="relative hidden md:block">
          {/* soft glass halo behind the products */}
          <div
            aria-hidden
            className="absolute inset-x-[8%] top-[12%] bottom-[4%] -z-10 rounded-[50%] bg-white/60 blur-3xl"
          />
          <Image
            src="/hero-section.png"
            alt="Julian Naturals body care: Deep Moisture Treatment, Body Nourishing Oil, After Shave Balm and Caramel Apple lip balm arranged on a stone with coconut, shea butter and cocoa beans"
            width={1535}
            height={1024}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1280px) 680px, (min-width: 768px) 50vw, 0px"
            className="h-auto w-full drop-shadow-[0_30px_40px_rgb(63_90_42/0.12)]"
          />
        </div>

        {/* Copy */}
        <div data-hero-copy className="max-w-xl md:pl-2 lg:pl-6">
          <p
            data-hero-eyebrow
            className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]"
          >
            From our farm to your daily routine
          </p>
          <span data-hero-rule aria-hidden className="mt-6 block h-px w-12 bg-primary" />
          <h1
            id="hero-heading"
            data-hero-heading
            className="mt-6 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            Truly Natural <br className="hidden sm:block" />
            Body Care
          </h1>
          <p
            data-hero-description
            className="mt-6 max-w-md text-lg leading-relaxed font-light text-muted-foreground sm:text-xl"
          >
            Handcrafted in small batches using natural ingredients from our
            family farm in Julian, California.
          </p>
          <div data-hero-cta className="mt-9">
            <Button
              asChild
              size="lg"
              className="h-14 w-full rounded-full px-9 text-[17px] font-normal shadow-[0_10px_30px_-10px_rgb(63_90_42/0.6)] sm:w-auto"
            >
              <Link href="#products">
                Shop Our Products
                <ArrowRightIcon className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <FeatureStrip />
    </section>
  );
}
