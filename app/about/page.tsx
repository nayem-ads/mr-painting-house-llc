import type { Metadata } from "next";
import { CtaBand, PageHero, Process, ProofBand, ReviewsBlock } from "@/components/Sections";
import { BIZ, IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${BIZ.name} is a licensed Laveen-based painting contractor (AZ ROC #${BIZ.roc}) serving homes across the Phoenix Valley.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero title="About Mr Painting Houses" text={`A licensed Laveen crew with ${BIZ.years} years of experience painting Arizona homes.`} img={IMG.pool} crumbs={[["Home", "/"], ["About"]]} />
      <ProofBand />
      <section className="section">
        <div className="wrap yard" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <img src={IMG.crew} alt="The Mr Painting Houses crew" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", objectPosition: "center 80%" }} />
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Who we are</h2>
            <p>Mr Painting Houses is the leading local painting company in Phoenix markets. We specialize in interior and exterior painting for residential locations. We are known for our commitment to quality, professionalism and a high level of customer satisfaction.</p>
            <p>Our team of skilled painters use top-quality paints and materials to deliver exceptional results that are long-lasting. Whether it&apos;s a brand new fresh coat of paint to revitalize your home or a durable exterior coating to protect your investment, we can tailor our services to meet your unique needs.</p>
            <h2>Premium materials for lasting protection</h2>
            <p>A high-quality job starts with industry-leading materials. To ensure exceptional durability and flawless results, we trust top-tier products designed to withstand the harsh Arizona elements:</p>
            <ul>
              <li>Sherwin-Williams Emerald® &amp; Duration®</li>
              <li>Emerald® Urethane Trim Enamel &amp; Scuff Tuff®</li>
              <li>Pro-Cryl® Universal Primer &amp; DTM Acrylic</li>
            </ul>
            <p>Licensed, bonded and insured — Arizona ROC #{BIZ.roc}.</p>
          </div>
        </div>
      </section>
      <Process />
      <ReviewsBlock limit={4} />
      <CtaBand />
    </>
  );
}
