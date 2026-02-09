import { cn } from "@/lib/utils";
import { severityColors } from "@/constants/rules";
import type { Severity } from "@/types";

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
        severityColors[severity]
      )}
    >
      {severity}
    </span>
  );
}
