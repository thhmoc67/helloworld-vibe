import type { Metadata } from "next";
import { OfflineErrorPage } from "@/components/marketing/error-state-interactive-pages";
import { getErrorState } from "@/src/tokens/error-states";

const config = getErrorState("offline");

export const metadata: Metadata = {
  title: `${config.title} | HelloWorld`,
  description: config.description,
};

export default function OfflinePage() {
  return <OfflineErrorPage />;
}
