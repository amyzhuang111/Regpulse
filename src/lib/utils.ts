import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100) / 100}%`;
}

export function calculateRiskScore(violations: { severity: string; confidence: number }[]): number {
  const weights: Record<string, number> = {
    critical: 40,
    high: 25,
    medium: 15,
    low: 5,
  };

  const rawScore = violations.reduce((sum, v) => {
    const weight = weights[v.severity] || 5;
    return sum + weight * (v.confidence / 100);
  }, 0);

  // Logarithmic normalization to 0-100
  return Math.min(100, Math.round(Math.log1p(rawScore) * 20));
}
