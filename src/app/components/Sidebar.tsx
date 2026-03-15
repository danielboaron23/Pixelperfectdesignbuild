import React from "react";
import { useLocation, useNavigate } from "react-router";
import svgPaths from "../../imports/svg-8hpunv596b";
import { useTheme, themeColors } from "../context/ThemeContext";
import { useSidebar } from "../context/SidebarContext";

function Logo({ isCollapsed }: { isCollapsed: boolean }) {
  if (isCollapsed) {
    return (
      <div className="relative shrink-0 w-full flex justify-center items-center h-[18px]">
        <div className="w-[24px] h-[18px]">
          <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 18">
            <path d="M12 0L0 18H24L12 0Z" fill="#1B7EFF" />
            <path d="M12 6V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1" fill="white" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center w-full">
        <div className="flex items-center justify-between pl-[16px] pr-[8px] w-full">
          <div className="h-[18px] relative shrink-0 w-[139px]">
            <svg
              className="block w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 139.195 17.9583"
            >
              <g clipPath="url(#clip0_logo)" id="Layer_1">
                <path d={svgPaths.p2771ab00} fill="white" />
                <path d={svgPaths.p3b06c400} fill="white" />
                <path d={svgPaths.p3dae5200} fill="white" />
                <path d={svgPaths.p327f5900} fill="white" />
                <path d={svgPaths.p29aa7400} fill="white" />
                <path d={svgPaths.p62f4f80} fill="white" />
                <path d={svgPaths.p30873a00} fill="white" />
                <path d={svgPaths.p4aa9e80} fill="white" />
                <path d={svgPaths.p1833f170} fill="white" />
                <g>
                  <path d={svgPaths.p3741d680} fill="white" />
                  <path d={svgPaths.p27802f00} fill="#1B7EFF" />
                  <path d={svgPaths.p3783b5f0} fill="#1B7EFF" />
                  <path d={svgPaths.pd89fa00} fill="#1B7EFF" />
                  <path d={svgPaths.p23a75f00} fill="#1B7EFF" />
                  <path d={svgPaths.p71e4d00} fill="#1B7EFF" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_logo">
                  <rect fill="white" height="17.9583" width="139.195" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceSelector() {
  return (
    <div className="relative rounded-[6px] shrink-0 w-full">
      <div className="relative h-[32px] rounded-[6px] w-full">
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]"
        />
        <div className="flex items-center justify-between px-[8px] py-[4px] h-full cursor-pointer transition-colors duration-150 ease hover:bg-[rgba(255,255,255,0.08)] rounded-[6px]">
          <div className="flex gap-[8px] items-center">
            <div className="relative shrink-0 w-[20px] h-[20px]">
              <svg className="block w-full h-full" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" fill="#04C0B9" r="10" />
                <g clipPath="url(#clip_ws)">
                  <path d={svgPaths.p2439d900} fill="url(#ws_grad1)" />
                  <path d={svgPaths.p2c5fdd80} fill="url(#ws_grad2)" />
                </g>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="ws_grad1" x1="5.78" x2="20.09" y1="5.95" y2="5.96">
                    <stop stopColor="#FBFDFF" />
                    <stop offset="1" stopColor="#1CFBF3" />
                  </linearGradient>
                  <linearGradient gradientUnits="userSpaceOnUse" id="ws_grad2" x1="3.33" x2="25.85" y1="12.04" y2="12.06">
                    <stop stopColor="#FBFDFF" />
                    <stop offset="1" stopColor="#1CFBF3" />
                  </linearGradient>
                  <clipPath id="clip_ws">
                    <rect fill="white" height="15" transform="translate(3.333 2.5)" width="13.333" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span
              className="text-[14px] text-[#8f97ac] whitespace-nowrap"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                letterSpacing: "-0.5px",
                lineHeight: "normal",
              }}
            >
              SentraGuard
            </span>
          </div>
          <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 8.326 4.978">
            <path d={svgPaths.p3d861600} fill="#8F97AC" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path: string;
  onClick: () => void;
  isCollapsed?: boolean;
}

function NavItem({ icon, label, active = false, onClick, isCollapsed = false }: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer transition-colors duration-150 ease ${
        active ? "bg-[rgba(27,126,255,0.15)]" : "hover:bg-[rgba(255,255,255,0.08)]"
      }`}
      title={isCollapsed ? label : undefined}
    >
      <div className="flex items-center h-[36px] w-full">
        <div className={`flex gap-[12px] items-center w-full ${active ? "pl-[1.5px] pr-[8px]" : "p-[8px]"} ${isCollapsed ? "justify-center" : ""}`}>
          {active && !isCollapsed && (
            <div className="flex h-[20px] items-center justify-center shrink-0 w-0">
              <div className="-rotate-90 flex-none">
                <div className="h-0 relative w-[20px]">
                  <svg className="block w-[20px] h-[1.5px]" fill="none" viewBox="0 0 20 1.5">
                    <line
                      stroke="#1B7EFF"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      x1="0.75"
                      x2="19.25"
                      y1="0.75"
                      y2="0.75"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <div className="relative shrink-0 w-[20px] h-[20px]">{icon}</div>
          {!isCollapsed && (
            <span
              className={`whitespace-nowrap ${active ? "text-white" : "text-[#8f97ac] opacity-80"}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: active ? 600 : 400,
                letterSpacing: "-0.5px",
                lineHeight: "normal",
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <svg className="block w-full h-[1px]" fill="none" preserveAspectRatio="none" viewBox="0 0 168 1">
        <line stroke="white" strokeOpacity="0.08" x2="168" y1="0.5" y2="0.5" />
      </svg>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      className="text-[#8f97ac] whitespace-nowrap"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "-0.5px",
        lineHeight: "normal",
      }}
    >
      {children}
    </span>
  );
}

