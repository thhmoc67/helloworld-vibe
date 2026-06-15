"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VisitScheduler } from "@/components/booking/visit-scheduler";
import {
  visitDateSamples,
  visitTimeSlotSamples,
} from "@/src/tokens/visit-scheduler";

export function VisitSchedulerDemo() {
  const [selectedDateId, setSelectedDateId] = useState(visitDateSamples[0].id);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(
    visitTimeSlotSamples[0].id,
  );

  return (
    <div className="space-y-10">
      <VisitScheduler
        dates={visitDateSamples}
        timeSlots={visitTimeSlotSamples}
        selectedDateId={selectedDateId}
        selectedTimeSlotId={selectedTimeSlotId}
        onDateChange={setSelectedDateId}
        onTimeSlotChange={setSelectedTimeSlotId}
      />

      <div className="flex justify-center">
        <Button hierarchy="primary" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
