import Link from "next/link";
import { BIZ, CITIES, FOOTER_AREAS, HOURS, IMG, SERVICES, SOCIAL } from "@/lib/site";

// Mirrors the old site footer: Company, Services, Service Areas, Hours (+ contact and socials).
export function Footer() {
  const cityHref = (n: string) => {
    const c = CITIES.find((c) => c.name === n);
    return c ? `/service-areas/${c.slug}` : null;
  };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__plate"><img src={IMG.logo} alt={BIZ.name} width={200} height={100} /></span>
            <a className="footer__phone" href={BIZ.phoneHref}>{BIZ.phone}</a>
            <p className="footer__muted" style={{ margin: 0 }}>
              <a href={"mailto:" + BIZ.email}>{BIZ.email}</a><br />
              {BIZ.street}, {BIZ.city}, {BIZ.region} {BIZ.zip}<br />
              AZ ROC #{BIZ.roc} — Licensed, Bonded &amp; Insured
            </p>
            <div className="footer__social">{SOCIAL.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener">{s.label}</a>)}</div>
          </div>
          <details open>
            <summary>Company</summary>
            <h2>Company</h2>
            <ul>{[["/", "Home"], ["/showcases", "Showcases"], ["/reviews", "Reviews"], ["/blog", "Blog"], ["/about", "About"], ["/faq", "FAQ"], ["/contact", "Contact"]].map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </details>
          <details open>
            <summary>Services</summary>
            <h2>Services</h2>
            <ul>{SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul>
          </details>
          <details open>
            <summary>Service areas</summary>
            <h2>Service Areas</h2>
            <ul className="footer__areas">
              {FOOTER_AREAS.map((a) => { const h = cityHref(a); return <li key={a}>{h ? <Link href={h}>{a}, AZ</Link> : <>{a}, AZ</>}</li>; })}
            </ul>
          </details>
          <details open>
            <summary>Hours</summary>
            <h2>Hours</h2>
            <ul className="footer__hours">{HOURS.map(([d, t]) => <li key={d}>{d}<span>{t}</span></li>)}</ul>
          </details>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} MR Painting Houses LLC. All rights reserved.</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
