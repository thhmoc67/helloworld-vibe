"use client";

import { useEffect, useId, useState } from "react";
import {
  ScheduleVisitFlow,
  type ScheduleVisitFlowStep,
} from "@/components/booking/schedule-visit-flow";
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
  const [flowStep, setFlowStep] = useState<ScheduleVisitFlowStep>("schedule");
  const isSuccess = flowStep === "success";

  useEffect(() => {
    if (!open) {
      setFlowStep("schedule");
    }
  }, [open]);

  if (!propertyId) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={isSuccess ? undefined : titleId}
      describedBy={isSuccess ? undefined : descriptionId}
      closeLabel="Close schedule visit dialog"
      maxWidthClassName={isSuccess ? "max-w-lg" : "max-w-xl"}
    >
      {!isSuccess ? (
        <>
          <ModalTitle id={titleId}>Schedule a visit</ModalTitle>
          <ModalDescription id={descriptionId}>
            Pick a date and time to tour {propertyName}.
          </ModalDescription>
        </>
      ) : null}

      <div className={isSuccess ? undefined : "mt-6"}>
        {open ? (
          <ScheduleVisitFlow
            key={`${propertyId}-${open}`}
            propertyId={propertyId}
            propertyName={propertyName}
            propertyUrl={propertyUrl}
            layout="modal"
            onClose={onClose}
            onStepChange={setFlowStep}
          />
        ) : null}
      </div>
    </Modal>
  );
}
