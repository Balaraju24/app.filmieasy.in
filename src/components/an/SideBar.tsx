import { Link, useRouterState } from "@tanstack/react-router";
import React from "react";
import Logo from "../Icons/Logo";
import DashLogo from "../Icons/Dashboard/DashLogo";
import TeamLogo from "../Icons/Team/TeamLogo";
import ProjLogo from "../Icons/Projects/ProjLogo";
import LocationLogo from "../Icons/Locations/LocationLogo";
import ExpLogo from "../Icons/Expenses/ExpLogo";
import DistLogo from "../Icons/Distributions/DistLogo";
import SettingsLogo from "../Icons/Settings/SettingsLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarTrigger,
} from "../ui/sidebar";

const SidebarItem = ({
  to,
  label,
  icon,
  currentPath,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  currentPath: string;
}) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
        group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
        group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
        ${isActive ? "bg-white/20 text-white" : "hover:bg-white/10"}`}
    >
      {icon}
      <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
        {label}
      </span>
    </Link>
  );
};

const menuItems = [
  { to: "", label: "Dashboard", icon: <DashLogo /> },
  { to: "/projects", label: "Projects", icon: <ProjLogo /> },
  { to: "", label: "Expenses", icon: <ExpLogo /> },
  { to: "/team", label: "Team", icon: <TeamLogo /> },
  { to: "", label: "Location", icon: <LocationLogo /> },
  { to: "", label: "Distribution", icon: <DistLogo /> },
  { to: "", label: "Settings", icon: <SettingsLogo /> },
];

function SideBar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <Sidebar className="text-white p-3 !border-r-0" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center">
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex flex-col py-3">

                {menuItems.map((item) => (
                  <SidebarItem
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                    currentPath={currentPath}
                  />
                ))}

              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="flex items-center justify-center">
        <SidebarTrigger className="-ml-1" />
        <Link
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10  group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
          to="/"
        >
          <span className="group-data-[collapsible=icon]:text-[14px] group-data-[collapsible=icon]:leading-tight">
            Logout
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SideBar;
