import type { FaqAccordionItem } from "@/components/ui/faq-accordion";

export function getPrivacyPolicyFaqs(baseUrl: string): FaqAccordionItem[] {
  const base = baseUrl.replace(/\/$/, "");

  return [
    {
      id: "privacy-policy-overview",
      question: "What is HelloWorld's privacy policy?",
      answer: `HelloWorld's privacy policy explains how we collect, use, and protect your data when you use our website and services. It covers personal information, consent, data sharing, and your rights. Read the full policy at ${base}/policy. For resident terms see ${base}/tenant-policy.`,
    },
    {
      id: "privacy-policy-collect",
      question: "What information does HelloWorld collect?",
      answer: `HelloWorld collects information you provide (name, contact, email, KYC documents, bank details, employment details) and information we get when you use our site or app (e.g. IP address, device, location if you enable it). We use this to provide coliving and student housing services. Full details at ${base}/policy.`,
    },
    {
      id: "privacy-policy-use",
      question: "How does HelloWorld use my personal information?",
      answer: `We use your information to provide coliving and student housing services, process bookings, communicate with you, improve our services, prevent fraud, and comply with laws. We may share it with affiliates and service providers as described in our privacy policy at ${base}/policy.`,
    },
    {
      id: "privacy-policy-cookies",
      question: "Does HelloWorld use cookies?",
      answer: `Yes. HelloWorld may use cookies and similar tools to improve site responsiveness, assign a user ID, and understand how you use our website. You can control cookies through your browser. We do not read data off your device. Details are in our privacy policy at ${base}/policy.`,
    },
    {
      id: "privacy-policy-share",
      question: "Who does HelloWorld share my data with?",
      answer: `HelloWorld may share your information with affiliates, business partners, service providers (e.g. payment, hosting, verification), and government or legal authorities when required. We may also report payment behaviour to credit bureaus. We require partners to protect your data. Full disclosure terms at ${base}/policy.`,
    },
    {
      id: "privacy-policy-protect",
      question: "How does HelloWorld protect my data?",
      answer: `We use security procedures including encryption and physical security to guard against unauthorized access. Data is processed and stored in the cloud. We follow industry standards for collection, use, and retention. You are responsible for keeping your login credentials secure. Report any breach to legal@thehelloworld.com. See ${base}/policy.`,
    },
    {
      id: "privacy-policy-access",
      question: "Can I access or correct my personal data?",
      answer: `You can update your account details through the HelloWorld website or app. For access, correction, or deletion requests, contact us at legal@thehelloworld.com or via ${base}/contact. We will respond in line with applicable law.`,
    },
    {
      id: "privacy-policy-contact",
      question: "How do I contact HelloWorld about privacy?",
      answer: `For privacy or data-related questions, email legal@thehelloworld.com. For general support, use ${base}/contact or call 888 000 88 88. If you believe your login details have been compromised, contact us immediately.`,
    },
    {
      id: "privacy-policy-changes",
      question: "Can HelloWorld change the privacy policy?",
      answer: `Yes. HelloWorld may update the privacy policy at any time. We recommend checking ${base}/policy periodically. Continued use of the website or app after changes means you accept the updated policy. For material changes we may notify you on the website before they take effect.`,
    },
  ];
}
