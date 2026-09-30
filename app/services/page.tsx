import type { Metadata } from "next";
import { CtaBand, PageHero, Process, ReviewsBlock, Swatches } from "@/components/Sections";
import { IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Painting Services",
  description: "Exterior and interior house painting, kitchen cabinet repainting, drywall repair, surface prep, deck and fence staining, cool deck restoration and flat roof coatings across the Phoenix Valley.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero title="Painting services" text="Everything a Valley home needs painted, repaired or recoated — handled by one licensed crew." img={IMG.stoneSign} crumbs={[["Home", "/"], ["Services"]]} />
      <Swatches title="What we do" all />
      <Process />
      <ReviewsBlock limit={4} />
      <CtaBand />
    </>
  );
}
