import type { Metadata } from "next";
import { LandmarkPageContent } from "@/components/marketing/landmark-page";
import { landmarkPage } from "@/src/tokens/landmark";

export const metadata: Metadata = {
  title: `${landmarkPage.titleDesktop} | HelloWorld`,
  description: landmarkPage.aboutText,
};

export default function LandmarkPage() {
  return <LandmarkPageContent />;
}
