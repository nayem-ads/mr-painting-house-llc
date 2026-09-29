import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Aside, CtaBand, Faq, PageHero, Process, ReviewCards, Swatches } from "@/components/Sections";
import { getReviews, getShowcases } from "@/lib/content";
import { BIZ, CITIES, FAQS, IMG } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => CITIES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CITIES.find((x) => x.slug === slug)!;
  return {
    title: `House Painters in ${c.name}, AZ`,
    description: `Exterior, interior and kitchen cabinet painting in ${c.name}, AZ. Licensed ROC #${BIZ.roc}, 5.0 on Google, free written estimates. Call ${BIZ.phone}.`,
    alternates: { canonical: `/service-areas/${slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CITIES.find((x) => x.slug === slug);
  if (!c) notFound();
  const projects = getShowcases().filter((s) => c.showcaseCity && s.city === c.showcaseCity && s.images[0]).slice(0, 6);
  const local = getReviews().filter((r) => r.text?.includes(c.name));
  const others = CITIES.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero title={`Professional painting service for ${c.name}`} text={`Exterior, interior and kitchen cabinet painting for ${c.name} homes — with the prep that keeps paint from failing in Arizona sun.`} img={projects[0]?.images[0] || IMG.twoStory} crumbs={[["Home", "/"], ["Service areas", "/service-areas"], [c.name]]} />
      <section className="section">
        <div className="wrap two-col">
          <article className="prose">
            <h2>Painting {c.name} homes the right way</h2>
            <p>{BIZ.name} is a licensed Arizona painting contractor (ROC #{BIZ.roc}) based in Laveen. We paint homes in {c.name} and across the Valley, with a written estimate before any work starts.</p>
            <p>Every job starts with preparation: power washing, fixing cracks, scraping loose paint and priming for proper adhesion. We cover walls, windows, floors, lights and landscaping, then finish with premium Sherwin-Williams coatings.</p>
            <h2>Our services in {c.name}</h2>
            <ul>
              {["Exterior Painting", "Interior Painting", "Deck and Fence Staining", "Kitchen Cabinet Repainting", "Drywall Installation & Repair", "Detailed Surface Preparation", "Flat Roof Application", "Cool Deck Restoration"].map((s) => <li key={s}>{s}</li>)}
            </ul>
            <h2>Get a quote</h2>
            <p>Receiving a quote is easy and only takes three simple steps:</p>
            <ul><li>Send us a text</li><li>Chat on the phone</li><li>Receive a quote</li></ul>
          </article>
          <Aside />
        </div>
      </section>
      {projects.length > 0 && (
        <section className="section section--primer">
          <div className="wrap">
            <div className="head-row"><h2 className="h-lg">Projects in {c.name}</h2><Link className="btn btn--outline" href="/showcases">See all projects</Link></div>
            <div className="grid-cards">{projects.map((p) => <div className="pcard" key={p.title}><img src={p.images[0]!} alt={p.title} loading="lazy" /><div><span className="meta">{p.city}{p.date ? " — " + p.date : ""}</span><h3>{p.title}</h3><p>{p.description}</p></div></div>)}</div>
          </div>
        </section>
      )}
      {local.length > 0 && (
        <section className="section">
          <div className="wrap"><h2 className="h-lg" style={{ marginBottom: 32 }}>{c.name} homeowners on Google</h2><ReviewCards reviews={local} /></div>
        </section>
      )}
      <Swatches />
      <Process />
      <Faq items={FAQS} />
      <section className="section">
        <div className="wrap">
          <h2 className="h-md" style={{ marginBottom: 20 }}>Nearby areas</h2>
          <div className="filters">{others.map((o) => <Link key={o.slug} className="btn btn--outline" href={`/service-areas/${o.slug}`}>{o.name}</Link>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