// Icon components
function OverviewIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <svg className="absolute block w-full h-full" fill="none" viewBox="0 0 16.15 16.15">
      <path d={svgPaths.p301d3600} fill={color} />
    </svg>
  );
}

function RiskFindingsIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <svg className="absolute block w-full h-full" fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p34e86d00} fill={color} />
    </svg>
  );
}

function BusinessEntitiesIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <div className="absolute inset-[10%]">
      <svg className="block w-full h-full" fill="none" viewBox="0 0 16 16">
        <path d={svgPaths.p1cdd1980} fill={color} />
      </svg>
    </div>
  );
}

function AssetsIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <>
      <div className="absolute inset-[10%_8%_10%_8%]">
        <svg className="block w-full h-full" fill="none" viewBox="0 0 16.8066 16">
          <path d={svgPaths.pc73fb00} fill={color} />
        </svg>
      </div>
      <svg className="absolute block w-full h-full" fill="none" viewBox="0 0 32 32">
        <path d="M20 0H0V20H20V0Z" fill={color} opacity="0" />
      </svg>
    </>
  );
}

function ContextEventsIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <div className="absolute left-[calc(50%+0.2px)] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[14.727px] h-[18px]">
      <svg className="block w-full h-full" fill="none" viewBox="0 0 14.7269 18">
        <path d={svgPaths.p11d85b80} fill={color} />
      </svg>
    </div>
  );
}

function ManageUsersIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <div className="absolute left-[calc(50%+0.13px)] top-[calc(50%+0.22px)] -translate-x-1/2 -translate-y-1/2 w-[17.682px] h-[18px]">
      <svg className="block w-full h-full" fill="none" viewBox="0 0 17.6816 18">
        <path d={svgPaths.p27640b72} fill={color} />
      </svg>
    </div>
  );
}

