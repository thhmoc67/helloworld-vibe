import { cn } from "@/src/lib/cn";

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 9v5M10 6.5v.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 6.5v4M10 14h.01"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
      />
      <path
        d="M8.57 3.51 1.82 15a1 1 0 0 0 .86 1.5h14.64a1 1 0 0 0 .86-1.5L11.43 3.51a1 1 0 0 0-1.72 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PolicyBulletList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm font-medium leading-5 text-gray-900">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-hello-lime-400"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PolicyCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white px-6 py-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PolicyFootnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs mt-3 italic leading-[1.125rem] text-gray-500">{children}</p>
  );
}

export function PolicyInfoCallout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg bg-sky-50 px-4 py-2 text-xs font-medium leading-[1.125rem] text-gray-900",
        className,
      )}
    >
      <InfoIcon className="mt-0.5 size-5 shrink-0 text-sky-600" />
      <p>{children}</p>
    </div>
  );
}

export function PolicyWarningCallout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg bg-red-50 px-4 py-2 text-xs font-medium leading-[1.125rem] text-gray-900",
        className,
      )}
    >
      <AlertIcon className="mt-0.5 size-5 shrink-0 text-red-500" />
      <p>{children}</p>
    </div>
  );
}

export function PolicyNoteCallout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "rounded-full bg-yelloworld-25 px-4 py-2 text-xs font-medium leading-[1.125rem] text-gray-900",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PolicyExampleCallout({
  title,
  steps,
}: {
  title: string;
  steps: readonly string[];
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-3">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-[1.3125rem] text-gray-900">
        {steps.map((step) => (
          <li key={step}>→ {step}</li>
        ))}
      </ul>
    </div>
  );
}

export function ShiftingComparisonTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: readonly [string, string];
  rows: ReadonlyArray<{ upgrade: string; downgrade: string }>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 bg-gray-50 text-sm font-bold text-gray-900">
          <div className="border-r border-gray-200 px-4 py-4">{columns[0]}</div>
          <div className="px-4 py-4">{columns[1]}</div>
        </div>
        {rows.map((row) => (
          <div
            key={row.upgrade}
            className="grid grid-cols-2 border-t border-gray-200 text-sm text-gray-900"
          >
            <div className="border-r border-gray-200 px-4 py-4">{row.upgrade}</div>
            <div className="px-4 py-4">{row.downgrade}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TenantPolicySidebarButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-bold transition-colors",
        active
          ? "bg-hello-lime-400 text-gray-800"
          : "text-gray-700 hover:bg-gray-50",
      )}
    >
      <span>{label}</span>
      <ChevronRightIcon
        className={cn("size-5 shrink-0", active ? "text-gray-800" : "text-gray-400")}
      />
    </button>
  );
}
