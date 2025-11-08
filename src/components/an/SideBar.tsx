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

function SideBar() {
    const router = useRouterState();
  const currentPath = router.location.pathname;
  
  return (
    <Sidebar className=" text-white p-3 !border-r-0" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center">
        <Logo />
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex flex-col py-3">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/dashboard"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <DashLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    Dashboard
                  </span>
                </Link>
                <Link
                  to="/projects"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/projects"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <ProjLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    Projects
                  </span>
                </Link>
                <Link
                  to="/expenses"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/expenses"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <ExpLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    Expenses
                  </span>
                </Link>
                <Link
                  to="/team"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/team"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <TeamLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    Team
                  </span>
                </Link>
                <Link
                  to="/location"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/location"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <LocationLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    Location
                  </span>
                </Link>
                <Link
                  to="/distrbution"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/distrbution"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <DistLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    distrbution
                  </span>
                </Link>
<Link
                  to="/settings"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
                    group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-1 
                    group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2
                    ${
                      currentPath === "/settings"
                        ? "bg-white/20 text-white"
                        : "hover:bg-white/10"
                    }`} >
                  <SettingsLogo />
                  <span className="group-data-[collapsible=icon]:text-[10px] group-data-[collapsible=icon]:leading-tight">
                    Settings
                  </span>
                </Link>
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
