"use client";

import { useId } from "react";
import { Modal, ModalTitle } from "@/components/ui/modal";
import type { NeighborhoodPlaceOption } from "@/src/tokens/neighborhood-card";
import { cn } from "@/src/lib/cn";

export function NeighborhoodCategoryPickerModal({
  open,
  onClose,
  category,
  options,
  selectedIndex,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  category: string;
  options: readonly NeighborhoodPlaceOption[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const titleId = useId();

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel="Close place picker"
      maxWidthClassName="max-w-md"
    >
      <ModalTitle id={titleId}>{category}</ModalTitle>
      <ul className="mt-6 max-h-[min(24rem,70vh)] space-y-2 overflow-y-auto">
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(index);
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                  isSelected
                    ? "border-hello-lime-400 bg-hello-lime-50"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                )}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-900">
                    {option.placeName}
                  </span>
                  <span className="mt-0.5 block text-sm text-blue-light-500">
                    {option.walkTime}
                  </span>
                </span>
                {isSelected ? (
                  <span className="shrink-0 text-hello-lime-600" aria-hidden>
                    ✓
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
