"use client";

import { useEffect, useId, useState } from "react";
import { HdpBookingCard } from "@/components/marketing/hdp-booking-card";
import { Modal, ModalTitle } from "@/components/ui/modal";
import type {
  BookingOccupantInfo,
  BookNowCompleteDetails,
} from "@/src/lib/booking/url";
import type { CategoryProps } from "@/src/models/category";
import type { HdpOccupancy } from "@/src/tokens/hdp";

export interface BookNowModalProps {
  open: boolean;
  onClose: () => void;
  categories: readonly CategoryProps[];
  bookingPath: string;
  minStayMonths: number;
  soldOut?: boolean;
  initialCategoryId: number;
  initialOccupancy: HdpOccupancy;
  initialMoveInDate: string;
  initialOccupantInfo: BookingOccupantInfo;
  onComplete: (details: BookNowCompleteDetails) => void;
}

export function BookNowModal({
  open,
  onClose,
  categories,
  bookingPath,
  minStayMonths,
  soldOut = false,
  initialCategoryId,
  initialOccupancy,
  initialMoveInDate,
  initialOccupantInfo,
  onComplete,
}: BookNowModalProps) {
  const titleId = useId();
  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    if (open) {
      setSessionKey((current) => current + 1);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel="Close book now dialog"
      maxWidthClassName="max-w-lg"
      className="p-5 sm:p-6"
    >
      <ModalTitle id={titleId} className="text-xl">
        Book Now
      </ModalTitle>

      <div className="mt-4">
        {open ? (
          <HdpBookingCard
            key={sessionKey}
            bookOnly
            variant="modal"
            categories={categories}
            view={{
              minStayMonths,
              soldOut,
              bookingPath,
            }}
            initialCategoryId={initialCategoryId}
            initialOccupancy={initialOccupancy}
            initialOccupantInfo={{
              ...initialOccupantInfo,
              moveInDate: initialMoveInDate,
            }}
            onBookingComplete={onComplete}
          />
        ) : null}
      </div>
    </Modal>
  );
}
