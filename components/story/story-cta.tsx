import Link from "next/link";

import { FadeIn } from "@/components/site/fade-in";
import { RollingLinkButton } from "@/components/site/rolling-link-button";

export function StoryCta() {
  return (
    <section aria-labelledby="story-cta-title" className="relative overflow-clip">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
        <FadeIn>
          <h2
            id="story-cta-title"
            className="font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl"
          >
            Bring a little of the farm home
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-lg font-light text-muted-foreground">
            Every product is made the way it was on day one: by hand, in small
            batches, with ingredients we’re proud of.
          </p>
        </FadeIn>
        <FadeIn delay={0.2} className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <RollingLinkButton href="/shop">Shop Our Products</RollingLinkButton>
          <Link
            href="/#process"
            className="text-[15px] text-primary underline-offset-4 hover:underline"
          >
            See how we make it
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
