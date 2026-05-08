# Due Date Calculator

A fast, SEO-friendly pregnancy microtool built with Next.js App Router and TypeScript. It estimates a pregnancy due date, gestational age, and major milestone dates from last menstrual period, conception date, or IVF transfer date.

## Why this site

"due date calculator" is a durable, high-intent search term in health and family planning. This project targets that demand with a lightweight, accessible utility page.

## Features

- Estimate due date from LMP, conception date, or IVF transfer date
- Adjust LMP calculations with cycle length and IVF transfer timing
- View weeks pregnant today, trimester boundaries, viability week, and full-term date
- Static-first Next.js architecture with built-in SEO pages and metadata
- Accessible navigation and focus states
- `robots.txt` and `sitemap.xml` powered by `NEXT_PUBLIC_SITE_URL`

## Pages

- `/`
- `/about`
- `/privacy`
- `/terms`
- `/contact`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

## Environment

Create a `.env.local` file if needed:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## AdSense placeholder

AdSense is intentionally not installed yet because the production domain is not ready. Once the site is live on its final domain and meets policy requirements, add an ad placement plan, consent flow, and verification checklist here.
