import { useLocation, useNavigate } from "react-router";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const routeLabels: Record<string, { label: string; section: string }> = {
  "/overview": { label: "Overview", section: "Risk Insights" },
  "/risk-findings": { label: "Risk Findings", section: "Risk Insights" },
  "/business-entities-risks": { label: "Business Entities Risks", section: "Risk Insights" },
  "/assets-risks": { label: "Assets Risks", section: "Risk Insights" },
  "/business-entities": { label: "Business Entities", section: "Data Management" },
  "/assets": { label: "Assets", section: "Data Management" },
  "/context-events": { label: "Context Events", section: "Data Management" },
  "/manage-users": { label: "Manage Users", section: "User Management" },
  "/notifications": { label: "Notifications", section: "Notifications" },
};

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#A1B2BF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname === "/" ? "/overview" : location.pathname;
  const route = routeLabels[path];
  const colors = useThemeColors();

  if (!route) return null;

  return (
    <nav className="flex items-center gap-[6px] mb-[12px]">
      <button
        onClick={() => navigate("/overview")}
        className="bg-transparent border-none cursor-pointer p-0"
        style={{
          fontFamily: font,
          fontSize: "12px",
          fontWeight: 400,
          color: colors.textMuted,
          letterSpacing: "-0.5px",
          lineHeight: "14px",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block mr-[4px] align-[-2px]">
          <path
            d="M2 5.5L7 1.5L12 5.5V11.5C12 12.0523 11.5523 12.5 11 12.5H3C2.44772 12.5 2 12.0523 2 11.5V5.5Z"
            stroke={colors.textMuted}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5.5 12.5V7.5H8.5V12.5" stroke={colors.textMuted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </button>

      <ChevronIcon />

      <span
        style={{
          fontFamily: font,
          fontSize: "12px",
          fontWeight: 400,
          color: colors.textMuted,
          letterSpacing: "-0.5px",
          lineHeight: "14px",
        }}
      >
        {route.section}
      </span>

      <ChevronIcon />

      <span
        style={{
          fontFamily: font,
          fontSize: "12px",
          fontWeight: 500,
          color: colors.text,
          letterSpacing: "-0.5px",
          lineHeight: "14px",
        }}
      >
        {route.label}
      </span>
    </nav>
  );
}