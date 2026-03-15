import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Breadcrumbs } from "./shared/Breadcrumbs";
import { useTheme, themeColors } from "../context/ThemeContext";
import { useSidebar } from "../context/SidebarContext";

export function Layout() {
  const { theme } = useTheme();
  const colors = themeColors[theme];
  const { isCollapsed } = useSidebar();

  return (
    <div
      className="flex w-full min-h-screen"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: colors.bg,
      }}
    >
      <Sidebar />
      <div
        className="flex flex-col flex-1 transition-all duration-300 ease"
        style={{
          marginLeft: isCollapsed ? "56px" : "200px",
          padding: "14px 20px 20px 25px",
        }}
      >
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
}