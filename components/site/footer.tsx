import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";

import { FadeIn } from "@/components/site/fade-in";
import { Sway } from "@/components/site/leaves";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { LEAF } from "@/lib/motion";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Body Care", href: "/shop" },
      { label: "Lip Balms", href: "/shop" },
      { label: "CBD Collection", href: "/cbd-collection" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Our Process", href: "/#process" },
      { label: "The Farm", href: "/our-story#farm" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & Returns", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
] as const;

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden {...props}>
      <path d="M17 3h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V7.5a.5.5 0 0 1 .5-.5H17Z" strokeLinejoin="round" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Julian Naturals on Instagram", href: "#", icon: InstagramIcon },
  { label: "Julian Naturals on Facebook", href: "#", icon: FacebookIcon },
] as const;

/**
 * Cache Components forbids `new Date()` in the prerendered shell; computing
 * it inside a cached function keeps the page static and the year current.
 */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer
      data-footer
      className="relative isolate mt-10 overflow-clip rounded-t-[2rem] bg-[#2f4321] text-[#f6f3ea] md:mt-16 md:rounded-t-[2.75rem]"
    >
      {/* faint blurred leaf, echoing the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-24 -z-10 w-[26rem] opacity-[0.12] blur-[6px] md:-right-10 md:w-[34rem]"
      >
        <Sway amount={3} duration={9} drift={8}>
          <Image src={LEAF.src} alt="" width={LEAF.width} height={LEAF.height} sizes="34rem" className="h-auto w-full" />
        </Sway>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 md:pt-24 lg:px-10">
        {/* sign-off + newsletter */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <FadeIn>
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#c9d6b5] uppercase sm:text-[13px] sm:tracking-[0.28em]">
              Stay rooted
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
              From our family farm to yours.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mb-4 max-w-md text-base font-light text-[#f6f3ea]/75">
              Seasonal notes from the farm, new small batches and the occasional
              recipe. No more than once a month.
            </p>
            <NewsletterForm />
          </FadeIn>
        </div>

        <div className="my-14 h-px bg-white/15 md:my-16" />

        {/* brand + link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-8">
          <FadeIn className="col-span-2 flex flex-col items-start gap-6 md:col-span-1">
            <Link
              href="/"
              aria-label="Julian Naturals — home"
              className="relative block aspect-[1490/424] w-[168px] overflow-hidden"
            >
              {/* logo artwork is dark; render it in cream for the olive footer */}
              <Image
                src="/logo.png"
                alt="Julian Naturals"
                width={2112}
                height={744}
                sizes="240px"
                className="absolute top-[-36.8%] left-[-21.3%] h-auto w-[141.8%] max-w-none brightness-0 invert"
              />
            </Link>
            <p className="max-w-xs text-[15px] leading-relaxed font-light text-[#f6f3ea]/75">
              Truly natural body care, handcrafted in small batches on our
              family farm in Julian, California.
            </p>
            <ul className="flex gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:bg-white/10"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          {COLUMNS.map((col, i) => (
            <FadeIn key={col.title} delay={0.08 * (i + 1)}>
              <nav aria-label={col.title}>
                <h3 className="text-[12px] font-medium tracking-[0.22em] text-[#c9d6b5] uppercase">
                  {col.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-[#f6f3ea]/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </FadeIn>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-[13px] text-[#f6f3ea]/60 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> Julian Naturals. Handcrafted in Julian, California.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
