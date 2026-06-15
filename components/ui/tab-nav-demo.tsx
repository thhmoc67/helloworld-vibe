"use client";

import { useState } from "react";
import {
  PropertyDetailTab,
  TabNav,
  propertyDetailTabs,
} from "@/components/ui/tab-nav";

export function TabNavDemo() {
  const [value, setValue] = useState<PropertyDetailTab>("about");

  return (
    <div className="max-w-[280px] sm:max-w-xs">
      <TabNav
        items={propertyDetailTabs}
        value={value}
        onChange={setValue}
      />
      <p className="mt-4 text-sm text-gray-500">
        Active section:{" "}
        <span className="font-medium text-gray-700">{value}</span>
      </p>
    </div>
  );
}
