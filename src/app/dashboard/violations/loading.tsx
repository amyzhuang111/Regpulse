export default function ViolationsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-7 w-32 rounded bg-muted" />
          <div className="mt-2 h-4 w-56 rounded bg-muted" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-muted" />
      </div>
      <div className="flex gap-3">
        <div className="h-9 flex-1 rounded-lg bg-muted" />
        <div className="h-9 w-36 rounded-lg bg-muted" />
        <div className="h-9 w-36 rounded-lg bg-muted" />
      </div>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <div className="h-3 w-full rounded bg-muted" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
              <div className="h-5 w-16 rounded-full bg-muted" />
              <div className="h-5 w-16 rounded-full bg-muted" />
              <div className="h-3 w-12 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
