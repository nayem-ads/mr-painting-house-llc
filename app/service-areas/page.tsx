import type { Metadata } from "next";
import Link from "next/link";
import { AreaMap, CtaBand, PageHero, ReviewsBlock } from "@/components/Sections";
import { CITIES, FOOTER_AREAS, IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "Based in Laveen, painting homes across the Phoenix Valley — Phoenix, Gilbert, Chandler, Scottsdale, Paradise Valley, Fountain Hills, San Tan Valley, Goodyear and more.",
  alternates: { canonical: "/service-areas" },
};

export default function Areas() {
  const others = FOOTER_AREAS.filter((a) => !CITIES.some((c) => c.name === a));
  return (
    <>
      <PageHero title="Where we paint" text="Home base is Laveen. Our crews paint homes from the West Valley to the East Valley." img={IMG.truck} crumbs={[["Home", "/"], ["Service areas"]]} />
      <AreaMap />
      <section className="section section--primer">
        <div className="wrap">
          <h2 className="h-lg" style={{ marginBottom: 32 }}>City pages</h2>
          <div className="grid-cards">
            {CITIES.map((c) => <Link key={c.slug} className="pcard" href={`/service-areas/${c.slug}`}><div><span className="meta">Arizona</span><h3>{c.name} house painters</h3><p>Exterior, interior and cabinet painting in {c.name}.</p></div></Link>)}
          </div>
          <p className="lead mt">We also paint in {others.join(", ")}. Call {""}<a href="tel:+16233406818">(623) 340-6818</a> to check your address.</p>
        </div>
      </section>
      <ReviewsBlock limit={4} primer={false} />
      <CtaBand />
    </>
  );
}
