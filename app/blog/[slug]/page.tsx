import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Aside, CtaBand, PageHero } from "@/components/Sections";
import { excerpt, getPost, getPosts } from "@/lib/content";
import { Markdown } from "@/lib/md";

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug)!;
  return { title: p.title, description: excerpt(p.bodyMarkdown, 155), alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article" } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = getPosts().filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <>
      <PageHero title={p.title} text={p.date} crumbs={[["Home", "/"], ["Blog", "/blog"], [p.title]]} cta={false} />
      <section className="section">
        <div className="wrap two-col">
          <article className="prose"><Markdown md={p.bodyMarkdown} /></article>
          <Aside />
        </div>
      </section>
      <section className="section section--primer">
        <div className="wrap">
          <h2 className="h-md" style={{ marginBottom: 24 }}>More from the blog</h2>
          <div className="grid-cards">{more.map((m) => <Link key={m.slug} className="pcard" href={`/blog/${m.slug}`}><div><span className="meta">{m.date}</span><h3>{m.title}</h3><p>{excerpt(m.bodyMarkdown, 120)}</p></div></Link>)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
