import { FadeIn } from "@/components/site/fade-in";
import { OurStoryPhoto } from "@/components/site/our-story-photo";

export function StoryHero() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-clip">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 md:pt-20 md:pb-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10">
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
            <h1
              id="story-title"
              className="mt-6 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl xl:text-7xl"
            >
              Rooted in <br className="hidden sm:block" />
              Julian, California
            </h1>
          </FadeIn>
          <FadeIn delay={0.28}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed font-light text-muted-foreground sm:text-xl">
              Julian Naturals began at a kitchen table on our family farm, with
              a single batch of lip balm and a simple belief: what you put on
              your skin should be as honest as what you grow in your garden.
            </p>
          </FadeIn>
        </div>

        <OurStoryPhoto src="/farmer-image.png" />
      </div>
    </section>
  );
}
