import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach the Due Date Calculator site owner.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="panel page-copy">
      <h1 className="section-title">Contact</h1>
      <p>
        For feedback, bug reports, or feature ideas, open an issue in the GitHub repository for this project after it is published.
      </p>
      <p>
        If you deploy this site on your own domain, replace this page with your preferred contact channel such as a form or email address.
      </p>
    </section>
  );
}
