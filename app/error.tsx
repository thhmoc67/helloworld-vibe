"use client";

import { ErrorPageShell } from "@/components/layout/error-page-shell";
import { ErrorState } from "@/components/marketing/error-state";
import { getErrorState } from "@/src/tokens/error-states";

const config = getErrorState("server-error");

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPageShell>
      <ErrorState
        title={config.title}
        description={config.description}
        image={config.image}
        imageWidth={config.imageWidth}
        imageHeight={config.imageHeight}
        actions={[
          { label: "Try Refreshing", variant: "secondary", onClick: reset },
          { label: "Back", href: "/", variant: "primary" },
        ]}
      />
    </ErrorPageShell>
  );
}
