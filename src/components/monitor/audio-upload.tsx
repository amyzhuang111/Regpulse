"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileAudio, Loader2, CheckCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SeverityBadge } from "@/components/violations/severity-badge";
import type { Severity, Violation } from "@/types";

interface UploadResult {
  call_id: string;
  transcript: string;
  analysis: {
    summary: string;
    riskScore: number;
    violationCount: number;
  };
  violations: Violation[];
}

type UploadState = "idle" | "uploading" | "transcribing" | "analyzing" | "done" | "error";

export function AudioUpload() {
  const [state, setState] = useState<UploadState>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setState("idle");
    setFile(null);
    setResult(null);
    setError(null);
    setAgentName("");
    setCustomerName("");
  }, []);

  const handleFile = useCallback((f: File) => {
    const validTypes = [
      "audio/mpeg", "audio/mp3", "audio/wav", "audio/wave", "audio/x-wav",
      "audio/webm", "audio/ogg", "audio/flac", "audio/mp4", "audio/m4a",
      "audio/x-m4a", "video/mp4", "video/webm",
    ];
    if (!validTypes.includes(f.type) && !f.name.match(/\.(mp3|wav|webm|ogg|flac|m4a|mp4)$/i)) {
      setError("Please upload an audio file (MP3, WAV, M4A, WEBM, OGG, FLAC, or MP4)");
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      setError("File too large. Maximum size is 4MB.");
      return;
    }
    setError(null);
    setFile(f);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const upload = useCallback(async () => {
    if (!file) return;
    setState("uploading");
    setError(null);

    try {
      setState("transcribing");
      const formData = new FormData();
      formData.append("file", file);
      if (agentName) formData.append("agent_name", agentName);
      if (customerName) formData.append("customer_name", customerName);

      const res = await fetch("/api/calls/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMsg = "Upload failed";
        try {
          const data = await res.json();
          errorMsg = data.error || errorMsg;
        } catch {
          if (res.status === 413) {
            errorMsg = "File too large for server. Try a smaller file (under 4MB).";
          } else {
            errorMsg = `Server error (${res.status}). Try a smaller file.`;
          }
        }
        throw new Error(errorMsg);
      }

      setState("analyzing");
      const data: UploadResult = await res.json();
      setResult(data);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setState("error");
    }
  }, [file, agentName, customerName]);

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      {state === "idle" && !file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-center">
            <p className="font-medium">Drop an audio file here or click to browse</p>
            <p className="text-sm text-muted-foreground">
              MP3, WAV, M4A, WEBM, OGG, FLAC, MP4 — max 4MB
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="audio/*,video/mp4,video/webm"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      )}

      {/* File selected — ready to upload */}
      {file && state === "idle" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <FileAudio className="h-8 w-8 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <button onClick={reset} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Agent Name (optional)</label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="e.g. Sales Rep #1"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Customer Name (optional)</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            onClick={upload}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Transcribe &amp; Analyze
          </button>
        </div>
      )}

      {/* Processing states */}
      {(state === "uploading" || state === "transcribing" || state === "analyzing") && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-center">
            <p className="font-medium">
              {state === "uploading" && "Uploading file..."}
              {state === "transcribing" && "Transcribing with ElevenLabs Scribe..."}
              {state === "analyzing" && "Analyzing for compliance violations..."}
            </p>
            <p className="text-sm text-muted-foreground">This may take a minute for long recordings</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {state === "error" && error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-destructive">Analysis Failed</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
              <button
                onClick={reset}
                className="mt-3 rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline error for validation */}
      {state === "idle" && error && !file && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Results */}
      {state === "done" && result && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/5 p-4">
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            <div>
              <p className="font-medium">Analysis Complete</p>
              <p className="text-sm text-muted-foreground">
                Risk score: {result.analysis.riskScore}/100 — {result.analysis.violationCount} violation{result.analysis.violationCount !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{result.analysis.summary}</p>
          </div>

          {/* Transcript */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-2">Transcript</h3>
            <div className="max-h-64 overflow-auto text-sm text-muted-foreground whitespace-pre-wrap">
              {result.transcript}
            </div>
          </div>

          {/* Violations */}
          {result.violations.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <h3 className="text-sm font-semibold">
                  Violations ({result.violations.length})
                </h3>
              </div>
              <div className="space-y-3">
                {result.violations.map((v) => (
                  <div key={v.id} className="rounded-lg border border-border bg-background p-3">
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
                    {v.ai_reasoning && (
                      <p className="mt-2 text-xs text-muted-foreground">{v.ai_reasoning}</p>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground">
                      {v.confidence}% confidence
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={reset}
            className="rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Upload Another File
          </button>
        </div>
      )}
    </div>
  );
}
