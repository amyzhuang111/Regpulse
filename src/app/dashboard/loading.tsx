export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-7 w-40 rounded bg-muted" />
        <div className="mt-2 h-4 w-64 rounded bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-4 rounded bg-muted" />
            </div>
            <div className="mt-3 h-7 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="h-5 w-48 rounded bg-muted" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="h-2 flex-1 rounded-full bg-muted" />
              <div className="h-3 w-8 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
