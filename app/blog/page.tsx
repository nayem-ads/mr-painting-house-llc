import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/Sections";
import { excerpt, getPosts } from "@/lib/content";
import { IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Painting Tips & Ideas — Blog",
  description: "Painting advice for Arizona homeowners: prep, paint finishes, color choices, curb appeal and maintenance.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <PageHero title="Painting tips & ideas" text="Advice from the crew on prep, finishes, colors and keeping paint looking good in Arizona." img={IMG.kitchen} crumbs={[["Home", "/"], ["Blog"]]} cta={false} />
      <section className="section">
        <div className="wrap grid-cards">
          {posts.map((p) => (
            <Link key={p.slug} className="pcard" href={`/blog/${p.slug}`}>
              <div><span className="meta">{p.date}</span><h3>{p.title}</h3><p>{excerpt(p.bodyMarkdown)}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
