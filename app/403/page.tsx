import type { Metadata } from "next";
import { ErrorStatePage } from "@/components/marketing/error-state-page";
import { getErrorState } from "@/src/tokens/error-states";

const config = getErrorState("forbidden");

export const metadata: Metadata = {
  title: `${config.title} | HelloWorld`,
  description: config.description,
};

export default function ForbiddenPage() {
  return <ErrorStatePage config={config} />;
}
