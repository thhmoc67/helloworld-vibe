import type { Metadata } from "next";
import { ErrorStatePage } from "@/components/marketing/error-state-page";
import { getErrorState } from "@/src/tokens/error-states";

const config = getErrorState("empty-wishlist");

export const metadata: Metadata = {
  title: `${config.title} | HelloWorld`,
  description: config.description,
};

export default function WishlistPage() {
  return <ErrorStatePage config={config} />;
}
