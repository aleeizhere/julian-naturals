import Image from "next/image";

import { FadeIn } from "@/components/site/fade-in";

const VALUES = [
  {
    icon: "/process-icon-1.png",
    title: "Truly natural",
    text: "Plant oils, butters and botanicals. No synthetic fragrance, no fillers, nothing we can’t pronounce.",
  },
  {
    icon: "/process-icon-2.png",
    title: "Handcrafted",
    text: "Mixed and poured by hand on the farm, the same way the very first batch was made.",
  },
  {
    icon: "/process-icon-3.png",
    title: "Small batches",
    text: "We make a little at a time, so every jar reaches you fresh and at its best.",
  },
  {
    icon: "/process-icon-4.png",
    title: "Family owned",
    text: "No investors, no shortcuts. Just one family, proud of what goes out the barn door.",
  },
] as const;

export function StoryValues() {
  return (
    <section aria-labelledby="values-title" className="relative overflow-clip">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <div className="rounded-[2rem] bg-white/50 px-6 py-14 ring-1 ring-white/70 backdrop-blur-md sm:px-10 md:rounded-[2.5rem] md:px-14 md:py-20">
          <header className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
                What We Believe
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                id="values-title"
                className="mt-6 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl"
              >
                Simple promises we keep
              </h2>
            </FadeIn>
          </header>

          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {VALUES.map((v, i) => (
              <li key={v.title} className="text-center">
                <FadeIn delay={0.08 * i} className="flex flex-col items-center">
                  <span className="grid size-20 place-items-center rounded-full bg-olive-50 ring-4 ring-white/80">
                    <Image src={v.icon} alt="" width={96} height={96} sizes="48px" className="size-12 object-contain" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-medium text-foreground">{v.title}</h3>
                  <p className="mt-3 max-w-[16rem] text-[15px] leading-relaxed text-muted-foreground">
                    {v.text}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
