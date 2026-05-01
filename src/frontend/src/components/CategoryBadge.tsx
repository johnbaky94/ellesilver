import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { CategoryWithCount } from "../backend";

interface CategoryBadgeProps {
  category: CategoryWithCount;
  active?: boolean;
  className?: string;
}

export function CategoryBadge({
  category,
  active,
  className,
}: CategoryBadgeProps) {
  return (
    <Link
      to="/category/$id"
      params={{ id: category.id.toString() }}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-widest uppercase font-display transition-smooth",
        active
          ? "bg-foreground text-background"
          : "bg-transparent text-foreground hover:text-accent border border-border hover:border-accent",
        className,
      )}
      data-ocid="category.link"
    >
      {category.name}
      {category.productCount > 0n && (
        <span
          className={cn(
            "text-[10px] tabular-nums",
            active ? "text-background/70" : "text-muted-foreground",
          )}
        >
          ({category.productCount.toString()})
        </span>
      )}
    </Link>
  );
}
