import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { BIZ, CITIES, SERVICES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => BIZ.siteUrl + p;
  const staticPages = ["", "/services", "/service-areas", "/showcases", "/reviews", "/blog", "/about", "/faq", "/contact", "/privacy-policy"];
  return [
    ...staticPages.map((p) => ({ url: u(p) })),
    ...SERVICES.map((s) => ({ url: u(`/services/${s.slug}`) })),
    ...CITIES.map((c) => ({ url: u(`/service-areas/${c.slug}`) })),
    ...getPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: p.date ? new Date(p.date) : undefined })),
  ];
}
