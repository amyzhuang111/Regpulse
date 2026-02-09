"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "99.2%", label: "Detection Accuracy" },
  { value: "<2s", label: "Alert Latency" },
  { value: "8+", label: "Regulation Frameworks" },
  { value: "24/7", label: "Real-time Monitoring" },
];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30 px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
