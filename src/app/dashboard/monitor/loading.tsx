export default function MonitorLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-7 w-36 rounded bg-muted" />
        <div className="mt-2 h-4 w-72 rounded bg-muted" />
      </div>
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <div className="h-10 w-36 rounded-lg bg-muted" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-4 h-64 rounded bg-muted" />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="mt-4 h-64 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
