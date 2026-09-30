import Link from "next/link";
import { BIZ, CITIES, FAQS, HOURS, IMG, SERVICES } from "@/lib/site";
import { getReviews, type Review } from "@/lib/content";
import { FullForm, QuickForm } from "./Forms";

export function Hero() {
  return (
    <section className="hero" aria-label="Intro">
      <div className="hero__stage">
        <img className="hero__img" src={IMG.exteriorMasking} alt="Mr Painting Houses painter masking a stucco home before spraying" fetchPriority="high" />
        <img className="hero__faded" src={IMG.exteriorMasking} alt="" aria-hidden="true" />
        <div className="hero__scrim" />
        <div className="hero__edge" aria-hidden="true" />
        <div className="roller" aria-hidden="true"><div className="roller__frame" /><div className="roller__cover" /><div className="roller__handle" /></div>
        <span className="tape" aria-hidden="true">Painting in progress…</span>
        <div className="wrap hero__copy">
          <a className="gbadge" href={BIZ.google.url} target="_blank" rel="noopener"><span className="g">G</span>{BIZ.google.rating} <span className="stars">★★★★★</span> {BIZ.google.count} Google reviews</a>
          <h1 className="h-xl">We paint it right. Then we leave it spotless.</h1>
          <p>House painters for Phoenix, Laveen and the East Valley. Exterior, interior and kitchen cabinets — licensed crew, {BIZ.years} years of experience.</p>
        </div>
      </div>
      <div className="wrap hero__form"><QuickForm source="home-hero" /></div>
    </section>
  );
}

export function ProofBand() {
  return (
    <section className="proof" aria-label="Why homeowners trust us">
      <div className="wrap">
        <div className="proof__item"><b style={{ color: "var(--star)" }}>{BIZ.google.rating}</b><span>Google rating from {BIZ.google.count} reviews</span></div>
        <div className="proof__item"><b>ROC</b><span>#{BIZ.roc} licensed, bonded and insured</span></div>
        <div className="proof__item"><b>{BIZ.years}</b><span>Years painting Arizona homes</span></div>
        <div className="proof__item"><b>SW</b><span>Sherwin-Williams Emerald® and Duration®</span></div>
      </div>
    </section>
  );
}

