import { existsSync } from "node:fs";
import path from "node:path";

import { FadeIn } from "@/components/site/fade-in";
import { OurStoryPhoto } from "@/components/site/our-story-photo";
import { RollingLinkButton } from "@/components/site/rolling-link-button";

/** First matching file in /public is used; until one exists a placeholder shows. */
const PHOTO_CANDIDATES = [
  "farmer-image.png",
  "our-story.jpg",
  "our-story.jpeg",
  "our-story.png",
  "our-story.webp",
];

function findStoryPhoto(): string | null {
  const file = PHOTO_CANDIDATES.find((name) =>
    existsSync(path.join(process.cwd(), "public", name)),
  );
  return file ? `/${file}` : null;
}

export function OurStory() {
  const photo = findStoryPhoto();

  return (
    <section
      id="our-story"
      data-our-story
      aria-labelledby="our-story-heading"
      // overflow-clip: the photo's oversized entrance and the leaf must never
      // add scroll width/height (see hero for the same guard).
      className="relative overflow-clip"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:py-36">
        <div className="max-w-2xl">
          <FadeIn>
            <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
              Our Story
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <span aria-hidden className="mt-6 block h-px w-12 bg-primary" />
          </FadeIn>
          <FadeIn delay={0.16}>
            <h2
              id="our-story-heading"
              className="mt-6 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl lg:text-[2.9rem] xl:text-[3.4rem]"
            >
              A Family Farm <br className="hidden sm:block" />
              Rooted in Natural Care
            </h2>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed font-light text-muted-foreground sm:text-xl">
              Over 15 years ago, Farmer Josh began making natural lip balms on
              our sustainable farm in Julian, California. What started as a few
              products for our own family has grown into Julian Naturals, a
              small, family-owned business dedicated to effective, truly natural
              body care.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} className="mt-9 w-full sm:w-fit">
            <RollingLinkButton href="/our-story">Read Our Full Story</RollingLinkButton>
          </FadeIn>
        </div>

        <OurStoryPhoto src={photo} />
      </div>
    </section>
  );
}
