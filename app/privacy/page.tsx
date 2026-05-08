import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy details for the Due Date Calculator website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="panel page-copy">
      <h1 className="section-title">Privacy Policy</h1>
      <p>
        Due Date Calculator is designed to be privacy-friendly. The dates you enter are processed in your browser and are not intentionally stored or transmitted by the calculator itself.
      </p>
      <p>
        Your hosting provider may still collect standard server logs for security and performance. If analytics, forms, or ads are added later, this policy should be updated to reflect that.
      </p>
      <p>
        If you contact the site owner directly, any information you share may be used to respond to your message.
      </p>
    </section>
  );
}
