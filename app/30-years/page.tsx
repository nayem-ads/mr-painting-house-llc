import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, ProofBand, ReviewsBlock } from "@/components/Sections";
import { BIZ } from "@/lib/site";

export const metadata: Metadata = {
  title: "30 Years Painting Arizona Homes",
  description: `Meet the crew behind Mr Painting Houses LLC — ${BIZ.years} years of painting experience, licensed AZ ROC #${BIZ.roc}, and part of the Valley's trades community.`,
  alternates: { canonical: "/30-years" },
};

const EVENTS = [
  { src: "/team/event-orange-polo.jpg", alt: "Mr Painting Houses team member in a company polo at a trades event" },
  { src: "/team/event-award.jpg", alt: "Mr Painting Houses team at a contractors' event" },
  { src: "/team/event-table.jpg", alt: "Painters and contractors at a Valley trades event" },
  { src: "/team/event-selfie-hite.jpg", alt: "Mr Painting Houses team with fellow contractors at a business event" },
  { src: "/team/event-htm.jpg", alt: "Mr Painting Houses team with local tradespeople" },
  { src: "/team/event-floor.jpg", alt: "Mr Painting Houses team with a fellow contractor at an industry event" },
];

export default function ThirtyYears() {
  return (
    <>
      <section className="ty-hero">
        <div className="wrap ty-hero__grid">
          <div className="ty-hero__copy">
            <nav className="crumbs" aria-label="Breadcrumb"><span><Link href="/">Home</Link> /</span><span>30 years</span></nav>
            <p className="ty-big">{BIZ.years}<span>years</span></p>
            <h1>Three decades of painting Arizona homes.</h1>
            <p className="lead">The same crew that shows up in our uniforms on your street — licensed, bonded and insured under AZ ROC #{BIZ.roc}, and still doing the prep work the right way.</p>
            <div className="ty-actions">
              <Link className="btn btn--red" href="/contact">Get a free estimate</Link>
              <a className="btn btn--outline" href={BIZ.phoneHref}>Call {BIZ.phone}</a>
            </div>
          </div>
          <figure className="ty-hero__photo">
            <img src="/team/crew-poolside.jpg" alt="The Mr Painting Houses crew in company shirts at a finished poolside job" fetchPriority="high" />
            <figcaption>The crew, on the job in the Valley</figcaption>
          </figure>
        </div>
      </section>

      <ProofBand />

      <section className="section">
        <div className="wrap ty-values">
          <div>
            <h2 className="h-lg">What 30 years teaches you</h2>
            <p className="lead mt">Arizona sun is hard on paint. After three decades of repainting Valley homes, we know the shortcuts that fail — and we don&apos;t take them.</p>
          </div>
          <ul className="ty-list">
            <li><b>Prep comes first.</b> Power washing, crack repair, scraping and priming before a single topcoat goes on.</li>
            <li><b>The right product for each surface.</b> Sherwin-Williams Emerald®, Duration®, Urethane Trim Enamel and Pro-Cryl® — matched to stucco, trim, metal and cabinets.</li>
            <li><b>Your home is protected.</b> Walls, windows, floors, lights and landscaping covered before we start.</li>
            <li><b>A written quote, every time.</b> Free estimates with the scope, products and price spelled out.</li>
          </ul>
        </div>
      </section>

      <section className="section section--primer">
        <div className="wrap">
          <div className="head-row">
            <h2 className="h-lg">Part of the Valley&apos;s trades community</h2>
            <p className="lead">We show up for more than jobs — industry events, contractor meetups and the people who keep Arizona&apos;s trades strong.</p>
          </div>
          <div className="ty-gallery">
            {EVENTS.map((e) => <img key={e.src} src={e.src} alt={e.alt} loading="lazy" />)}
          </div>
        </div>
      </section>

      <ReviewsBlock limit={4} primer={false} />
      <CtaBand />
    </>
  );
}
