import type { Metadata } from "next";
import { CtaBand, PageHero, ReviewCards } from "@/components/Sections";
import { getReviews } from "@/lib/content";
import { BIZ, IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `Read what homeowners say about Mr Painting Houses LLC — ${BIZ.google.rating} stars from ${BIZ.google.count} Google reviews.`,
  alternates: { canonical: "/reviews" },
};

export default function Reviews() {
  const reviews = getReviews();
  return (
    <>
      <PageHero title="What homeowners say" text={`${BIZ.google.rating} stars from ${BIZ.google.count} Google reviews. Every review below is from a real customer.`} img={IMG.singleStory} crumbs={[["Home", "/"], ["Reviews"]]} cta={false} />
      <section className="section section--primer">
        <div className="wrap reviews">
          <div className="score">
            <b>{BIZ.google.rating}</b><div className="stars">★★★★★</div>
            <p style={{ fontWeight: 600 }}>{BIZ.google.count} reviews on Google</p>
            <div style={{ display: "grid", gap: 10 }}>
              <a className="btn btn--black" href={BIZ.google.url} target="_blank" rel="noopener">Read them on Google</a>
              <a className="btn btn--outline" href={BIZ.google.url} target="_blank" rel="noopener">Leave us a review</a>
            </div>
          </div>
          <ReviewCards reviews={reviews} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
