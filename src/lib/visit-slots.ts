import type { TimeSlotData } from "@/src/models/visit";
import type { VisitDate, VisitTimeSlot } from "@/src/tokens/visit-scheduler";

export interface MappedTimeSlot extends VisitTimeSlot {
  timeValue: string;
}

export interface MappedVisitSlots {
  dates: VisitDate[];
  rawDateBySlotId: Record<string, string>;
  timeSlotsByDateId: Record<string, MappedTimeSlot[]>;
}

function formatDayLabel(date: Date): string {
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatTimeLabel(time: string): string {
  const [hourPart, minutePart] = time.split(":");
  const hour = Number.parseInt(hourPart, 10);
  const minute = minutePart ?? "00";

  if (hour === 12) return `12:${minute} pm`;
  if (hour > 12) return `${hour - 12}:${minute} pm`;
  return `${hour}:${minute} am`;
}

function isSlotAvailableToday(time: string, slotDate: Date): boolean {
  const today = new Date();
  if (slotDate.toDateString() !== today.toDateString()) {
    return true;
  }
  const hour = Number.parseInt(time.split(":")[0], 10);
  return hour > today.getHours();
}

export function mapVisitSlots(data: TimeSlotData[]): MappedVisitSlots {
  const dates: VisitDate[] = [];
  const rawDateBySlotId: Record<string, string> = {};
  const timeSlotsByDateId: Record<string, MappedTimeSlot[]> = {};

  for (const entry of data) {
    const slotDate = new Date(entry.date);
    const availableSlots = entry.slots
      .filter(
        (slot) =>
          slot.value && isSlotAvailableToday(slot.label, slotDate),
      )
      .map((slot, index) => ({
        id: `${entry.slotId}-${index}`,
        label: formatTimeLabel(slot.label),
        timeValue: slot.label,
      }));

    if (availableSlots.length === 0) {
      continue;
    }

    rawDateBySlotId[entry.slotId] = entry.date;

    dates.push({
      id: entry.slotId,
      label: formatDayLabel(slotDate),
      day: slotDate.getDate(),
    });

    timeSlotsByDateId[entry.slotId] = availableSlots;
  }

  return { dates, rawDateBySlotId, timeSlotsByDateId };
}

export function formatVisitDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatScheduledVisitLabel(
  rawDate: string,
  timeLabel: string,
): string {
  const date = new Date(rawDate);
  const weekday = date.toLocaleDateString("en-IN", { weekday: "short" });
  const month = date.toLocaleDateString("en-IN", { month: "short" });
  return `${weekday}, ${date.getDate()} ${month} at ${timeLabel}`;
}
