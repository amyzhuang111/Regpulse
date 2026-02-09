"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Shield,
  BarChart3,
  FileCheck,
  Zap,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Monitoring",
    description:
      "Real-time transcription and analysis of sales calls using Whisper AI with instant violation detection.",
  },
  {
    icon: Shield,
    title: "Multi-Regulation Coverage",
    description:
      "Pre-loaded rules for SEC 10b-5, Reg BI, FINRA 2111, FTC Act Section 5, and more regulatory frameworks.",
  },
  {
    icon: Zap,
    title: "Instant Detection",
    description:
      "GPT-4o powered analysis flags violations as they happen — guaranteed returns, pressure tactics, suitability failures.",
  },
  {
    icon: FileCheck,
    title: "Audit-Ready Evidence",
    description:
      "Every violation includes transcript excerpts, rule citations, AI reasoning, and confidence scores.",
  },
  {
    icon: BarChart3,
    title: "Compliance Analytics",
    description:
      "Track risk trends, violation patterns, agent performance, and compliance scores over time.",
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    description:
      "SOC 2 ready architecture with row-level security, encrypted storage, and full audit trails.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need for{" "}
            <span className="text-primary">Compliance</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From real-time call monitoring to comprehensive reports, RegPulse
            covers every aspect of regulatory compliance.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
