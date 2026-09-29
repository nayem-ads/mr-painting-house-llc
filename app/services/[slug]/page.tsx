import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Aside, CtaBand, Faq, PageHero, Process, ReviewsBlock } from "@/components/Sections";
import { getServiceDoc, getShowcases, showcaseKind } from "@/lib/content";
import { FAQS, SERVICES } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = SERVICES.find((s) => s.slug === slug)!;
  const doc = getServiceDoc(slug);
  return { title: `${meta.name} in Phoenix & the East Valley`, description: doc?.cardSummary || doc?.metaDescription || meta.short, alternates: { canonical: `/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = SERVICES.find((s) => s.slug === slug);
  const doc = getServiceDoc(slug);
  if (!meta || !doc) notFound();
  const [intro, ...rest] = doc.sections;
  const kind = slug.includes("interior") ? "Interior" : slug.includes("cabinet") ? "Cabinets" : "Exterior";
  const projects = getShowcases().filter((s) => showcaseKind(s) === kind && s.images[0]).slice(0, 3);
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHero title={meta.name} text={intro?.body || meta.short} img={meta.img} crumbs={[["Home", "/"], ["Services", "/services"], [meta.name]]} />
      <section className="section">
        <div className="wrap two-col">
          <article className="prose">
            {rest.map((s, i) => (
              <div key={i}>
                {s.heading && <h2>{s.heading.replace(/:$/, "")}</h2>}
                {s.body && s.body.split(/\n+/).map((p, j) => <p key={j}>{p}</p>)}
                {!!s.bullets?.length && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              </div>
            ))}
            {rest.length === 0 && intro?.bullets?.length ? <ul>{intro.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          </article>
          <Aside />
        </div>
      </section>
      {projects.length > 0 && (
        <section className="section section--primer">
          <div className="wrap">
            <div className="head-row"><h2 className="h-lg">Recent {kind.toLowerCase()} projects</h2><Link className="btn btn--outline" href="/showcases">See all projects</Link></div>
            <div className="grid-cards">
              {projects.map((p) => <div className="pcard" key={p.title}><img src={p.images[0]!} alt={p.title} loading="lazy" /><div><span className="meta">{p.city}</span><h3>{p.title}</h3></div></div>)}
            </div>
          </div>
        </section>
      )}
      <Process />
      <ReviewsBlock limit={4} />
      <Faq items={FAQS.slice(0, 4)} />
      <section className="section">
        <div className="wrap">
          <h2 className="h-md" style={{ marginBottom: 24 }}>Other services</h2>
          <div className="grid-cards">{others.map((o) => <Link className="pcard" key={o.slug} href={`/services/${o.slug}`}><img src={o.img} alt="" loading="lazy" /><div><h3>{o.name}</h3><p>{o.short}</p></div></Link>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
