import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Due Date Calculator website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="panel page-copy">
      <h1 className="section-title">Terms of Use</h1>
      <p>
        Due Date Calculator is provided on an as-is basis for general informational use. It offers estimates only and is not a substitute for medical advice, diagnosis, or treatment.
      </p>
      <p>
        You may use the site for personal or commercial reference, but you may not misuse, disrupt, or attempt to compromise the site or its hosting infrastructure.
      </p>
      <p>
        These terms may change over time as the project evolves.
      </p>
    </section>
  );
}
