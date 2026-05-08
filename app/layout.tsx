import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Due Date Calculator | Estimate Pregnancy Due Date & Milestones",
    template: "%s | Due Date Calculator",
  },
  description:
    "Free due date calculator that estimates your pregnancy due date, gestational age, and trimester milestones from your last period, conception date, or IVF transfer date.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Due Date Calculator",
    description:
      "Estimate a pregnancy due date, weeks pregnant, and key milestone dates with a fast, simple online calculator.",
    url: siteUrl,
    siteName: "Due Date Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Due Date Calculator",
    description:
      "A free due date calculator for estimating pregnancy timing and milestone dates.",
  },
};

const navLinks = [
  ["About", "/about"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Contact", "/contact"],
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="container header-inner">
              <Link href="/" className="brand">
                Due Date Calculator
              </Link>
              <nav aria-label="Primary">
                <ul className="nav-list">
                  {navLinks.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main className="container main-content">{children}</main>
          <footer className="site-footer">
            <div className="container footer-inner">
              <p>© {new Date().getFullYear()} Due Date Calculator. Built for quick pregnancy date estimates.</p>
              <ul className="footer-links">
                {navLinks.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
