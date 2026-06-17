export interface VisitDate {
  id: string;
  label: string;
  day: number;
}

export interface VisitTimeSlot {
  id: string;
  label: string;
}

export const visitSchedulerTitle = "Pick your visit date & time";

/** py-3 + text-sm line-height on time slot pills */
export const visitTimeSlotRowHeight = "2.75rem";
/** gap-3 between wrapped time slot rows */
export const visitTimeSlotRowGap = "0.75rem";
/** Scroll area: 2 full rows + half of a 3rd row (plus top py-2 padding) */
export const visitTimeSlotListMaxHeight = `calc(0.5rem + 2.5 * ${visitTimeSlotRowHeight} + 2 * ${visitTimeSlotRowGap})`;

export const visitDateSamples: readonly VisitDate[] = [
  { id: "today", label: "Today", day: 20 },
  { id: "thu-21", label: "Thu", day: 21 },
  { id: "fri-22", label: "Fri", day: 22 },
  { id: "sat-23", label: "Sat", day: 23 },
  { id: "sun-24", label: "Sun", day: 24 },
  { id: "mon-25", label: "Mon", day: 25 },
  { id: "wed-27", label: "Wed", day: 27 },
] as const;

export const visitTimeSlotSamples: readonly VisitTimeSlot[] = [
  { id: "morning", label: "10:00 am - 01:00 pm" },
  { id: "afternoon", label: "01:00 pm - 04:00 pm" },
  { id: "evening", label: "04:00 pm - 07:00 pm" },
  { id: "evening-late", label: "04:00 pm - 07:00 pm" },
] as const;
