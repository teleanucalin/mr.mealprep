import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
};

const roundedMap: Record<string, string> = {
  sm: "rounded-md",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-[#e2e8f0]",
        roundedMap[rounded],
        className,
      )}
      role="status"
      aria-label="Se încarcă"
    />
  );
}
