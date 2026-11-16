import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRightIcon, LeafIcon, PackageCheckIcon, TruckIcon } from "lucide-react";

import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { FadeIn } from "@/components/site/fade-in";
import { CATEGORIES, PRODUCTS, getProduct } from "@/lib/products";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Julian Naturals`,
    description: product.description[0],
  };
}

const TRUST = [
  { icon: TruckIcon, label: "Free shipping on orders $49+" },
  { icon: LeafIcon, label: "Handcrafted in small batches" },
  { icon: PackageCheckIcon, label: "Batch numbered for freshness" },
] as const;

function DetailBlock({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="grid gap-6 border-t border-olive/15 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <h2 className="font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      <div className="text-lg leading-relaxed text-foreground/75 sm:text-xl lg:text-[1.375rem]">
        {children}
      </div>
    </FadeIn>
  );
}

/** Loading shell shown while the product (URL data) resolves. */
function ProductSkeleton() {
  return (
    <div aria-hidden className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 md:pt-12 lg:px-10">
      <div className="h-4 w-40 rounded-full bg-olive/10" />
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="aspect-[4/3] animate-pulse rounded-[2rem] bg-olive/10" />
        <div className="space-y-6">
          <div className="h-3 w-32 rounded-full bg-olive/10" />
          <div className="h-16 w-4/5 rounded-2xl bg-olive/10" />
          <div className="h-6 w-2/3 rounded-full bg-olive/10" />
          <div className="h-12 w-32 rounded-2xl bg-olive/10" />
        </div>
      </div>
    </div>
  );
}

// URL data (params) is read inside <Suspense> so navigations stay instant.
export default function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/shop/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => product.categories.includes(c.slug));
  const related = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <article className="relative overflow-clip">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 md:pt-12 md:pb-32 lg:px-10">
        {/* breadcrumb */}
        <FadeIn>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="transition-colors hover:text-primary">
                  Shop
                </Link>
              </li>
              <ChevronRightIcon aria-hidden className="size-3.5" />
              <li aria-current="page" className="text-foreground">
                {product.name}
              </li>
            </ol>
          </nav>
        </FadeIn>

        {/* gallery + purchase */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} />
          </FadeIn>

          <div>
            <FadeIn delay={0.08}>
              <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
                {category ? category.name : "Julian Naturals"}
              </p>
              <span aria-hidden className="mt-5 block h-px w-12 bg-primary" />
            </FadeIn>
            <FadeIn delay={0.14}>
              <h1 className="mt-6 font-serif text-5xl leading-[1.02] font-medium tracking-tight text-foreground sm:text-6xl xl:text-7xl">
                {product.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-5 text-xl font-light text-muted-foreground sm:text-2xl">
                {product.subtitle}
              </p>
            </FadeIn>
            <FadeIn delay={0.26} className="mt-10">
              <ProductPurchase product={product} />
            </FadeIn>
            <FadeIn delay={0.32}>
              <ul className="mt-10 grid gap-4 border-t border-olive/15 pt-8 sm:grid-cols-3">
                {TRUST.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-[15px] text-foreground/85">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-olive-50">
                      <Icon className="size-[18px] text-primary" strokeWidth={1.5} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>

        {/* details */}
        <div className="mt-20 md:mt-28">
          <DetailBlock title="About this product">
            <div className="space-y-5">
              {product.description.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            {product.note && (
              <p className="mt-8 font-serif text-2xl leading-snug text-foreground italic">
                {product.note}
              </p>
            )}
          </DetailBlock>

          <DetailBlock title="Why you’ll love it">
            <ul className="space-y-4">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-4">
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span className="text-foreground/85">{h}</span>
                </li>
              ))}
            </ul>
          </DetailBlock>

          {product.ingredients && (
            <DetailBlock title="Ingredients">
              <p className="text-foreground/85">{product.ingredients}</p>
            </DetailBlock>
          )}

          {product.howToUse && (
            <DetailBlock title="How to use">
              <ol className="space-y-5">
                {product.howToUse.map((step, i) => (
                  <li key={step} className="flex gap-5">
                    <span className="font-serif text-3xl leading-none text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/85">{step}</span>
                  </li>
                ))}
              </ol>
            </DetailBlock>
          )}
        </div>

        {/* related */}
        <section aria-labelledby="related-title" className="mt-16 border-t border-olive/15 pt-16 md:mt-20 md:pt-20">
          <FadeIn>
            <h2
              id="related-title"
              className="font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl"
            >
              You may also like
            </h2>
          </FadeIn>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {related.map((p, i) => (
              <li key={p.slug}>
                <FadeIn delay={0.08 * i}>
                  <Link href={`/shop/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ecebe8] ring-1 ring-olive/10">
                      <Image
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <h3 className="mt-5 font-serif text-3xl font-medium text-foreground transition-colors group-hover:text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-base font-medium text-primary tabular-nums">{p.price}</p>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
