"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";

const demoViolations = [
  {
    severity: "critical",
    rule: "SEC 10b-5",
    text: "Guaranteed returns claim detected",
    color: "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    severity: "critical",
    rule: "SEC 10b-5",
    text: "Zero risk misrepresentation",
    color: "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    severity: "high",
    rule: "FINRA 2111",
    text: "Suitability assessment missing",
    color:
      "border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    severity: "high",
    rule: "FTC Act Sec 5",
    text: "Pressure tactics with false urgency",
    color:
      "border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
];

export function DemoSection() {
  return (
    <section id="demo" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            See It in Action
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch how RegPulse detects violations in a simulated sales call in
            real-time.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 grid gap-6 lg:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Transcript preview */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-medium">Live Transcript</span>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-primary">Agent:</span>{" "}
                <span className="text-muted-foreground">
                  &quot;Our trading algorithm generates consistent 20% monthly returns.
                  You&apos;re guaranteed to see those returns.&quot;
                </span>
              </div>
              <div>
                <span className="font-medium text-chart-2">Customer:</span>{" "}
                <span className="text-muted-foreground">
                  &quot;20% monthly? That sounds incredible. Is that guaranteed?&quot;
                </span>
              </div>
              <div>
                <span className="font-medium text-primary">Agent:</span>{" "}
                <span className="text-muted-foreground">
                  &quot;Absolutely! There&apos;s virtually{" "}
                  <span className="rounded bg-red-500/20 px-1 text-red-600 dark:text-red-400">
                    zero downside risk
                  </span>{" "}
                  involved.&quot;
                </span>
              </div>
            </div>
          </div>

          {/* Violations detected */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">
                Violations Detected (4)
              </span>
            </div>
            <div className="space-y-3">
              {demoViolations.map((v, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-3 ${v.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase">
                      {v.severity}
                    </span>
                    <span className="text-xs opacity-75">{v.rule}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Evidence quality callout */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            Transcript excerpts
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Rule citations
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            AI reasoning
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-chart-2" />
            Confidence scores
          </div>
        </motion.div>
      </div>
    </section>
  );
}
