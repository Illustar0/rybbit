"use client";
import { Funnel, Target } from "@phosphor-icons/react/dist/ssr";
import {
  AlertTriangle,
  ChartColumnDecreasing,
  Earth,
  File,
  Gauge,
  LayoutDashboard,
  LayoutGrid,
  Map,
  MousePointerClick,
  Rewind,
  Settings,
  Split,
  User,
  Video,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetSite } from "../../../../api/admin/sites";
import { SiteSettings } from "../../../../components/SiteSettings/SiteSettings";
import { authClient } from "../../../../lib/auth";
import { IS_CLOUD } from "../../../../lib/const";
import { cn } from "../../../../lib/utils";
import { SiteSelector } from "./SiteSelector";

export function Sidebar() {
  const session = authClient.useSession();
  const pathname = usePathname();

  const { data: site } = useGetSite(Number(pathname.split("/")[1]));

  // Check which tab is active based on the current path
  const getTabPath = (tabName: string) => {
    return `/${pathname.split("/")[1]}/${tabName.toLowerCase()}`;
  };

  const isActiveTab = (tabName: string) => {
    if (!pathname.includes("/")) return false;

    const route = pathname.split("/")[2] || "main";
    return route === tabName.toLowerCase();
  };

  return (
    <div className="w-56 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex flex-col p-3 border-b border-neutral-800">
          <SiteSelector />
        </div>
        <div className="flex flex-col p-3">
          <div className="text-xs text-neutral-400 mt-0 mb-1 mx-3 font-medium">
            Web Analytics
          </div>
          <SidebarLink
            label="Main"
            active={isActiveTab("main")}
            href={getTabPath("main")}
            icon={<LayoutDashboard className="w-4 h-4" />}
          />
          <SidebarLink
            label="Realtime"
            active={isActiveTab("realtime")}
            href={getTabPath("realtime")}
            icon={<Earth className="w-4 h-4" />}
          />

          <SidebarLink
            label="Map"
            active={isActiveTab("map")}
            href={getTabPath("map")}
            icon={<Map className="w-4 h-4" />}
          />
          <SidebarLink
              label="Pages"
              active={isActiveTab("pages")}
              href={getTabPath("pages")}
              icon={<File className="w-4 h-4" />}
          />
          <SidebarLink
              label="Performance"
              active={isActiveTab("performance")}
              href={getTabPath("performance")}
              icon={<Gauge className="w-4 h-4" />}
          />
          <SidebarLink
            label="Goals"
            active={isActiveTab("goals")}
            href={getTabPath("goals")}
            icon={<Target weight="bold" />}
          />
          <div className="text-xs text-neutral-400 mt-3 mb-1 mx-3 font-medium">
            Product Analytics
          </div>
          <div className="hidden md:block">
            <SidebarLink
              label="Replay"
              active={isActiveTab("replay")}
              href={getTabPath("replay")}
              icon={<Video className="w-4 h-4" />}
            />
          </div>
          <SidebarLink
            label="Funnels"
            active={isActiveTab("funnels")}
            href={getTabPath("funnels")}
            icon={<Funnel weight="bold" />}
          />
          <SidebarLink
            label="Journeys"
            active={isActiveTab("journeys")}
            href={getTabPath("journeys")}
            icon={<Split className="w-4 h-4" />}
          />
          <SidebarLink
            label="Retention"
            active={isActiveTab("retention")}
            href={getTabPath("retention")}
            icon={<ChartColumnDecreasing className="w-4 h-4" />}
          />
          <div className="text-xs text-neutral-400 mt-3 mb-1 mx-3 font-medium">
            Behavior
          </div>
          <SidebarLink
            label="Sessions"
            active={isActiveTab("sessions")}
            href={getTabPath("sessions")}
            icon={<Rewind className="w-4 h-4" />}
          />
          <SidebarLink
            label="Users"
            active={isActiveTab("users")}
            href={getTabPath("users")}
            icon={<User className="w-4 h-4" />}
          />
          <SidebarLink
            label="Events"
            active={isActiveTab("events")}
            href={getTabPath("events")}
            icon={<MousePointerClick className="w-4 h-4" />}
          />
          <SidebarLink
            label="Errors"
            active={isActiveTab("errors")}
            href={getTabPath("errors")}
            icon={<AlertTriangle className="w-4 h-4" />}
          />
          {/* <SidebarLink
          label="Reports"
          active={isActiveTab("reports")}
          href={getTabPath("reports")}
          icon={<ChartBarDecreasing className="w-4 h-4" />}
          /> */}
        </div>
      </div>
      {session.data && (
        <div className="flex flex-col p-3">
          <SiteSettings
            siteId={site?.siteId ?? 0}
            trigger={
              <div className="px-3 py-2 rounded-lg transition-colors w-full text-neutral-200 hover:text-white hover:bg-neutral-800/50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Site Settings</span>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}

// Sidebar Link component
function SidebarLink({
  label,
  active = false,
  href,
  icon,
}: {
  label: string;
  active?: boolean;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link href={href} className="focus:outline-none">
      <div
        className={cn(
          "px-3 py-2 rounded-lg transition-colors w-full",
          active
            ? "bg-neutral-800 text-white"
            : "text-neutral-200 hover:text-white hover:bg-neutral-800/50"
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm">{label}</span>
        </div>
      </div>
    </Link>
  );
}
