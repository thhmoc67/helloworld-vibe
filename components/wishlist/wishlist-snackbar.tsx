"use client";

import { Snackbar, type SnackbarAction } from "@/components/ui/snackbar";

export type WishlistSnackbarState = {
  message: string;
  action?: SnackbarAction;
  variant?: "default" | "error";
};

export function WishlistSnackbar({
  state,
  onClose,
}: {
  state: WishlistSnackbarState | null;
  onClose: () => void;
}) {
  return (
    <Snackbar
      open={state != null}
      message={state?.message ?? ""}
      action={state?.action}
      variant={state?.variant ?? "default"}
      onClose={onClose}
    />
  );
}
