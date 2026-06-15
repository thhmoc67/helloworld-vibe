import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/cn";

export type ButtonSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type ButtonHierarchy =
  | "primary"
  | "secondary-color"
  | "secondary-gray"
  | "tertiary-color"
  | "tertiary-gray"
  | "link-color"
  | "link-gray";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  hierarchy?: ButtonHierarchy;
  destructive?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-sm",
  md: "h-10 gap-1.5 px-4 text-sm",
  lg: "h-11 gap-2 px-[18px] text-base",
  xl: "h-12 gap-2 px-5 text-base",
  "2xl": "h-14 gap-2.5 px-7 text-lg",
};

const linkSizeClasses: Record<ButtonSize, string> = {
  sm: "h-5 gap-1 text-sm",
  md: "h-5 gap-1 text-sm",
  lg: "h-6 gap-1.5 text-base",
  xl: "h-6 gap-1.5 text-base",
  "2xl": "h-7 gap-2 text-lg",
};

function getHierarchyClasses(
  hierarchy: ButtonHierarchy,
  destructive: boolean,
): string {
  if (hierarchy === "primary") {
    return destructive
      ? "bg-error-600 text-white shadow-xs ring-1 ring-transparent ring-inset hover:bg-error-700 focus-visible:ring-error-100"
      : "bg-hello-lime-500 text-white shadow-xs ring-1 ring-transparent ring-inset hover:bg-hello-lime-600 focus-visible:ring-hello-lime-100";
  }

  if (hierarchy === "secondary-color") {
    return destructive
      ? "border border-error-300 bg-error-50 text-error-700 shadow-xs ring-1 ring-error-200 ring-inset hover:bg-error-100 focus-visible:ring-error-100"
      : "border border-hello-lime-300 bg-hello-lime-50 text-hello-lime-700 shadow-xs ring-1 ring-hello-lime-200 ring-inset hover:bg-hello-lime-100 focus-visible:ring-hello-lime-100";
  }

  if (hierarchy === "secondary-gray") {
    return destructive
      ? "border border-error-300 bg-white text-error-700 shadow-xs ring-1 ring-error-200 ring-inset hover:bg-error-50 focus-visible:ring-error-100"
      : "border border-gray-300 bg-white text-gray-700 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-gray-100";
  }

  if (hierarchy === "tertiary-color") {
    return destructive
      ? "text-error-700 hover:bg-error-50 focus-visible:ring-error-100"
      : "text-hello-lime-700 hover:bg-hello-lime-50 hover:text-hello-lime-800 focus-visible:ring-hello-lime-100";
  }

  if (hierarchy === "tertiary-gray") {
    return destructive
      ? "text-error-700 hover:bg-error-50 focus-visible:ring-error-100"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-700 focus-visible:ring-gray-100";
  }

  if (hierarchy === "link-color") {
    return destructive
      ? "text-error-700 underline-offset-4 hover:text-error-800 hover:underline"
      : "text-hello-lime-700 underline-offset-4 hover:text-hello-lime-800 hover:underline";
  }

  return destructive
    ? "text-error-700 underline-offset-4 hover:text-error-800 hover:underline"
    : "text-gray-600 underline-offset-4 hover:text-gray-700 hover:underline";
}

export function Button({
  children,
  className,
  size = "md",
  hierarchy = "primary",
  destructive = false,
  iconLeading,
  iconTrailing,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const isLink = hierarchy === "link-color" || hierarchy === "link-gray";
  const hasShadow =
    hierarchy === "primary" ||
    hierarchy === "secondary-color" ||
    hierarchy === "secondary-gray";

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold touch-manipulation",
        "focus-visible:outline-none focus-visible:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isLink
          ? "transition-colors duration-200 ease-out motion-reduce:transition-none"
          : cn(
              "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out",
              "motion-reduce:transition-none motion-reduce:active:scale-100",
              "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
              hasShadow && "hover:shadow-sm active:shadow-xs",
            ),
        isLink ? "p-0" : sizeClasses[size],
        isLink && linkSizeClasses[size],
        getHierarchyClasses(hierarchy, destructive),
        className,
      )}
      {...props}
    >
      {iconLeading}
      <span>{children}</span>
      {iconTrailing}
    </button>
  );
}
