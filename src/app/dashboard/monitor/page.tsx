"use client";

import { useState, useEffect, useCallback } from "react";
import { Mic, MicOff, AlertTriangle, Play, Square } from "lucide-react";
import { demoTranscriptLines, demoViolations } from "@/constants/demo-data";
import { SeverityBadge } from "@/components/violations/severity-badge";
import { cn } from "@/lib/utils";
import type { Severity } from "@/types";

interface TranscriptLine {
  speaker: string;
  text: string;
}

export default function MonitorPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [violations, setViolations] = useState<typeof demoViolations>([]);
  const [elapsed, setElapsed] = useState(0);

  const startDemo = useCallback(() => {
    setIsRunning(true);
    setTranscript([]);
    setViolations([]);
    setElapsed(0);
  }, []);

  const stopDemo = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Stream transcript lines
  useEffect(() => {
    if (!isRunning) return;

    const timers = demoTranscriptLines.map((line, i) => {
      return setTimeout(() => {
        setTranscript((prev) => [...prev, { speaker: line.speaker, text: line.text }]);
      }, line.delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [isRunning]);

  // Stream violations
  useEffect(() => {
    if (!isRunning) return;

    const timers = demoViolations.map((v) => {
      return setTimeout(() => {
        setViolations((prev) => [...prev, v]);
      }, (v.timestamp_ms ?? 0) + 2000); // 2s after the triggering text
    });

    return () => timers.forEach(clearTimeout);
  }, [isRunning]);

  // Elapsed timer
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Live Monitor</h1>
          <p className="text-sm text-muted-foreground">
            Real-time call monitoring with AI violation detection (demo mode)
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <button
          onClick={isRunning ? stopDemo : startDemo}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all",
            isRunning
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isRunning ? (
            <>
              <Square className="h-4 w-4" /> Stop Demo
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Start Demo Call
            </>
          )}
        </button>

        {isRunning && (
          <>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              {formatTime(elapsed)}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mic className="h-3.5 w-3.5" />
              Recording
            </div>
          </>
        )}
        {!isRunning && transcript.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MicOff className="h-3.5 w-3.5" />
            Demo ended &middot; {formatTime(elapsed)}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Transcript */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold">Transcript</h2>
          {transcript.length === 0 && !isRunning ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Press &quot;Start Demo Call&quot; to begin a simulated sales call
            </p>
          ) : (
            <div className="max-h-[500px] space-y-2 overflow-auto">
              {transcript.map((line, i) => (
                <div key={i} className="text-sm">
                  <span
                    className={cn(
                      "font-medium",
                      line.speaker === "Agent" ? "text-primary" : "text-chart-2"
                    )}
                  >
                    {line.speaker}:
                  </span>{" "}
                  <span className="text-muted-foreground">{line.text}</span>
                </div>
              ))}
              {isRunning && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="animate-pulse">...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Violations panel */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h2 className="text-sm font-semibold">
              Violations ({violations.length})
            </h2>
          </div>
          {violations.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {isRunning
                ? "Analyzing transcript for violations..."
                : "No violations detected yet"}
            </p>
          ) : (
            <div className="max-h-[500px] space-y-3 overflow-auto">
              {violations.map((v, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-background p-3 animate-in fade-in slide-in-from-right-2"
                >
                  <div className="flex items-center justify-between">
                    <SeverityBadge severity={v.severity as Severity} />
                    <span className="text-xs font-mono text-muted-foreground">
                      {v.rule?.code}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium">{v.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground italic">
                    &quot;{v.transcript_excerpt}&quot;
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{v.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
