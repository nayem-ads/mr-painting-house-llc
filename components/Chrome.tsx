"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BIZ, CITIES, IMG, SERVICES } from "@/lib/site";

type Item = { href: string; label: string };
type Menu = { label: string; href: string; items?: Item[] };

const MENU: Menu[] = [
  { label: "Services", href: "/services", items: [...SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name })), { href: "/services", label: "All services" }] },
  { label: "Service areas", href: "/service-areas", items: [...CITIES.map((c) => ({ href: `/service-areas/${c.slug}`, label: c.name })), { href: "/service-areas", label: "All service areas" }] },
  { label: "Our work", href: "/showcases" },
  { label: "Reviews", href: "/reviews" },
  { label: "30 years", href: "/30-years" },
  { label: "About", href: "/about", items: [{ href: "/about", label: "About us" }, { href: "/faq", label: "FAQ" }, { href: "/blog", label: "Blog" }, { href: "/contact", label: "Contact" }] },
];

function Chevron() {
  return <svg className="chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const path = usePathname();
  const active = (m: Menu) => path === m.href || !!m.items?.some((i) => i.href === path) || path.startsWith(m.href + "/");

  useEffect(() => { setOpen(false); setSub(null); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setSub(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="hide-xs">AZ ROC #{BIZ.roc} — Licensed, bonded &amp; insured</span>
          <span className="show-xs">AZ ROC #{BIZ.roc} · Licensed, bonded &amp; insured</span>
          <span className="hide-sm">Se habla español · Mon–Fri 6am–7pm, Sat 7am–5pm, Sun 8am–3pm</span>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="logo" aria-label={BIZ.name + " home"}>
            <img src={IMG.logo} alt={BIZ.name} width={220} height={110} />
          </Link>
          <nav className="nav" aria-label="Main">
            {MENU.map((m) =>
              m.items ? (
                <div className="dd" key={m.label} data-open={sub === m.label} onMouseEnter={() => setSub(m.label)} onMouseLeave={() => setSub(null)}>
                  <button className={"dd__btn" + (active(m) ? " is-active" : "")} aria-expanded={sub === m.label} onClick={() => setSub(sub === m.label ? null : m.label)}>
                    {m.label} <Chevron />
                  </button>
                  <div className="dd__panel">
                    {m.items.map((i) => <Link key={i.href + i.label} href={i.href} aria-current={path === i.href ? "page" : undefined}>{i.label}</Link>)}
                  </div>
                </div>
              ) : (
                <Link key={m.href} href={m.href} className={active(m) ? "is-active" : undefined}>{m.label}</Link>
              )
            )}
          </nav>
          <div className="header-cta">
            <a className="header-phone" href={BIZ.phoneHref}><small>Call or text</small><span>{BIZ.phone}</span></a>
            <Link className="btn btn--red" href="/contact">Free estimate</Link>
            <button className="menu-btn" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
              <span /><b className="sr-only">{open ? "Close menu" : "Open menu"}</b>
            </button>
          </div>
        </div>
        <div className="mobile-nav" id="mnav" data-open={open}>
          {MENU.map((m) =>
            m.items ? (
              <details key={m.label} className="mnav__group">
                <summary>{m.label} <Chevron /></summary>
                <div className="mnav__items">{m.items.map((i) => <Link key={i.href + i.label} href={i.href} onClick={() => setOpen(false)}>{i.label}</Link>)}</div>
              </details>
            ) : (
              <Link key={m.href} className="mnav__link" href={m.href} onClick={() => setOpen(false)}>{m.label}</Link>
            )
          )}
          <div className="mnav__ctas">
            <Link className="btn btn--red" href="/contact" onClick={() => setOpen(false)}>Get a free estimate</Link>
            <a className="btn btn--outline" href={BIZ.phoneHref}>Call {BIZ.phone}</a>
          </div>
        </div>
      </header>
    </>
  );
}

export function StickyBar() {
  return (
    <div className="stickybar">
      <a className="btn btn--outline" href={BIZ.phoneHref}>Call now</a>
      <Link className="btn btn--red" href="/contact">Free estimate</Link>
    </div>
  );
}
