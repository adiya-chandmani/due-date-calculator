"use client";

import { useMemo, useState } from "react";

type Method = "lmp" | "conception" | "ivf";
type TransferAge = "day3" | "day5";

const MS_PER_DAY = 86_400_000;
const PREGNANCY_LENGTH_DAYS = 280;
const CONCEPTION_TO_DUE_DAYS = 266;
const SAMPLE_DATE = "2026-04-01";

function parseDate(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function diffInDays(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY);
}

function getToday() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12));
}

export function DueDateTool() {
  const [method, setMethod] = useState<Method>("lmp");
  const [selectedDate, setSelectedDate] = useState(SAMPLE_DATE);
  const [cycleLength, setCycleLength] = useState(28);
  const [transferAge, setTransferAge] = useState<TransferAge>("day5");

  const result = useMemo(() => {
    if (!selectedDate) {
      return null;
    }

    const baseDate = parseDate(selectedDate);
    const today = getToday();

    let dueDate = addDays(baseDate, PREGNANCY_LENGTH_DAYS);
    let lmpDate = baseDate;
    let conceptionDate = addDays(baseDate, 14);
    let methodLabel = "Last period";

    if (method === "lmp") {
      const cycleOffset = cycleLength - 28;
      dueDate = addDays(baseDate, PREGNANCY_LENGTH_DAYS + cycleOffset);
      lmpDate = baseDate;
      conceptionDate = addDays(baseDate, 14 + cycleOffset);
      methodLabel = "Last period";
    }

    if (method === "conception") {
      dueDate = addDays(baseDate, CONCEPTION_TO_DUE_DAYS);
      conceptionDate = baseDate;
      lmpDate = addDays(baseDate, -14);
      methodLabel = "Conception date";
    }

    if (method === "ivf") {
      const embryoOffset = transferAge === "day5" ? 261 : 263;
      dueDate = addDays(baseDate, embryoOffset);
      conceptionDate = addDays(baseDate, -(transferAge === "day5" ? 5 : 3));
      lmpDate = addDays(conceptionDate, -14);
      methodLabel = `IVF transfer (${transferAge === "day5" ? "Day 5" : "Day 3"} embryo)`;
    }

    const daysPregnant = Math.max(0, diffInDays(lmpDate, today));
    const weeks = Math.floor(daysPregnant / 7);
    const days = daysPregnant % 7;

    return {
      methodLabel,
      dueDate,
      conceptionDate,
      lmpDate,
      weeks,
      days,
      secondTrimesterStart: addDays(lmpDate, 14 * 7),
      thirdTrimesterStart: addDays(lmpDate, 28 * 7),
      viabilityWeek: addDays(lmpDate, 24 * 7),
      fullTerm: addDays(lmpDate, 39 * 7),
    };
  }, [cycleLength, method, selectedDate, transferAge]);

  return (
    <section className="tool-layout" aria-labelledby="tool-heading">
      <div className="panel">
        <h2 id="tool-heading" className="section-title">
          Online due date calculator
        </h2>
        <p className="tool-description">
          This calculator gives planning estimates only. For medical guidance, confirm dates with your clinician.
        </p>

        <fieldset className="method-group">
          <legend className="note">Choose calculation method</legend>
          <div className="segmented-control" role="radiogroup" aria-label="Due date calculation method">
            {[
              ["lmp", "Last period"],
              ["conception", "Conception"],
              ["ivf", "IVF transfer"],
            ].map(([value, label]) => {
              const active = method === value;

              return (
                <button
                  key={value}
                  type="button"
                  className={`segment ${active ? "active" : ""}`}
                  onClick={() => setMethod(value as Method)}
                  aria-pressed={active}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="form-grid">
          <label className="field">
            <span>{method === "lmp" ? "First day of last period" : method === "conception" ? "Conception date" : "IVF transfer date"}</span>
            <input
              className="input"
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </label>

          {method === "lmp" ? (
            <label className="field">
              <span>Average cycle length (days)</span>
              <input
                className="input"
                type="number"
                min={21}
                max={45}
                value={cycleLength}
                onChange={(event) => setCycleLength(Number(event.target.value) || 28)}
              />
            </label>
          ) : null}

          {method === "ivf" ? (
            <label className="field">
              <span>Embryo age at transfer</span>
              <select
                className="input"
                value={transferAge}
                onChange={(event) => setTransferAge(event.target.value as TransferAge)}
              >
                <option value="day5">Day 5 embryo</option>
                <option value="day3">Day 3 embryo</option>
              </select>
            </label>
          ) : null}
        </div>

        <div className="tool-toolbar">
          <div className="button-row">
            <button className="button primary" onClick={() => {
              setMethod("lmp");
              setSelectedDate(SAMPLE_DATE);
              setCycleLength(28);
              setTransferAge("day5");
            }} type="button">
              Load sample
            </button>
            <button className="button secondary" onClick={() => setSelectedDate("")} type="button">
              Clear date
            </button>
          </div>
          <p className="note">Tip: switch methods if you know conception or IVF timing more precisely.</p>
        </div>

        {result ? (
          <>
            <div className="result-hero" aria-live="polite">
              <p className="note">Based on {result.methodLabel.toLowerCase()}</p>
              <h3>Your estimated due date is {formatDate(result.dueDate)}.</h3>
              <p>
                Estimated pregnancy age today: <strong>{result.weeks} weeks {result.days} days</strong>
              </p>
            </div>

            <div className="stat-grid milestone-grid" aria-live="polite">
              {[
                ["Estimated due date", formatDate(result.dueDate)],
                ["Estimated conception", formatDate(result.conceptionDate)],
                ["Trimester 2 starts", formatDate(result.secondTrimesterStart)],
                ["Trimester 3 starts", formatDate(result.thirdTrimesterStart)],
                ["24 weeks", formatDate(result.viabilityWeek)],
                ["Full term (39 weeks)", formatDate(result.fullTerm)],
              ].map(([label, value]) => (
                <article className="stat-card" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="empty-state note">Enter a date to see your estimate.</p>
        )}
      </div>
    </section>
  );
}
