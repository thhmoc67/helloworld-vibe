"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarDemo() {
  return (
    <div className="max-w-md space-y-4 rounded-3xl bg-gradient-contact-card p-6 sm:max-w-lg sm:p-8">
      <ProgressBar value={95} aria-label="Resident recommendation score" />
      <p className="text-sm text-gray-600">
        95% residents would recommend to a friend
      </p>
    </div>
  );
}
