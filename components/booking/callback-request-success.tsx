import Image from "next/image";
import { localityCallbackSuccessIllustration } from "@/src/tokens/locality";
import { cn } from "@/src/lib/cn";

export function CallbackRequestSuccess({
  onDone,
  className,
  titleId,
  descriptionId,
}: {
  onDone: () => void;
  className?: string;
  titleId?: string;
  descriptionId?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <Image
        src={localityCallbackSuccessIllustration}
        alt=""
        width={280}
        height={200}
        className="mx-auto h-auto w-full max-w-[15.5rem] object-contain"
        priority
      />
      <h2
        id={titleId}
        className="mt-6 text-xl font-bold text-gray-900 md:text-2xl"
      >
        You&apos;re in good hands 🤝
      </h2>
      <p
        id={descriptionId}
        className="mt-3 text-sm leading-6 text-gray-600 md:text-base"
      >
        We&apos;ve received your request.
        <br />
        Expect a call shortly.
      </p>
      <button
        type="button"
        onClick={onDone}
        className="mt-8 h-14 w-full rounded-2xl bg-hello-lime-400 text-base font-bold text-gray-900 transition-colors hover:bg-hello-lime-500"
      >
        Done
      </button>
    </div>
  );
}
