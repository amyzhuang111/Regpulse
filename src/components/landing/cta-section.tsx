"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-4 py-20 md:py-32">
      <motion.div
        className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-chart-2/5 p-10 text-center md:p-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold md:text-4xl">
          Ready to Stay Compliant?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Start monitoring your sales calls for regulatory violations today.
          No credit card required.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
