import type { Metadata } from "next";

import { StoryBeginning } from "@/components/story/story-beginning";
import { StoryCta } from "@/components/story/story-cta";
import { StoryGallery } from "@/components/story/story-gallery";
import { StoryHero } from "@/components/story/story-hero";
import { StoryTimeline } from "@/components/story/story-timeline";
import { StoryValues } from "@/components/story/story-values";

export const metadata: Metadata = {
  title: "Our Story — Julian Naturals",
  description:
    "How a family farm in Julian, California turned a kitchen-table lip balm into a line of truly natural, small-batch body care.",
};

export default function OurStoryPage() {
  return (
    <>
      <StoryHero />
      <StoryBeginning />
      <StoryTimeline />
      <StoryValues />
      <StoryGallery />
      <StoryCta />
    </>
  );
}
