import { FadeIn } from "@/components/site/fade-in";

export function StoryBeginning() {
  return (
    <section
      id="farm"
      aria-labelledby="beginning-title"
      className="relative scroll-mt-24 overflow-clip"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div>
          <FadeIn>
            <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
              How It Began
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2
              id="beginning-title"
              className="mt-6 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl"
            >
              A few products for our own family
            </h2>
          </FadeIn>

          {/* pull quote */}
          <FadeIn delay={0.18}>
            <figure className="mt-10 border-l-2 border-primary/60 pl-6">
              <blockquote className="font-serif text-2xl leading-snug text-foreground/85 italic sm:text-[1.7rem]">
                “If we wouldn’t use it on our own kids, it doesn’t go in the
                jar.”
              </blockquote>
              <figcaption className="mt-4 text-sm tracking-wide text-muted-foreground">
                Farmer Josh, founder
              </figcaption>
            </figure>
          </FadeIn>
        </div>

        <div className="space-y-6 text-lg leading-relaxed font-light text-muted-foreground lg:pt-14">
          <FadeIn delay={0.1}>
            <p>
              Over 15 years ago, Farmer Josh started melting beeswax, shea and
              cocoa butter on the farmhouse stove. Store-bought balms never
              seemed to last through a day of farm work, and the ingredient
              lists read like a chemistry exam.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p>
              Friends asked for a tin, then neighbors, then strangers at the
              Julian farmers’ market. One lip balm became a moisture treatment,
              an aftershave balm, a deodorant that actually works, each one
              tested on our own family first.
            </p>
          </FadeIn>
          <FadeIn delay={0.26}>
            <p>
              Today we’re still small and still family-owned. Every batch is
              mixed, poured, labeled and packed by hand on the farm, using
              ingredients we grow ourselves or source from people we trust.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
