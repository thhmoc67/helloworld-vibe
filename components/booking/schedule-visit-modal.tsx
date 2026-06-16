"use client";

import { useId } from "react";
import { ScheduleVisitFlow } from "@/components/booking/schedule-visit-flow";
import {
  Modal,
  ModalDescription,
  ModalTitle,
} from "@/components/ui/modal";

export interface ScheduleVisitModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: number;
  propertyName: string;
  propertyUrl?: string;
}

export function ScheduleVisitModal({
  open,
  onClose,
  propertyId,
  propertyName,
  propertyUrl,
}: ScheduleVisitModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  if (!propertyId) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      closeLabel="Close schedule visit dialog"
      maxWidthClassName="max-w-xl"
    >
      <ModalTitle id={titleId}>Schedule a visit</ModalTitle>
      <ModalDescription id={descriptionId}>
        Pick a date and time to tour {propertyName}.
      </ModalDescription>

      <div className="mt-6">
        {open ? (
          <ScheduleVisitFlow
            key={`${propertyId}-${open}`}
            propertyId={propertyId}
            propertyName={propertyName}
            propertyUrl={propertyUrl}
            layout="modal"
          />
        ) : null}
      </div>
    </Modal>
  );
}
