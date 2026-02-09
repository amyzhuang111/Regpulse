"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import { regulatoryRules } from "@/constants/rules";
import { SeverityBadge } from "@/components/violations/severity-badge";

const categories = Array.from(new Set(regulatoryRules.map((r) => r.category)));

export default function RulesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filtered = useMemo(() => {
    return regulatoryRules.filter((rule) => {
      if (selectedCategory && rule.category !== selectedCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          rule.code.toLowerCase().includes(q) ||
          rule.name.toLowerCase().includes(q) ||
          rule.description.toLowerCase().includes(q) ||
          rule.authority.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Rules Library</h1>
        <p className="text-sm text-muted-foreground">
          {regulatoryRules.length} regulatory rules across SEC, FINRA, and FTC
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory("")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === ""
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((rule) => (
          <div
            key={rule.code}
            className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono text-sm font-medium">
                  {rule.code}
                </span>
              </div>
              <SeverityBadge severity={rule.severity} />
            </div>

            <h3 className="mt-3 font-semibold">{rule.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
              {rule.description}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {rule.authority}
              </span>
              <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {rule.category}
              </span>
            </div>

            {rule.keywords.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {rule.keywords.slice(0, 4).map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {kw}
                  </span>
                ))}
                {rule.keywords.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{rule.keywords.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No rules match your search.</p>
        </div>
      )}
    </div>
  );
}
