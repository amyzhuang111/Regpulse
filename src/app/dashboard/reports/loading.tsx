export default function ReportsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-7 w-28 rounded bg-muted" />
          <div className="mt-2 h-4 w-56 rounded bg-muted" />
        </div>
        <div className="h-9 w-36 rounded-lg bg-muted" />
      </div>
      <div className="divide-y divide-border rounded-xl border border-border bg-card">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className="h-10 w-10 rounded-lg bg-muted" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-48 rounded bg-muted" />
              <div className="h-3 w-36 rounded bg-muted" />
            </div>
            <div className="h-5 w-10 rounded bg-muted" />
            <div className="h-8 w-8 rounded-lg bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
