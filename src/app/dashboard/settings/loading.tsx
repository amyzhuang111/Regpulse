export default function SettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-7 w-28 rounded bg-muted" />
        <div className="mt-2 h-4 w-48 rounded bg-muted" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-5 rounded bg-muted" />
            <div className="h-5 w-28 rounded bg-muted" />
          </div>
          <div className="space-y-4">
            <div className="h-9 w-full rounded-lg bg-muted sm:w-1/2" />
            <div className="h-9 w-full rounded-lg bg-muted sm:w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
