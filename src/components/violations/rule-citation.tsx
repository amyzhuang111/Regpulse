import { BookOpen } from "lucide-react";
import { SeverityBadge } from "./severity-badge";
import type { Rule } from "@/types";

interface RuleCitationProps {
  rule: Rule;
}

export function RuleCitation({ rule }: RuleCitationProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        <BookOpen className="h-4 w-4 text-primary" />
        Rule Citation
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium">{rule.code}</span>
          <SeverityBadge severity={rule.severity} />
        </div>
        <p className="text-sm font-medium">{rule.name}</p>
        <p className="text-sm text-muted-foreground">{rule.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded bg-muted px-1.5 py-0.5">{rule.authority}</span>
          <span className="rounded bg-muted px-1.5 py-0.5">{rule.category}</span>
        </div>
      </div>
    </div>
  );
}
