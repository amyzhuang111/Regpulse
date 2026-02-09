import type { Severity } from "@/types";

export interface SeedRule {
  code: string;
  name: string;
  description: string;
  category: string;
  authority: string;
  severity: Severity;
  keywords: string[];
}

export const regulatoryRules: SeedRule[] = [
  {
    code: "SEC-10B-5",
    name: "Anti-Fraud Provision",
    description:
      "Prohibits fraud, misrepresentation, and deceit in connection with the purchase or sale of securities. Includes making untrue statements of material fact or omitting material facts.",
    category: "Securities Fraud",
    authority: "SEC",
    severity: "critical",
    keywords: [
      "guaranteed returns",
      "no risk",
      "can't lose",
      "sure thing",
      "promise",
      "guaranteed profit",
    ],
  },
  {
    code: "REG-BI",
    name: "Regulation Best Interest",
    description:
      "Requires broker-dealers to act in the best interest of retail customers when making recommendations, without placing their own financial interests ahead of the customer's interests.",
    category: "Best Interest",
    authority: "SEC",
    severity: "high",
    keywords: [
      "best for you",
      "perfect fit",
      "only option",
      "must buy",
      "can't miss",
      "exclusive opportunity",
    ],
  },
  {
    code: "FINRA-2111",
    name: "Suitability",
    description:
      "Requires that a firm or associated person have a reasonable basis to believe a recommended transaction or investment strategy is suitable for the customer.",
    category: "Suitability",
    authority: "FINRA",
    severity: "high",
    keywords: [
      "suitable for everyone",
      "one size fits all",
      "don't need to know",
      "trust me",
      "skip the paperwork",
    ],
  },
  {
    code: "FINRA-2210",
    name: "Communications with the Public",
    description:
      "Requires that all member communications be fair, balanced, and not misleading. Prohibits exaggerated, unwarranted, or misleading claims.",
    category: "Communications",
    authority: "FINRA",
    severity: "medium",
    keywords: [
      "always goes up",
      "never loses",
      "top performer",
      "beat the market",
      "outperform",
    ],
  },
  {
    code: "FTC-ACT-SEC5",
    name: "FTC Act Section 5 - Unfair/Deceptive Practices",
    description:
      "Prohibits unfair or deceptive acts or practices in or affecting commerce. Covers false advertising, misleading claims, and unfair business practices.",
    category: "Consumer Protection",
    authority: "FTC",
    severity: "high",
    keywords: [
      "free",
      "no obligation",
      "limited time",
      "act now",
      "risk-free",
      "money-back guarantee",
    ],
  },
  {
    code: "SEC-206-4-1",
    name: "Marketing Rule",
    description:
      "Regulates investment adviser advertisements and marketing materials. Prohibits untrue statements, unsubstantiated claims about performance, and misleading use of testimonials.",
    category: "Marketing",
    authority: "SEC",
    severity: "medium",
    keywords: [
      "past performance",
      "track record",
      "historical returns",
      "testimonial",
      "endorsement",
    ],
  },
  {
    code: "SEC-204-2",
    name: "Books and Records",
    description:
      "Requires investment advisers to maintain accurate books and records, including all communications related to recommendations and transactions.",
    category: "Record Keeping",
    authority: "SEC",
    severity: "low",
    keywords: [
      "off the record",
      "don't write this down",
      "between us",
      "unofficial",
    ],
  },
  {
    code: "REG-S-P",
    name: "Privacy of Consumer Financial Information",
    description:
      "Requires financial institutions to protect consumers' personal financial information and provide privacy notices.",
    category: "Privacy",
    authority: "SEC",
    severity: "medium",
    keywords: [
      "social security",
      "account number",
      "password",
      "personal information",
      "share your data",
    ],
  },
];

export const severityColors: Record<Severity, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export const severityDotColors: Record<Severity, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-blue-500",
};
