import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export function LoadingSpinner({
  className,
  size = "md",
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      data-ocid="loading_state"
      aria-label={label ?? "Loading…"}
    >
      <div
        className={cn(
          "rounded-full border-border border-t-accent animate-spin",
          sizeMap[size],
        )}
      />
      {label && (
        <p className="text-xs tracking-widest uppercase text-muted-foreground font-display">
          {label}
        </p>
      )}
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <div key={`skeleton-${i}`} className="space-y-3">
          <div className="aspect-square bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 bg-muted animate-pulse w-3/4" />
            <div className="h-3 bg-muted animate-pulse w-1/3" />
            <div className="h-8 bg-muted animate-pulse w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
