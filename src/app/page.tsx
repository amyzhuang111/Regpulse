import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <div className="flex items-center gap-3">
        <Shield className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold">RegPulse</h1>
      </div>
      <p className="max-w-md text-center text-muted-foreground">
        Voice-First AI Compliance Monitoring. Detect regulatory violations on
        sales calls in real-time with audit-ready evidence.
      </p>
      <div className="flex gap-3">
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
