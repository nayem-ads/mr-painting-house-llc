import fs from "node:fs";
import path from "node:path";
import { BIZ, media } from "./site";

const dir = path.join(process.cwd(), "content");
const read = <T,>(f: string): T => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));

// The old site builder left "[Business Name]" placeholders in some copy.
const fix = (s: string | null | undefined) => (s || "").replaceAll("[Business Name]", BIZ.name);

export type Section = { heading: string | null; body: string | null; bullets?: string[] };
export type ServiceDoc = { slug: string; h1: string; metaDescription?: string; cardSummary?: string; sections: Section[] };
export function getServiceDoc(slug: string): ServiceDoc | undefined {
  const all = read<ServiceDoc[]>("services.json");
  const d = all.find((s) => s.slug === slug);
  if (!d) return;
  return {
    ...d,
    metaDescription: fix(d.metaDescription),
    cardSummary: fix(d.cardSummary),
    sections: d.sections.map((s) => ({ heading: s.heading, body: fix(s.body), bullets: (s.bullets || []).map(fix) })),
  };
}

export type Review = { name: string | null; rating: number; date?: string; source: string; text: string | null };
export function getReviews(): Review[] {
  return read<Review[]>("reviews.json").filter((r) => r.text && r.text.trim().length > 0);
}

export type Showcase = { title: string; city: string; date?: string; description: string; images: (string | null)[]; kind?: "Interior" | "Exterior" | "Cabinets" | "Pergola" };
export function getShowcases(): Showcase[] {
  return read<Showcase[]>("showcases.json").map((s) => ({ ...s, images: (s.images || []).filter(Boolean).map((u) => media(u as string, 1200)) }));
}
export function showcaseKind(s: Showcase): "Interior" | "Exterior" | "Cabinets" | "Pergola" {
  if (s.kind) return s.kind;
  const t = (s.title + " " + s.description).toLowerCase();
  if (t.includes("pergola")) return "Pergola";
  if (t.includes("cabinet")) return "Cabinets";
  if (/(interior|bathroom|bedroom|living room|kitchen|ceiling)/.test(t)) return "Interior";
  return "Exterior";
}

export type Post = { slug: string; title: string; h1?: string; date?: string; bodyMarkdown: string };
export function getPosts(): Post[] {
  const files = fs.readdirSync(path.join(dir, "blog")).filter((f) => f.endsWith(".json"));
  const posts = files.map((f) => read<Post>(path.join("blog", f)));
  return posts
    .map((p) => ({ ...p, title: p.h1 || p.title, bodyMarkdown: fix(p.bodyMarkdown) }))
    .sort((a, b) => Date.parse(b.date || "") - Date.parse(a.date || ""));
}
export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);
export const excerpt = (md: string, n = 170) => {
  const t = md.replace(/[#*_>-]/g, "").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n).replace(/\s\S*$/, "") + "…" : t;
};
