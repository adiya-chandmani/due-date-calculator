import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what the Due Date Calculator does and who it helps.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="panel page-copy">
      <h1 className="section-title">About Due Date Calculator</h1>
      <p>
        Due Date Calculator is a lightweight pregnancy timeline tool for estimating a due date,
        gestational age, and milestone dates from common reference points like last menstrual period,
        conception date, or IVF transfer date.
      </p>
      <p>
        The goal is speed and clarity: one page, accessible inputs, and practical results that help
        people understand rough timing before or between appointments.
      </p>
      <p>
        This site is static-first, fast to load, and designed to be easy to deploy on a simple hosting stack.
      </p>
    </section>
  );
}
