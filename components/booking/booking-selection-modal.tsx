"use client";

import { useEffect, useId, useState } from "react";
import { HdpBookingCard } from "@/components/marketing/hdp-booking-card";
import { Modal, ModalTitle } from "@/components/ui/modal";
import type { BookingSelectionDetails } from "@/src/lib/booking/url";
import type { CategoryProps } from "@/src/models/category";
import type { HdpOccupancy } from "@/src/tokens/hdp";

export interface BookingSelectionModalProps {
  open: boolean;
  onClose: () => void;
  categories: readonly CategoryProps[];
  minStayMonths: number;
  soldOut?: boolean;
  initialCategoryId: number;
  initialOccupancy: HdpOccupancy;
  onSave: (details: BookingSelectionDetails) => void;
}

export function BookingSelectionModal({
  open,
  onClose,
  categories,
  minStayMonths,
  soldOut = false,
  initialCategoryId,
  initialOccupancy,
  onSave,
}: BookingSelectionModalProps) {
  const titleId = useId();
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    if (open) {
      setSessionKey((current) => current + 1);
    }
  }, [open, initialCategoryId, initialOccupancy]);

  function handleSave(details: BookingSelectionDetails) {
    onSave(details);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel="Close occupancy selection"
      maxWidthClassName="max-w-lg"
      className="p-5 sm:p-6"
    >
      <ModalTitle id={titleId} className="text-xl">
        Select your Occupancy
      </ModalTitle>

      <div className="mt-4">
        {open ? (
          <HdpBookingCard
            key={sessionKey}
            bookOnly
            selectionOnly
            variant="modal"
            showSelectHeading={false}
            categories={categories}
            view={{
              minStayMonths,
              soldOut,
            }}
            initialCategoryId={initialCategoryId}
            initialOccupancy={initialOccupancy}
            onSelectionComplete={handleSave}
            confirmLabel="Save"
          />
        ) : null}
      </div>
    </Modal>
  );
}
