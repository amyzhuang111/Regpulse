export default function AnalyticsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-7 w-32 rounded bg-muted" />
        <div className="mt-2 h-4 w-56 rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="mt-3 h-7 w-16 rounded bg-muted" />
            <div className="mt-2 h-3 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="h-5 w-40 rounded bg-muted" />
        <div className="mt-4 h-48 rounded bg-muted" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-5 w-44 rounded bg-muted" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 rounded-full bg-muted" />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-5 w-40 rounded bg-muted" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-3 rounded-full bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
