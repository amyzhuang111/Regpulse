import {
  LayoutDashboard,
  AlertTriangle,
  Activity,
  BarChart3,
  BookOpen,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const dashboardNav: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Live Monitor",
    href: "/dashboard/monitor",
    icon: Activity,
  },
  {
    title: "Violations",
    href: "/dashboard/violations",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Rules Library",
    href: "/dashboard/rules",
    icon: BookOpen,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
