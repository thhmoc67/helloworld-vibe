"use client";

import { ErrorPageShell } from "@/components/layout/error-page-shell";
import { ErrorState } from "@/components/marketing/error-state";
import { getErrorState } from "@/src/tokens/error-states";

export function OfflineErrorPage() {
  const config = getErrorState("offline");

  return (
    <ErrorPageShell>
      <ErrorState
        title={config.title}
        description={config.description}
        image={config.image}
        imageWidth={config.imageWidth}
        imageHeight={config.imageHeight}
        actions={[
          {
            label: "Try Again",
            variant: "primary",
            onClick: () => window.location.reload(),
          },
        ]}
      />
    </ErrorPageShell>
  );
}

export function ServerErrorStaticPage() {
  const config = getErrorState("server-error");

  return (
    <ErrorPageShell>
      <ErrorState
        title={config.title}
        description={config.description}
        image={config.image}
        imageWidth={config.imageWidth}
        imageHeight={config.imageHeight}
        actions={[
          {
            label: "Try Refreshing",
            variant: "secondary",
            onClick: () => window.location.reload(),
          },
          { label: "Back", href: "/", variant: "primary" },
        ]}
      />
    </ErrorPageShell>
  );
}

export function NoResultsErrorPage() {
  const config = getErrorState("no-results");

  function handleClearFilters() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  }

  return (
    <ErrorPageShell>
      <ErrorState
        title={config.title}
        description={config.description}
        image={config.image}
        imageWidth={config.imageWidth}
        imageHeight={config.imageHeight}
        actions={[
          {
            label: "Clear Filters",
            variant: "secondary",
            onClick: handleClearFilters,
          },
          { label: "Contact Us", href: "/contact", variant: "primary" },
        ]}
      />
    </ErrorPageShell>
  );
}
