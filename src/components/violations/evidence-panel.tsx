import { FileText, Quote } from "lucide-react";
import type { Violation } from "@/types";

interface EvidencePanelProps {
  violation: Violation;
}

export function EvidencePanel({ violation }: EvidencePanelProps) {
  return (
    <div className="space-y-4">
      {/* Transcript excerpt */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <Quote className="h-4 w-4 text-primary" />
          Transcript Excerpt
        </div>
        <blockquote className="border-l-2 border-primary/50 pl-3 text-sm italic text-muted-foreground">
          &quot;{violation.transcript_excerpt}&quot;
        </blockquote>
        {violation.timestamp_ms != null && (
          <p className="mt-2 text-xs text-muted-foreground">
            Detected at {Math.floor(violation.timestamp_ms / 1000)}s into the call
          </p>
        )}
      </div>

      {/* AI reasoning */}
      {violation.ai_reasoning && (
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-primary" />
            AI Analysis
          </div>
          <p className="text-sm text-muted-foreground">
            {violation.ai_reasoning}
          </p>
        </div>
      )}
    </div>
  );
}
