import privacyPolicyContent from "@/src/constants/privacy-policy-content";

export type PrivacyPolicySectionId =
  | "applicability"
  | "website-and-app"
  | "consent"
  | "usage"
  | "sharing"
  | "additional"
  | "data"
  | "confidentiality"
  | "cookies"
  | "communication"
  | "sponsored"
  | "changes";

export type PrivacyPolicyNavItem = {
  id: PrivacyPolicySectionId;
  label: string;
};

export const privacyPolicyNavItems: readonly PrivacyPolicyNavItem[] = [
  { id: "applicability", label: "Use and Applicability" },
  { id: "website-and-app", label: "The Website and Mobile App" },
  { id: "consent", label: "Express Consent" },
  { id: "usage", label: "Third Party Usage of Data" },
  { id: "sharing", label: "Disclosure / Sharing" },
  { id: "additional", label: "Additional Policy Information" },
  { id: "data", label: "Secure Data" },
  {
    id: "confidentiality",
    label: "Confidentiality of your login id and password",
  },
  { id: "cookies", label: "Use of Cookies" },
  { id: "communication", label: "Contact & Communication" },
  { id: "sponsored", label: "Adverts and Sponsored Links" },
  { id: "changes", label: "Change in Privacy Policy" },
] as const;

export type PrivacyPolicySection = {
  id: PrivacyPolicySectionId;
  number: number;
  title: string;
  paragraphs: readonly string[];
};

export const privacyPolicySections: readonly PrivacyPolicySection[] = [
  {
    id: "applicability",
    number: 1,
    title: "Use and Applicability",
    paragraphs: privacyPolicyContent.applicability,
  },
  {
    id: "website-and-app",
    number: 2,
    title: "The Website and Mobile App",
    paragraphs: privacyPolicyContent.websiteAndApp,
  },
  {
    id: "consent",
    number: 3,
    title: "Express Consent",
    paragraphs: privacyPolicyContent.consent,
  },
  {
    id: "usage",
    number: 4,
    title: "Third Party Usage of Data",
    paragraphs: privacyPolicyContent.usage,
  },
  {
    id: "sharing",
    number: 5,
    title: "Disclosure / Sharing",
    paragraphs: privacyPolicyContent.sharing,
  },
  {
    id: "additional",
    number: 6,
    title: "Additional Policy Information",
    paragraphs: privacyPolicyContent.additional,
  },
  {
    id: "data",
    number: 7,
    title: "Secure Data",
    paragraphs: privacyPolicyContent.data,
  },
  {
    id: "confidentiality",
    number: 8,
    title: "Confidentiality of your login id and password",
    paragraphs: privacyPolicyContent.confidentiality,
  },
  {
    id: "cookies",
    number: 9,
    title: "Use of Cookies",
    paragraphs: privacyPolicyContent.cookies,
  },
  {
    id: "communication",
    number: 10,
    title: "Contact & Communication",
    paragraphs: privacyPolicyContent.communication,
  },
  {
    id: "sponsored",
    number: 11,
    title: "Adverts and Sponsored Links",
    paragraphs: privacyPolicyContent.sponsored,
  },
  {
    id: "changes",
    number: 12,
    title: "Change in Privacy Policy",
    paragraphs: privacyPolicyContent.changes,
  },
] as const;
