"use client";

import { useSession } from "next-auth/react";
import { User, Bell, Palette, Plug } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              defaultValue={session?.user?.name ?? "Demo User"}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              defaultValue={session?.user?.email ?? "demo@regpulse.ai"}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              disabled
            />
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: "Critical violation alerts", desc: "Get notified immediately for critical violations", defaultChecked: true },
            { label: "Daily compliance digest", desc: "Summary of daily compliance activity", defaultChecked: true },
            { label: "Weekly reports", desc: "Automated weekly compliance reports", defaultChecked: false },
          ].map((item) => (
            <label key={item.label} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="mt-1 h-4 w-4 rounded border-input text-primary accent-primary"
              />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Appearance</h2>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Theme</label>
          <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm sm:w-48">
            <option>System</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
      </div>

      {/* Integrations */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Plug className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Integrations</h2>
        </div>
        <div className="space-y-3">
          {[
            { name: "Supabase", status: "Configure API keys in .env" },
            { name: "OpenAI", status: "Configure API key in .env" },
            { name: "Vapi", status: "Configure API key in .env" },
          ].map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p className="text-sm font-medium">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.status}</p>
              </div>
              <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-500 border border-yellow-500/20">
                Not connected
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
