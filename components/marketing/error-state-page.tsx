import { ErrorPageShell } from "@/components/layout/error-page-shell";
import { ErrorState } from "@/components/marketing/error-state";
import type { ErrorStateConfig } from "@/src/tokens/error-states";

export function ErrorStatePage({
  config,
}: {
  config: ErrorStateConfig;
}) {
  return (
    <ErrorPageShell>
      <ErrorState
        title={config.title}
        description={config.description}
        image={config.image}
        imageWidth={config.imageWidth}
        imageHeight={config.imageHeight}
        actions={config.actions}
      />
    </ErrorPageShell>
  );
}