function NotificationsIcon({ active }: { active?: boolean }) {
  const color = active ? "#FFFFFF" : "#A1B2BF";
  return (
    <div className="absolute inset-[9.38%_16.67%]">
      <svg className="block w-full h-full" fill="none" viewBox="0 0 13.3333 16.25">
        <path d={svgPaths.p2ca43a00} fill={color} />
      </svg>
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/overview") return currentPath === path || currentPath === "/";
    return currentPath === path;
  };

  return (
    <div
      className="fixed left-0 top-0 h-full flex flex-col z-[50] transition-all duration-300 ease"
      style={{ backgroundColor: "#001837", width: isCollapsed ? "56px" : "200px" }}
    >
      {/* Toggle Button */}
      <div className={`absolute top-[16px] ${isCollapsed ? "right-[-12px]" : "right-[-12px]"} z-10`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-[24px] h-[24px] rounded-full bg-[#001837] border border-[rgba(255,255,255,0.2)] flex items-center justify-center cursor-pointer transition-all duration-150 ease hover:bg-[rgba(255,255,255,0.08)] hover:border-[#1B7EFF]"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="w-[12px] h-[12px] transition-transform duration-300 ease" fill="none" viewBox="0 0 12 12" style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}>
            <path d="M7.5 3L4.5 6L7.5 9" stroke="#A1B2BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={`flex flex-col gap-[12px] p-[16px] flex-1 ${isCollapsed ? "px-[8px]" : "px-[12px]"} py-[16px] m-[0px] overflow-hidden`}>
        {/* Logo */}
        <Logo isCollapsed={isCollapsed} />

        {/* Workspace selector */}
        {!isCollapsed && <WorkspaceSelector />}
        {isCollapsed && <div className="h-[8px]" />}

        <Divider />

        {/* Risk Insights */}
        <div className="flex flex-col gap-[12px] items-start w-full">
          {!isCollapsed && <SectionLabel>Risk Insights</SectionLabel>}
          <div className="flex flex-col gap-[4px] items-start w-full">
            <NavItem
              icon={<OverviewIcon active={isActive("/overview")} />}
              label="Overview"
              active={isActive("/overview")}
              path="/overview"
              onClick={() => navigate("/overview")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={
                <div className="absolute left-1/2 top-[calc(50%-0.06px)] -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px]">
                  <RiskFindingsIcon active={isActive("/risk-findings")} />
                </div>
              }
              label="Risk Findings"
              active={isActive("/risk-findings")}
              path="/risk-findings"
              onClick={() => navigate("/risk-findings")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<BusinessEntitiesIcon active={isActive("/business-entities-risks")} />}
              label="Business Entities Risks"
              active={isActive("/business-entities-risks")}
              path="/business-entities-risks"
              onClick={() => navigate("/business-entities-risks")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<AssetsIcon active={isActive("/assets-risks")} />}
              label="Assets Risks"
              active={isActive("/assets-risks")}
              path="/assets-risks"
              onClick={() => navigate("/assets-risks")}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>

        <Divider />

        {/* Data Management */}
        <div className="flex flex-col gap-[12px] items-start w-full">
          {!isCollapsed && <SectionLabel>Data Management</SectionLabel>}
          <div className="flex flex-col gap-[4px] items-start w-full">
            <NavItem
              icon={<BusinessEntitiesIcon active={isActive("/business-entities")} />}
              label="Business Entities"
              active={isActive("/business-entities")}
              path="/business-entities"
              onClick={() => navigate("/business-entities")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<AssetsIcon active={isActive("/assets")} />}
              label="Assets"
              active={isActive("/assets")}
              path="/assets"
              onClick={() => navigate("/assets")}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<ContextEventsIcon active={isActive("/context-events")} />}
              label="Context Events"
              active={isActive("/context-events")}
              path="/context-events"
              onClick={() => navigate("/context-events")}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>

        <Divider />

        {/* User Management */}
        <div className="flex flex-col gap-[12px] items-start w-full">
          {!isCollapsed && <SectionLabel>User Management</SectionLabel>}
          <div className="flex flex-col gap-[4px] items-start w-full">
            <NavItem
              icon={<ManageUsersIcon active={isActive("/manage-users")} />}
              label="Manage Users"
              active={isActive("/manage-users")}
              path="/manage-users"
              onClick={() => navigate("/manage-users")}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>

      {/* Notifications at bottom */}
      <div className={`${isCollapsed ? "p-[8px]" : "p-[16px]"} pb-0`}>
        <NavItem
          icon={
            <div className="overflow-clip relative w-full h-full">
              <NotificationsIcon active={isActive("/notifications")} />
            </div>
          }
          label="Notifications"
          active={isActive("/notifications")}
          path="/notifications"
          onClick={() => navigate("/notifications")}
          isCollapsed={isCollapsed}
        />
      </div>

      {/* Dark Mode Toggle */}
      <div className={`${isCollapsed ? "p-[8px]" : "p-[16px]"} pt-[8px]`}>
        <div
          onClick={toggleTheme}
          className="relative rounded-[6px] shrink-0 w-full cursor-pointer transition-colors duration-150 ease hover:bg-[rgba(255,255,255,0.08)]"
          title={isCollapsed ? (theme === "light" ? "Dark Mode" : "Light Mode") : undefined}
        >
          <div className="flex items-center h-[36px] w-full">
            <div className={`flex gap-[12px] items-center w-full p-[8px] ${isCollapsed ? "justify-center" : ""}`}>
              <div className="relative shrink-0 w-[20px] h-[20px]">
                {theme === "light" ? (
                  <svg className="absolute block w-full h-full" fill="none" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="4" fill="#A1B2BF" />
                    <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="#A1B2BF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="absolute block w-full h-full" fill="none" viewBox="0 0 20 20">
                    <path d="M17 10.5C17 14.09 14.09 17 10.5 17C6.91 17 4 14.09 4 10.5C4 6.91 6.91 4 10.5 4C10.66 4 10.82 4.01 10.98 4.02C9.58 5.2 8.67 7 8.67 9C8.67 12.31 11.36 15 14.67 15C15.95 15 17.12 14.58 18.08 13.88C17.67 15.87 16.73 17 15.5 17C15.5 17 17 14.5 17 10.5Z" fill="#A1B2BF" />
                  </svg>
                )}
              </div>
              {!isCollapsed && (
                <span
                  className="whitespace-nowrap text-[#8f97ac] opacity-80"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "-0.5px",
                    lineHeight: "normal",
                  }}
                >
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}