import {
  PolicyBulletList,
  PolicyCard,
  PolicyExampleCallout,
  PolicyFootnote,
  PolicyInfoCallout,
  PolicyNoteCallout,
  PolicyWarningCallout,
  ShiftingComparisonTable,
} from "@/components/marketing/tenant-policy/tenant-policy-primitives";
import {
  tenantPolicySections,
  tenantPolicyShiftingTable,
  type TenantPolicySectionId,
} from "@/src/constants/tenant-policy";
import { cn } from "@/src/lib/cn";

function SectionHeading({
  id,
  title,
  className,
}: {
  id: TenantPolicySectionId;
  title: string;
  className?: string;
}) {
  return (
    <h2
      id={`tenant-policy-${id}`}
      className={cn(
        "scroll-mt-36 font-satoshi text-[1.875rem] font-medium leading-[2.375rem] text-gray-900 lg:scroll-mt-28",
        className,
      )}
    >
      {title}
    </h2>
  );
}

export function TenantPolicySections() {
  const booking = tenantPolicySections.booking;
  const moveIn = tenantPolicySections["move-in"];
  const living = tenantPolicySections.living;
  const guidelines = tenantPolicySections.guidelines;
  const moveOut = tenantPolicySections["move-out"];
  const payments = tenantPolicySections.payments;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <section aria-labelledby="tenant-policy-booking" className="space-y-4">
        <SectionHeading id="booking" title={booking.title} />
        <PolicyCard>
          <PolicyBulletList items={booking.bullets} />
          <PolicyFootnote>{booking.footnote}</PolicyFootnote>
        </PolicyCard>
      </section>

      <section aria-labelledby="tenant-policy-move-in" className="space-y-4">
        <SectionHeading id="move-in" title={moveIn.title} />
        <PolicyCard>
          <PolicyBulletList items={moveIn.bullets} />
          <PolicyFootnote>{moveIn.footnote}</PolicyFootnote>
        </PolicyCard>
      </section>

      <section aria-labelledby="tenant-policy-living" className="space-y-4">
        <SectionHeading id="living" title={living.title} />
        <PolicyCard className="space-y-4">
          <PolicyBulletList items={living.bullets} />
          <ShiftingComparisonTable
            title={tenantPolicyShiftingTable.title}
            columns={tenantPolicyShiftingTable.columns}
            rows={tenantPolicyShiftingTable.rows}
          />
          <PolicyNoteCallout>{tenantPolicyShiftingTable.note}</PolicyNoteCallout>
          <PolicyFootnote>{living.footnote}</PolicyFootnote>
        </PolicyCard>
      </section>

      <section aria-labelledby="tenant-policy-guidelines" className="space-y-4">
        <SectionHeading id="guidelines" title={guidelines.title} />
        <PolicyCard className="space-y-4">
          <PolicyBulletList items={guidelines.bullets} />
          <PolicyWarningCallout>{guidelines.warning}</PolicyWarningCallout>
        </PolicyCard>
      </section>

      <section aria-labelledby="tenant-policy-move-out" className="space-y-4">
        <SectionHeading id="move-out" title={moveOut.title} />
        <PolicyCard className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            {moveOut.raisingTitle}
          </h3>
          <PolicyBulletList items={moveOut.raisingBullets} />
          <PolicyExampleCallout
            title={moveOut.exampleTitle}
            steps={moveOut.exampleSteps}
          />
        </PolicyCard>
        <PolicyCard className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            {moveOut.refundsTitle}
          </h3>
          <PolicyBulletList items={moveOut.refundBullets} />
        </PolicyCard>
      </section>

      <section aria-labelledby="tenant-policy-payments" className="space-y-4">
        <SectionHeading id="payments" title={payments.title} />
        <PolicyCard className="space-y-4">
          <PolicyInfoCallout>{payments.infoCallout}</PolicyInfoCallout>
          <PolicyBulletList items={payments.bullets} />
        </PolicyCard>
      </section>
    </div>
  );
}
