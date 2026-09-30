import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, StickyBar } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { BIZ, HOURS, IMG } from "@/lib/site";


export const metadata: Metadata = {
  metadataBase: new URL(BIZ.siteUrl),
  title: { default: "House Painters in Phoenix, Laveen & the East Valley | Mr Painting Houses LLC", template: "%s | Mr Painting Houses LLC" },
  description: `Licensed Arizona house painters (ROC #${BIZ.roc}). Exterior, interior and kitchen cabinet painting across Phoenix, Gilbert, Chandler, Scottsdale and Laveen. 5.0 on Google. Free written estimates.`,
  openGraph: { type: "website", siteName: BIZ.name, images: [IMG.pool] },
  icons: { icon: IMG.logo },
};
export const viewport: Viewport = { themeColor: "#e3120b" };

const dayMap: Record<string, string> = { Monday: "Mo", Tuesday: "Tu", Wednesday: "We", Thursday: "Th", Friday: "Fr", Saturday: "Sa", Sunday: "Su" };
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  name: BIZ.name,
  image: IMG.pool,
  logo: IMG.logo,
  telephone: "+1-623-340-6818",
  email: BIZ.email,
  url: BIZ.siteUrl,
  address: { "@type": "PostalAddress", streetAddress: BIZ.street, addressLocality: BIZ.city, addressRegion: BIZ.region, postalCode: BIZ.zip, addressCountry: "US" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: BIZ.google.rating, reviewCount: BIZ.google.count },
  openingHours: HOURS.map(([d, t]) => {
    const [o, c] = t.split(" – ").map((x) => { const m = x.match(/(\d+):(\d+)(am|pm)/)!; let h = +m[1] % 12; if (m[3] === "pm") h += 12; return `${String(h).padStart(2, "0")}:${m[2]}`; });
    return `${dayMap[d]} ${o}-${c}`;
  }),
  areaServed: ["Phoenix", "Laveen", "Gilbert", "Chandler", "Scottsdale", "Paradise Valley", "Fountain Hills", "San Tan Valley", "Goodyear"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="sr-only" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
