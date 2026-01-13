import * as React from "react";
import { List, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "table" | "grid";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewModeChange,
  className,
}) => {
  return (
    <div className={cn("inline-flex rounded-lg border-2 border-border bg-muted/30 p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange("table")}
        className={cn(
          "h-8 px-3 transition-all duration-200",
          viewMode === "table"
            ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-sm border-2 border-primary/30"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <List className="w-4 h-4 mr-2" />
        Table
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "h-8 px-3 transition-all duration-200",
          viewMode === "grid"
            ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary shadow-sm border-2 border-primary/30"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Grid3x3 className="w-4 h-4 mr-2" />
        Grid
      </Button>
    </div>
  );
};

export { ViewToggle };

