export interface PostCreateVisitPayload {
  date: string;
  savType: string;
  time: string;
  name: string;
  email: string;
  slotId: string;
  propertyId: number;
  source: string;
  url: string;
}

export interface VisitSlotEntry {
  label: string;
  value: boolean;
}

export interface TimeSlotData {
  slotId: string;
  date: string;
  slots: VisitSlotEntry[];
}

export interface VisitFormError {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  date?: boolean;
  time?: boolean;
}

export type VisitType = "physical" | "video";
