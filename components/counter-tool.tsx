"use client";

import { useMemo, useState } from "react";

const sampleText = `Character counters help writers, students, and marketers stay inside strict limits.

This sample paragraph shows how live counts update for words, spaces, and reading time.`;

function countSentences(text: string) {
  const matches = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return matches?.filter((sentence) => sentence.trim().length > 0).length ?? 0;
}

function countParagraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
}

export function CounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const spaces = (text.match(/\s/g) || []).length;
    const sentences = trimmed ? countSentences(trimmed) : 0;
    const paragraphs = trimmed ? countParagraphs(trimmed) : 0;
    const readingTimeMinutes = words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0;

    return [
      ["Characters", characters],
      ["Characters (no spaces)", charactersNoSpaces],
      ["Words", words],
      ["Spaces", spaces],
      ["Sentences", sentences],
      ["Paragraphs", paragraphs],
      ["Reading time (min)", readingTimeMinutes],
    ] as const;
  }, [text]);

  return (
    <section className="tool-layout" aria-labelledby="tool-heading">
      <div className="panel">
        <h2 id="tool-heading" className="section-title">
          Online character counter
        </h2>
        <p className="tool-description">
          Everything runs locally in your browser. No text is sent anywhere.
        </p>
        <label htmlFor="text-input" className="note">
          Enter or paste text
        </label>
        <textarea
          id="text-input"
          className="textarea"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="tool-toolbar">
          <div className="button-row">
            <button className="button primary" onClick={() => setText(sampleText)} type="button">
              Load sample
            </button>
            <button className="button secondary" onClick={() => setText("")} type="button">
              Clear text
            </button>
          </div>
          <p className="note">Tip: great for bios, meta titles, essays, and captions.</p>
        </div>
        <div className="stat-grid" aria-live="polite">
          {stats.map(([label, value]) => (
            <article className="stat-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
