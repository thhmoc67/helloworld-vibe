import type { FaqAccordionItem } from "@/components/ui/faq-accordion";

export function getTenantPolicyFaqs(baseUrl: string): FaqAccordionItem[] {
  const base = baseUrl.replace(/\/$/, "");

  return [
    {
      id: "tenant-policy-overview",
      question: "What are HelloWorld tenant policies?",
      answer: `HelloWorld tenant policy covers booking, move-in, living rules, common area guidelines, payment, and move-out. It includes stay terms, conduct, and facility use. Full text at ${base}/tenant-policy. See also ${base}/contact for support.`,
    },
    {
      id: "tenant-policy-where",
      question: "Where can I read HelloWorld tenant rules?",
      answer: `You can read tenant rules and guidelines at ${base}/tenant-policy. For a specific property, also check the listing and booking terms on the site.`,
    },
    {
      id: "tenant-policy-booking",
      question: "What is the HelloWorld booking policy?",
      answer: `You pay a minimum token and select a move-in date to confirm. Room and bed allotment is at HelloWorld's discretion. Move-in is only at the date requested at booking; if postponed, rent still starts from that date. A nominal move-in charge may apply for background check. Full booking policy at ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-token-refundable",
      question: "Is the booking token refundable if I cancel?",
      answer: `The token paid at booking is non-refundable on cancellation. Security deposit refund depends on minimum stay and move-out formalities. Read the full terms at ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-move-in",
      question: "What do I need before move-in at HelloWorld?",
      answer: `You need to pay the refundable security deposit and rent for the current month, and submit KYC documents. You must sign the E-Leave and License Agreement before moving in. Complete the move-in survey to enjoy community events. Details at ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-room-change",
      question: "Can HelloWorld change my room after move-in?",
      answer: `HelloWorld can provide another room in the same building if there is an issue with your pre-booked room. You will be transferred back to your first allotted room within 7–14 days. Raise any complaints via the tenant app or care@thehelloworld.com. See ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-payment",
      question: "How do I pay rent at HelloWorld?",
      answer: `HelloWorld does not accept cash or cheque. Pay only through the HelloWorld Tenant App or the payment link in your invoice. Pay on or before the 5th of every month to avoid late fees. Never pay any individual claiming to be HelloWorld staff. Full payment policy at ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-late-fee",
      question: "What is the late fee for rent at HelloWorld?",
      answer: `Pay rent on or before the 5th of every month. Failing that, a fine of Rs 100 per day applies. If rent is still unpaid by the 11th of the month, your agreement stands cancelled. See ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-visitors",
      question: "What is the visitor policy at HelloWorld?",
      answer: `Visitors can stay on the premises until 10:00 p.m. Single-room occupants can have guests staying overnight if they inform the property manager in advance and submit KYC; a charge may apply. Any misconduct by you or your guest can result in a fine. See ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-move-out",
      question: "How do I raise a move-out request at HelloWorld?",
      answer: `You can raise a move-out request only from the 1st to the 5th of the month via the Tenant App. A 30-day notice period starts from the day you raise the notice. You can vacate any time until the end of that period. Cancelling a move-out after raising it incurs a fee of ₹3,000. Full move-out policy at ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-refund",
      question: "When do I get my security deposit refund from HelloWorld?",
      answer: `Refunds are processed within 30 days of completing move-out formalities at the property. A charge may be deducted for exit documentation and dry cleaning. Move-out charges vary by city. See ${base}/tenant-policy.`,
    },
    {
      id: "tenant-policy-contact",
      question: "Who do I contact for tenant policy questions?",
      answer: `For complaints or queries about your home or building, raise a ticket through the tenant app or email care@thehelloworld.com. For general support, use ${base}/contact or call 888 000 88 88. Full policy at ${base}/tenant-policy.`,
    },
  ];
}
