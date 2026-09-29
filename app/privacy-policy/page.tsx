import type { Metadata } from "next";
import { PageHero } from "@/components/Sections";
import { BIZ } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

// Starter policy — have the client review before launch.
export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy policy" crumbs={[["Home", "/"], ["Privacy policy"]]} cta={false} />
      <section className="section">
        <div className="wrap prose">
          <p>This policy explains how {BIZ.name} (&quot;we&quot;) handles information you share through this website.</p>
          <h2>What we collect</h2>
          <p>When you request an estimate we collect the details you enter: name, phone number, email, address or ZIP code, the services you&apos;re interested in and any message you write. Our hosting and analytics tools may also record basic technical data such as pages visited and browser type.</p>
          <h2>How we use it</h2>
          <p>We use your information only to respond to your request, schedule estimates and provide our services. We may contact you by phone, text or email about your project.</p>
          <h2>Sharing</h2>
          <p>We do not sell your personal information. We share it only with service providers that help us run our business (for example, our customer management system), and only as needed to serve you.</p>
          <h2>Your choices</h2>
          <p>To update or delete your information, or to stop receiving messages, contact us at {BIZ.phone} or {BIZ.email}.</p>
          <h2>Contact</h2>
          <p>{BIZ.name}, {BIZ.street}, {BIZ.city}, {BIZ.region} {BIZ.zip}.</p>
        </div>
      </section>
    </>
  );
}
