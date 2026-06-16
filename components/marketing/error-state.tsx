"use client";

import Link from "next/link";
import { HomepageAsset } from "@/components/marketing/homepage-asset";
import { cn } from "@/src/lib/cn";
import type {
  ErrorStateAction,
  ErrorStateActionVariant,
  ErrorStateConfig,
} from "@/src/tokens/error-states";

type ErrorStateActionWithHandler = ErrorStateAction & {
  onClick?: () => void;
};

function actionClassName(variant: ErrorStateActionVariant = "primary") {
  return cn(
    "inline-flex h-12 min-w-[9.5rem] items-center justify-center rounded-full px-6 text-base font-bold transition-colors",
    variant === "primary"
      ? "bg-hello-lime-400 text-gray-900 hover:bg-hello-lime-500"
      : "border border-hello-lime-400 bg-white text-gray-900 hover:bg-hello-lime-50",
  );
}

function ErrorStateActionButton({
  action,
}: {
  action: ErrorStateActionWithHandler;
}) {
  const className = actionClassName(action.variant);

  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}

export function ErrorState({
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  actions,
}: Pick<
  ErrorStateConfig,
  "title" | "description" | "image" | "imageWidth" | "imageHeight"
> & {
  actions: ErrorStateActionWithHandler[];
}) {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <HomepageAsset
          asset={image}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-full max-w-[18rem] sm:max-w-[20rem]"
          priority
        />

        <h1 className="mt-8 text-2xl font-bold leading-8 text-gray-900 sm:mt-10 sm:text-[2rem] sm:leading-10">
          {title}
        </h1>

        <p className="mt-3 max-w-md text-base leading-7 text-gray-600">
          {description}
        </p>

        {actions.length > 0 ? (
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
            {actions.map((action) => (
              <ErrorStateActionButton key={action.label} action={action} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