export function Swatches({ title = "Pick your project", all = false }: { title?: string; all?: boolean }) {
  const list = all ? SERVICES : [...SERVICES.filter((s) => s.featured), SERVICES[3], SERVICES[6]];
  return (
    <section className="section section--primer">
      <div className="wrap">
        <div className="head-row"><h2 className="h-lg">{title}</h2><p className="lead">Exterior, interior and cabinets are the big three. We handle the repairs underneath so the paint lasts.</p></div>
        <div className="swatches" style={all ? { gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" } : undefined}>
          {list.map((s) => (
            <Link key={s.slug} className="swatch" href={`/services/${s.slug}`}>
              <img src={s.img} alt="" loading="lazy" />
              <div><h3>{s.name}</h3><p>{s.short}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function YardSign() {
  const r = getReviews();
  const pick = (n: string) => r.find((x) => x.name === n);
  const q = [
    ["Alejandro M., Gilbert", "The quality of the work exceeded my expectations", pick("Alejandro Martinez")],
    ["David P., Gilbert", "Exceeded every expectation I had", pick("David Perez")],
    ["Denis B.", "No sign that they were even there!!", pick("Denis Butorin")],
  ].filter((x) => x[2]);
  return (
    <section className="section">
      <div className="wrap yard">
        <figure className="signphoto"><img src={IMG.stoneSign} alt="Mr Painting Houses yard sign outside a home the crew is repainting" loading="lazy" /></figure>
        <div>
          <h2 className="h-lg">Seen our sign on your street?</h2>
          <p className="lead mt">Our crews paint homes across the Valley, from Goodyear to Gilbert. Ask your neighbors — then ask us for the same finish on yours.</p>
          <div className="quotes3">{q.map(([who, text]) => <figure key={who as string}><figcaption>{who as string}</figcaption><blockquote>“{text as string}{/[!?.]$/.test(text as string) ? "" : "."}”</blockquote></figure>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps: [string, string, string][] = [
    ["Walkthrough", "We inspect every wall, eave and fascia board, talk colors and give you a written quote.", IMG.truck],
    ["Protect & prep", "Cover walls, windows, floors, lights and landscaping. Power wash, scrape, fix cracks.", IMG.kitchenProtected],
    ["Prime", "Prime for proper adhesion — Pro-Cryl® and DTM on bare spots, patches and metal.", IMG.exteriorMasking],
    ["Paint", "Premium Sherwin-Williams coatings, with elastomeric on fascia where it's needed.", IMG.interiorRolling],
    ["Final walk", "We walk it with you and clean up until there's no sign we were there.", IMG.kitchenFinished],
  ];
  return (
    <section className="section section--black">
      <div className="wrap">
        <div className="head-row"><h2 className="h-lg">How a job goes</h2><p className="lead">Prep is where most paint jobs fail in Arizona heat. It's where we spend the most time.</p></div>
        <ol className="steps">
          {steps.map(([t, d, img], i) => (
            <li key={t}><span className="tape">Step {i + 1}</span><div className="bar" /><h3>{t}</h3><p>{d}</p><img src={img} alt="" loading="lazy"  /></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Gallery() {
  const g = [IMG.kitchenFinished, IMG.pool, IMG.stoneSign, IMG.cabinetsProgress, IMG.yardSign, IMG.cabinets, IMG.interiorRolling, IMG.twoStoryC, IMG.kitchen, IMG.twoStoryB];
  return (
    <section className="section">
      <div className="wrap">
        <div className="head-row"><h2 className="h-lg">Real homes we&apos;ve painted</h2><Link className="btn btn--outline" href="/showcases">See all projects</Link></div>
        <div className="gallery">
          {g.map((src, i) => <img key={src} src={src} alt="Project by Mr Painting Houses" loading="lazy" className={i === 0 ? "wide" : i === g.length - 1 ? "wide2" : undefined} />)}
        </div>
      </div>
    </section>
  );
}

export function ReviewCards({ reviews }: { reviews: Review[] }) {
  return (
    <div className="cards">
      {reviews.map((r, i) => (
        <figure className="rcard" key={i}>
          <div className="rcard__top"><span className="stars">★★★★★</span><span style={{ fontWeight: 700, color: r.source === "Google" ? "#4285f4" : "#1877f2" }}>{r.source === "Google" ? "G" : "f"}</span></div>
          <blockquote>{r.text}</blockquote>
          <figcaption><b>{r.name || "Facebook reviewer"}</b> <span>{r.source} review</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ReviewsBlock({ limit = 6, primer = true }: { limit?: number; primer?: boolean }) {
  const order = ["Alejandro Martinez", "Denis Butorin", "David Perez", "Tracy", "Ramon Garcia", "Dan Knak", "William Ghooray", "Lina Gage"];
  const all = getReviews().filter((r) => r.source === "Google");
  const list = [...order.map((n) => all.find((r) => r.name === n)).filter(Boolean) as Review[], ...all.filter((r) => !order.includes(r.name || ""))].slice(0, limit);
  return (
    <section className={"section" + (primer ? " section--primer" : "")}>
      <div className="wrap reviews">
        <div className="score">
          <b>{BIZ.google.rating}</b><div className="stars">★★★★★</div>
          <p style={{ fontWeight: 600 }}>{BIZ.google.count} reviews on Google</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn--black" href={BIZ.google.url} target="_blank" rel="noopener">Read them on Google</a>
            <Link className="btn btn--outline" href="/reviews">All reviews</Link>
          </div>
        </div>
        <ReviewCards reviews={list} />
      </div>
    </section>
  );
}

export function AreaMap() {
  const W = 1.05, H = 0.8; // lon/lat span of the drawn area
  const pos = (lat: number, lon: number) => ({ left: `${((lon + 112.45) / W) * 100}%`, top: `${((33.9 - lat) / H) * 100}%` });
  const hq = CITIES[0];
  return (
    <section className="section">
      <div className="wrap areas">
        <div>
          <h2 className="h-lg">Based in Laveen. Painting the whole Valley.</h2>
          <p className="lead mt">From Goodyear to San Tan Valley — every city page shows local projects and reviews.</p>
          <div className="arealinks">{CITIES.slice(1, 6).map((c) => <Link key={c.slug} href={`/service-areas/${c.slug}`}>{c.name} house painters ›</Link>)}<Link href="/service-areas">All service areas ›</Link></div>
        </div>
        <div className="map" role="img" aria-label="Map of the Phoenix Valley showing cities we serve">
          {[1, 2, 3, 4, 5].map((i) => <span key={i} className="map__ring" style={{ ...pos(hq.lat, hq.lon), width: `${i * 24}%`, aspectRatio: "1" }} />)}
          {CITIES.map((c, i) => (
            <Link key={c.slug} href={`/service-areas/${c.slug}`} className={"map__pin" + (i === 0 ? " map__pin--hq" : "")} style={pos(c.lat, c.lon)}>
              <span>{i === 0 ? "Laveen HQ" : c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq({ items = FAQS, title = "Good questions." }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section section--primer">
      <div className="wrap faq">
        <div><h2 className="h-lg">{title}</h2><p className="lead mt">Still wondering about something? Call or text {BIZ.phone}.</p></div>
        <div className="faq__list">
          {items.map((f, i) => <details key={f.q} open={i < 2}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </div>
      </div>
    </section>
  );
}

export function FullFormSection({ id = "estimate" }: { id?: string }) {
  return (
    <section id={id} className="fullform" aria-label="Free estimate form">
      <div className="fullform__side">
        <h2 className="h-lg">Let&apos;s paint your home.</h2>
        <p style={{ fontWeight: 500, fontSize: 18, margin: 0 }}>Tell us about the project and we&apos;ll schedule a free walkthrough and written quote.</p>
        <dl>
          <div><dt>Call or text</dt><dd><a href={BIZ.phoneHref}>{BIZ.phone}</a></dd></div>
          <div><dt>Email</dt><dd><a href={"mailto:" + BIZ.email}>{BIZ.email}</a></dd></div>
          <div><dt>Office</dt><dd>{BIZ.street}, {BIZ.city}, {BIZ.region} {BIZ.zip}</dd></div>
          <div><dt>Hours</dt><dd>Mon–Fri {HOURS[0][1]}<br />Sat {HOURS[5][1]} · Sun {HOURS[6][1]}</dd></div>
        </dl>
      </div>
      <div className="fullform__main"><FullForm /></div>
    </section>
  );
}

export function PageHero({ title, text, img, crumbs, cta = true }: { title: string; text?: string; img?: string; crumbs: [string, string?][]; cta?: boolean }) {
  return (
    <section className="phero">
      {img && <img src={img} alt="" />}
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map(([l, h], i) => <span key={l}>{h ? <Link href={h}>{l}</Link> : l}{i < crumbs.length - 1 && " /"}</span>)}
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {cta && <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Link className="btn btn--red" href="/contact">Get a free estimate</Link><a className="btn btn--outline" href={BIZ.phoneHref}>Call {BIZ.phone}</a></div>}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="section section--red cta-band" style={{ padding: "56px 0" }}>
      <div className="wrap">
        <div><h2 className="h-md">Ready for a fresh coat?</h2><p style={{ margin: "8px 0 0", fontWeight: 500 }}>Free written estimate. No pressure.</p></div>
        <div className="actions"><Link className="btn btn--white" href="/contact">Get my free estimate</Link><a className="btn btn--outline" href={BIZ.phoneHref}>Call {BIZ.phone}</a></div>
      </div>
    </section>
  );
}

export function Aside() {
  return (
    <aside className="aside">
      <h2>Free estimate</h2>
      <p style={{ margin: 0 }}>Written quote, no obligation. Licensed, bonded &amp; insured — AZ ROC #{BIZ.roc}.</p>
      <Link className="btn btn--red" href="/contact">Request an estimate</Link>
      <a className="btn btn--outline" href={BIZ.phoneHref}>Call {BIZ.phone}</a>
      <a className="gbadge" style={{ justifySelf: "start" }} href={BIZ.google.url} target="_blank" rel="noopener"><span className="g">G</span>{BIZ.google.rating} <span className="stars">★★★★★</span> {BIZ.google.count} reviews</a>
    </aside>
  );
}
