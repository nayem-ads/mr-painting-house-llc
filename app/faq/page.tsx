import type { Metadata } from "next";
import { CtaBand, Faq, PageHero } from "@/components/Sections";
import { FAQS, IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Free estimates, licensing, paint products, prep and service areas — answers from Mr Painting Houses LLC.",
  alternates: { canonical: "/faq" },
};

const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

export default function FaqPage() {
  return (
    <>
      <PageHero title="Questions & answers" text="The things homeowners ask us most before a paint job." img={IMG.exteriorMasking} crumbs={[["Home", "/"], ["FAQ"]]} />
      <Faq />
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
