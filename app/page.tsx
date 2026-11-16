import { FeaturedProducts } from "@/components/site/featured-products";
import { Hero } from "@/components/site/hero";
import { OurProcess } from "@/components/site/our-process";
import { OurStory } from "@/components/site/our-story";

export default function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <OurProcess />
      <FeaturedProducts />
    </>
  );
}
