import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section"><div className="wrap">
      <span className="tape">404</span>
      <h1 className="h-lg" style={{ margin: "20px 0" }}>This wall hasn&apos;t been painted yet.</h1>
      <p className="lead">The page you&apos;re looking for moved or doesn&apos;t exist.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}><Link className="btn btn--red" href="/">Go to the homepage</Link><Link className="btn btn--outline" href="/contact">Get a free estimate</Link></div>
    </div></section>
  );
}
