"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BIZ, IMG, NAV } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>AZ ROC #{BIZ.roc} — Licensed, bonded &amp; insured</span>
          <span className="hide-sm">Se habla español · Mon–Fri 6am–7pm, Sat 7am–5pm, Sun 8am–3pm</span>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="logo" aria-label={BIZ.name + " home"}>
            <img src={IMG.logo} alt={BIZ.name} width={220} height={110} />
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>{n.label}</Link>)}
          </nav>
          <div className="header-cta">
            <a className="header-phone" href={BIZ.phoneHref}><small>Call or text</small><span>{BIZ.phone}</span></a>
            <Link className="btn btn--red" href="/contact">Free estimate</Link>
            <button className="menu-btn" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}><span /><b className="sr-only">Menu</b></button>
          </div>
        </div>
        <div className="mobile-nav" id="mnav" data-open={open}>
          {[...NAV, { href: "/blog", label: "Blog" }, { href: "/about", label: "About" }, { href: "/faq", label: "FAQ" }, { href: "/contact", label: "Contact" }].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <a className="btn btn--red mt" style={{ width: "100%" }} href={BIZ.phoneHref}>Call {BIZ.phone}</a>
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
