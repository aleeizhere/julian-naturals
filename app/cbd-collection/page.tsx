import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { FadeIn } from "@/components/site/fade-in";
import { Sway } from "@/components/site/leaves";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { LEAF } from "@/lib/motion";

export const metadata: Metadata = {
  title: "CBD Collection — Coming Soon — Julian Naturals",
  description:
    "Our CBD collection is on its way: handcrafted in small batches on our family farm in Julian, California.",
};

export default function CbdCollectionPage() {
  return (
    <section aria-labelledby="cbd-title" className="relative overflow-clip">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 md:pt-16 md:pb-32 lg:px-10">
        <FadeIn>
          <div className="relative isolate overflow-clip rounded-[2rem] bg-[#2f4321] px-6 py-20 text-center text-[#f6f3ea] sm:px-12 md:rounded-[2.75rem] md:py-28">
            {/* swaying leaves in the corners */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -left-20 -z-10 w-[22rem] -scale-x-100 opacity-20 blur-[3px] md:w-[30rem]"
            >
              <Sway amount={3} duration={8} drift={6}>
                <Image src={LEAF.src} alt="" width={LEAF.width} height={LEAF.height} sizes="30rem" className="h-auto w-full" />
              </Sway>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-16 -z-10 w-[20rem] rotate-180 opacity-15 blur-[5px] md:w-[28rem]"
            >
              <Sway amount={4} duration={9.5} drift={8} delay={1}>
                <Image src={LEAF.src} alt="" width={LEAF.width} height={LEAF.height} sizes="28rem" className="h-auto w-full" />
              </Sway>
            </div>

            <FadeIn delay={0.1}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-[#c9d6b5] uppercase sm:text-[13px] sm:tracking-[0.28em]">
                CBD Collection
              </p>
              <span aria-hidden className="mx-auto mt-6 block h-px w-12 bg-[#c9d6b5]" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1
                id="cbd-title"
                className="mt-8 font-serif text-6xl leading-none font-medium tracking-tight sm:text-7xl md:text-8xl"
              >
                Coming soon
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed font-light text-[#f6f3ea]/80 sm:text-xl">
                We’re bringing our CBD collection to the new shop, made the same
                way as everything else: by hand, in small batches, on our family
                farm in Julian, California.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="mx-auto mt-10 max-w-md text-left">
              <p className="mb-4 text-center text-[15px] text-[#f6f3ea]/75">
                Be the first to know when it launches.
              </p>
              <NewsletterForm />
            </FadeIn>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[15px] text-primary underline-offset-4 hover:underline"
          >
            <ArrowLeftIcon className="size-4" strokeWidth={1.75} />
            Browse our products in the meantime
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
