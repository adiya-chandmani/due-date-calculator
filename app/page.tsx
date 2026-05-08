import type { Metadata } from "next";
import { DueDateTool } from "@/components/due-date-tool";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const features = [
  "Estimate due date from last period, conception date, or IVF transfer",
  "See weeks pregnant today plus trimester and milestone dates",
  "Fast browser-based tool with a simple medical-style disclaimer",
];

export default function Home() {
  return (
    <div className="hero">
      <section className="hero-card">
        <p className="note">Free online pregnancy timing tool</p>
        <h1>Estimate your due date and pregnancy timeline instantly.</h1>
        <p>
          Use this free due date calculator to estimate your baby&apos;s due date,
          how far along you are today, and key trimester milestones based on the date information you have.
        </p>
        <div className="badge-row" aria-label="Key benefits">
          {features.map((feature) => (
            <div className="badge" key={feature}>
              {feature}
            </div>
          ))}
        </div>
      </section>

      <DueDateTool />

      <section className="panel">
        <h2 className="section-title">Who this due date calculator helps</h2>
        <div className="feature-grid">
          <article className="copy-card">
            <h3>Expecting parents</h3>
            <p>Get a quick estimate for due date planning, appointments, and milestone tracking.</p>
          </article>
          <article className="copy-card">
            <h3>Fertility and IVF patients</h3>
            <p>Check pregnancy timing using conception dates or IVF transfer timing when LMP is less useful.</p>
          </article>
          <article className="copy-card">
            <h3>Health content publishers</h3>
            <p>Offer a lightweight, high-intent tool around one of the most searched pregnancy topics online.</p>
          </article>
        </div>
      </section>

      <section className="panel page-copy">
        <h2 className="section-title">How to use the tool</h2>
        <p>
          Pick the method that matches the date you know best, enter the date, then review the estimated due date and milestone cards.
          The calculator works in your browser and is meant for educational planning only, not medical diagnosis.
        </p>
      </section>
    </div>
  );
}
