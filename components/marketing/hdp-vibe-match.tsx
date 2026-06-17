"use client";

import { useState } from "react";
import {
  hdpResidentInterests,
  hdpSelectedVibes,
  hdpVibeOverallScore,
} from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

function VibeScoreRing({ score }: { score: number }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative size-14 shrink-0">
      <svg viewBox="0 0 56 56" className="size-full -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="url(#vibe-ring)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="vibe-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#378ADD" />
            <stop offset="50%" stopColor="#7F77DD" />
            <stop offset="100%" stopColor="#D4537E" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-gradient-score-vibe absolute inset-0 flex items-center justify-center text-sm font-bold">
        {score}%
      </span>
    </div>
  );
}

export function HdpVibeMatch({
  displayName,
  className,
}: {
  displayName?: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const propertyLabel = displayName ?? "this property";

  return (
    <section
      className={cn(
        "rounded-2xl border border-[#ece6f5] bg-gradient-property-vibe-match p-4 md:p-5",
        className,
      )}
      aria-label="Vibe match"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-[#1a1a2e]">
          How well this home matches your vibe
        </h2>
        <VibeScoreRing score={hdpVibeOverallScore} />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Based on the {hdpSelectedVibes.length} vibes you selected
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {hdpSelectedVibes.map((vibe) => (
          <div
            key={vibe.label}
            className="flex w-[5.75rem] flex-col items-center rounded-2xl border border-[#ede8f5] bg-white px-2 py-3"
          >
            <span className="text-lg" aria-hidden>
              {vibe.emoji}
            </span>
            <span className="mt-1 text-xs font-medium text-gray-800">
              {vibe.label}
            </span>
            <span className="text-gradient-score-vibe text-sm font-bold">
              {vibe.score}%
            </span>
            <span className="text-xs text-gray-400">Match</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex max-w-xs items-center gap-2 rounded-lg border border-gray-300/30 bg-blue-light-50 px-2 py-2 text-sm font-medium text-gray-800">
          <span>👩🏼‍💻 Residents work at</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-800">
            +31
          </span>
        </div>
        <div className="flex max-w-xs items-center gap-2 rounded-lg border border-gray-300/30 bg-blue-light-50 px-2 py-2 text-sm font-medium text-gray-800">
          <span>🎓 From colleges like</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-800">
            +31
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-gray-800">
          See what residents at {propertyLabel} are usually into
        </p>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="shrink-0 text-xs text-blue-light-600 hover:underline"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {expanded ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {hdpResidentInterests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-gray-300/30 bg-white px-3 py-2 text-sm font-medium text-gray-800"
            >
              {interest}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
