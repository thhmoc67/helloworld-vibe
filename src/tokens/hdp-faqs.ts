export type HdpFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const hdpFaqs: readonly HdpFaqItem[] = [
  {
    id: "book-room",
    question: "How can I book a room at this property?",
    answer:
      'On this property page, click "Book now" to begin the booking flow, pay the token amount, and reserve your room category. If you want to evaluate the property first, use "Schedule a Visit" and choose either a physical visit or a video walkthrough before payment.',
  },
  {
    id: "schedule-visit",
    question: "How do I schedule a physical or video visit?",
    answer:
      'Click "Schedule a Visit" on this listing, select your preferred mode (physical or video), choose an available date and time slot, and confirm your details. Visits are free and help you validate room condition, amenities, and commute before booking.',
  },
  {
    id: "minimum-stay",
    question: "What is the minimum stay requirement for this property?",
    answer:
      "Minimum stay duration is property-specific and is shown in the Minimum Stay section of this page. Your deposit refund eligibility and early move-out implications may depend on this lock-in requirement and notice rules.",
  },
  {
    id: "security-deposit",
    question: "How much security deposit do I need to pay?",
    answer:
      "Security deposit is typically around one month's rent, but always follow the exact amount shown on this property page. The deposit is generally refundable, subject to minimum-stay compliance, notice policy, and room condition.",
  },
  {
    id: "move-in",
    question: "How soon can I move in after booking?",
    answer:
      "Move-in is confirmed after you complete booking formalities, including token, deposit, first rent payment, and KYC verification. The actual move-in date depends on room availability and agreement confirmation for your selected category.",
  },
  {
    id: "meals-wifi",
    question: "Are meals and WiFi included in the rent?",
    answer:
      "Inclusion varies by property and room plan. Check the Amenities Included and rent details on this listing to confirm what is covered for your selected room type, and ask during your visit if you need clarity on meal timing or internet usage.",
  },
];
