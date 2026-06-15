import { cn } from "@/src/lib/cn";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccordionSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details
      id={id}
      className={cn("group scroll-mt-8 border-t border-gray-200", className)}
    >
      <summary className="cursor-pointer list-none py-8 marker:content-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h2 className="text-display-sm font-bold tracking-tight text-gray-900">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 max-w-3xl text-lg text-gray-600">{description}</p>
            ) : null}
          </div>
          <ChevronIcon className="mt-2 size-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
        </div>
      </summary>
      <div className="pb-16">{children}</div>
    </details>
  );
}
