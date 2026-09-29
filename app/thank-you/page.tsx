import type { Metadata } from "next";
import Link from "next/link";
import { BIZ } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function Thanks() {
  return (
    <section className="section section--black" style={{ minHeight: "60vh" }}>
      <div className="wrap">
        <span className="tape">Request received</span>
        <h1 className="h-xl" style={{ margin: "24px 0 18px", maxWidth: "14ch" }}>Thanks — we&apos;ll be in touch.</h1>
        <p className="lead">We&apos;ll call you to schedule your free walkthrough. Need us sooner? Call or text {BIZ.phone}.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          <a className="btn btn--red" href={BIZ.phoneHref}>Call {BIZ.phone}</a>
          <Link className="btn btn--outline" href="/showcases">See our work</Link>
        </div>
      </div>
    </section>
  );
}
