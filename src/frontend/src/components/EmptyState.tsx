import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
      data-ocid="empty_state"
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl tracking-wide text-foreground mb-2">
        {title}
      </h3>
      {description && (
        <p className="font-body text-sm text-muted-foreground max-w-xs mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button
          variant="outline"
          onClick={action.onClick}
          className="text-xs tracking-widest uppercase border-foreground/30 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-smooth"
          data-ocid="empty_state.primary_button"
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
