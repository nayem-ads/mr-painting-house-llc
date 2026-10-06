import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Sections";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { getShowcases, showcaseKind } from "@/lib/content";
import { IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work — Project Showcases",
  description: "Real exterior, interior, cabinet and pergola projects by Mr Painting Houses LLC in Phoenix, Gilbert, Chandler, Scottsdale and across the Valley.",
  alternates: { canonical: "/showcases" },
};

export default function Showcases() {
  const items = getShowcases().map((s) => ({ title: s.title, city: s.city, date: s.date, description: s.description, image: s.images[0] || null, kind: showcaseKind(s) }));
  return (
    <>
      <PageHero title="Real homes we've painted" text={`${items.length} projects across the Valley — every photo is our crew's work.`} img={IMG.pool} crumbs={[["Home", "/"], ["Our work"]]} />
      <section className="section"><div className="wrap"><ShowcaseGrid items={items} /></div></section>
      <CtaBand />
    </>
  );
}
