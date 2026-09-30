import type { Metadata } from "next";
import { FullFormSection, PageHero } from "@/components/Sections";
import { BIZ, IMG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Free Estimate",
  description: `Request a free written painting estimate or call ${BIZ.phone}. Mr Painting Houses LLC, ${BIZ.street}, ${BIZ.city}, AZ.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero title="Get your free estimate" text="Tell us about the project. We'll call to book a walkthrough and put scope, products and price in writing." img={IMG.yardSign} crumbs={[["Home", "/"], ["Contact"]]} cta={false} />
      <FullFormSection id="form" />
    </>
  );
}
