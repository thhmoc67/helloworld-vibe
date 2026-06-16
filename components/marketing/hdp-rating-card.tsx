import Image from "next/image";
import { hdpProperty } from "@/src/tokens/hdp";
import { cn } from "@/src/lib/cn";

function Stat({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs font-medium text-gray-400">
        {accent}
        {label}
      </p>
    </div>
  );
}

export function HdpRatingCard({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-300/60 p-4",
        "bg-[linear-gradient(136deg,rgba(255,255,255,0.56)_44.68%,rgba(213,236,249,0.56)_108.29%),linear-gradient(90deg,#fff_0%,#fff_100%)]",
        className,
      )}
      aria-label="Property highlights"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md space-y-2">
          <span className="inline-flex items-center gap-1 rounded-2xl bg-hello-lime-50 px-2 py-0.5 text-xs font-medium text-hello-lime-800">
            <span aria-hidden>📈</span>
            {hdpProperty.trendingLabel}
          </span>
          <p className="text-lg font-bold leading-snug text-gray-800 md:text-xl">
            {hdpProperty.name}{" "}
            <span className="font-medium text-gray-700">
              {hdpProperty.topChoiceCopy}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 pr-16 sm:pr-20">
          <Stat
            value={hdpProperty.rating}
            label="Rating"
            accent={<span className="text-amber-400">★ </span>}
          />
          <span className="h-8 w-px bg-gray-300" aria-hidden />
          <Stat value={hdpProperty.visitsToday} label="Visits today" />
          <span className="h-8 w-px bg-gray-300" aria-hidden />
          <Stat value={hdpProperty.reviewCount} label="Reviews" />
        </div>
      </div>

      <Image
        src={hdpProperty.trophySrc}
        alt=""
        width={84}
        height={84}
        className="pointer-events-none absolute bottom-2 right-2 size-16 object-contain sm:size-20"
      />
    </section>
  );
}
