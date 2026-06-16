import type { Metadata } from "next";
import { LocalityPageContent } from "@/components/marketing/locality-page";
import { localityPage } from "@/src/tokens/locality";

export const metadata: Metadata = {
  title: `${localityPage.title} | HelloWorld`,
  description: localityPage.aboutText,
};

export default function LocalityPage() {
  return <LocalityPageContent />;
}
