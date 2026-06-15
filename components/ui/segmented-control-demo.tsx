"use client";

import { useState } from "react";
import {
  LocalityView,
  SegmentedControl,
  localityViewOptions,
} from "@/components/ui/segmented-control";

export function SegmentedControlDemo() {
  const [value, setValue] = useState<LocalityView>("locality-details");

  return (
    <div className="max-w-2xl space-y-4">
      <SegmentedControl
        className="w-full"
        options={localityViewOptions}
        value={value}
        onChange={setValue}
        aria-label="Locality page view"
      />
      <p className="text-sm text-gray-500">
        Active view:{" "}
        <span className="font-medium text-gray-700">{value}</span>
      </p>
    </div>
  );
}
