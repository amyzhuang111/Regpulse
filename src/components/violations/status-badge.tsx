import { cn } from "@/lib/utils";
import type { ViolationStatus } from "@/types";

const statusStyles: Record<ViolationStatus, string> = {
  open: "bg-red-500/10 text-red-500 border-red-500/20",
  acknowledged: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  resolved: "bg-green-500/10 text-green-500 border-green-500/20",
  dismissed: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status }: { status: ViolationStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
