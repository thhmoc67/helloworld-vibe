export type TenantPolicySectionId =
  | "booking"
  | "move-in"
  | "living"
  | "guidelines"
  | "move-out"
  | "payments";

export type TenantPolicyNavItem = {
  id: TenantPolicySectionId;
  label: string;
};

export const tenantPolicyNavItems: readonly TenantPolicyNavItem[] = [
  { id: "booking", label: "Booking Policy" },
  { id: "move-in", label: "Move-In" },
  { id: "living", label: "Living at HelloWorld" },
  { id: "guidelines", label: "Common Area Guidelines" },
  { id: "move-out", label: "Move-Out" },
  { id: "payments", label: "Payments" },
] as const;

export type ShiftingComparisonRow = {
  upgrade: string;
  downgrade: string;
};

export const tenantPolicyShiftingTable = {
  title: "Shifting between homes:",
  columns: ["Upgrade / Building Transfer", "Downgrade / Private → Single"],
  rows: [
    { upgrade: "No notice period", downgrade: "30-day notice required" },
    {
      upgrade: "Pay security deposit difference",
      downgrade: "New booking needed",
    },
    {
      upgrade: "Raise request on app or email care@",
      downgrade: "Move-in/out charges may apply",
    },
  ] satisfies ShiftingComparisonRow[],
  note: "Splitting a private double into two individual bookings: ₹2,000 fee + move-in/out charges for each.",
} as const;

export const tenantPolicySections = {
  booking: {
    title: "Booking Policy",
    bullets: [
      "Pay a minimum booking token to lock in your move-in date. Room and bed allocation is managed by HelloWorld.",
      "Got referred? Make sure to mention your referrer at booking — they'll get ₹1,000 in rent credits as a thank-you.",
      "Your move-in happens only on the date you select. If you delay it, rent still counts from your originally booked date.",
      "A one-time move-in charge covers your background verification. Move-out charges vary by city and are based on actual costs.",
    ],
    footnote: "*Booking token is non-refundable if you cancel.",
  },
  "move-in": {
    title: "Move-In",
    bullets: [
      "Before you get your keys: pay the refundable security deposit + first month's rent, and complete your KYC.",
      "Sign your E-Leave and License Agreement digitally — it's quick and paperless.",
      "Fill out the move-in survey to unlock access to community events and perks.",
      "HelloWorld may temporarily assign you a different room in the same building if your original room isn't ready. You'll be moved back within 7–14 days*.",
      "For anything broken or missing: raise a ticket on the app or email care@thehelloworld.com. First-time bulb/fan/tube light replacements within 3 months of move-in are on us (no physical damage).",
    ],
    footnote: "*Subject to availability; details shared at booking or move-in.",
  },
  living: {
    title: "Living at HelloWorld",
    bullets: [
      "Rent covers internet + water up to your monthly plan limits (property/city-specific)*.",
      "Meal subscription cancellations only apply at month-end if meals are an add-on (not bundled in your plan).",
      "Pay rent by the 5th to avoid a ₹100/day late fee. Unpaid rent past the 10th = agreement cancellation.",
      "Visitors are welcome until 10 PM. Single-room residents can have overnight guests with prior notice to the property manager + guest KYC. A fee may apply.",
      "Any misconduct — yours or your guest's — may result in a fine based on severity.",
      "Damage to property during your stay = charged at MRP.",
      "HelloWorld reserves the right to limit common area access.",
      "HelloWorld is not liable for personal belongings. Lock up your valuables.",
    ],
    footnote:
      "*Internet and water limits are pre-defined in your agreement and are property/city-specific.",
  },
  guidelines: {
    title: "Common Area Guidelines",
    bullets: [
      "No smoking or alcohol in common areas.",
      "Keep it respectful — behaviour that disturbs other residents has consequences.",
      "Non-compliance penalty: minimum ₹2,000.",
      "Garbage must be segregated — fines apply for non-compliance.",
    ],
    warning:
      "Zero tolerance for illegal substances. Violations result in police intimation, immediate agreement cancellation, and forfeiture of deposit.",
  },
  "move-out": {
    title: "Move-Out",
    raisingTitle: "Raising a Move-Out Request",
    raisingBullets: [
      "Move-out requests can only be raised between the 1st and 5th of the month.",
      "Your 30-day notice period starts the day you submit the request on the app.",
      "You can vacate anytime within your notice window.",
      "Cancelling a move-out request after submission: ₹3,000 fee (this protects the next resident's booking).",
    ],
    exampleTitle: "Here's how it works",
    exampleSteps: [
      "Raise request on the 3rd of this month",
      "Rent is charged until the 3rd of next month",
      "Vacate anytime before the 3rd of next month",
      "Vacate after? Rent applies until your actual move-out date.",
    ],
    refundsTitle: "Refunds",
    refundBullets: [
      "Refunds are processed within 30 days of completing move-out formalities.",
      "A move-out charge covers exit documentation and dry cleaning. Exact amount varies by city.",
    ],
  },
  payments: {
    title: "Payment",
    infoCallout:
      "HelloWorld will never ask for payment via UPI, cash, or bank transfer to an individual. If anyone claims to be a HelloWorld employee and requests payment this way, do not pay. Report it immediately.",
    bullets: [
      "No cheque or cash payments accepted.",
      "All payments go through the HelloWorld Tenant App or invoice payment link only.",
      "Your transaction records with us are the final proof of payment.",
      "All online payments are fully secure and encrypted.",
    ],
  },
} as const;

export const tenantPolicyDisclaimer =
  "HelloWorld reserves the right to modify, suspend, or discontinue, temporarily or permanently, some or all of its policies as it may deem fit, with respect to any or all users, without any prior intimation.";
