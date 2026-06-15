"use client";

import { ProgressRing } from "@/components/ui/progress-ring";

export function ProgressRingDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10 sm:gap-16">
      <div className="rounded-3xl bg-gradient-lavender/40 p-6 sm:p-8">
        <ProgressRing value={80} variant="vibe" />
      </div>
      <div className="rounded-3xl bg-gradient-contact-card p-6 sm:p-8">
        <ProgressRing
          value={95}
          variant="recommend"
          label="Residents would recommend to a friend"
        />
      </div>
    </div>
  );
}
