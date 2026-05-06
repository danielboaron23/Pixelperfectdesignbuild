import React from "react";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const kpis = [
  { label: "Total Assets", value: "221", change: "+12%", positive: true, icon: "assets" },
  { label: "Critical Findings", value: "18", change: "-5%", positive: true, icon: "critical" },
  { label: "Open Risks", value: "47", change: "+8%", positive: false, icon: "risks" },
  { label: "Monitored Entities", value: "12", change: "+3%", positive: true, icon: "entities" },
];

const lineData = [
  { id: "oct", month: "Oct", critical: 12, high: 28 },
  { id: "nov", month: "Nov", critical: 15, high: 32 },
  { id: "dec", month: "Dec", critical: 10, high: 25 },
  { id: "jan", month: "Jan", critical: 18, high: 35 },
  { id: "feb", month: "Feb", critical: 14, high: 30 },
  { id: "mar", month: "Mar", critical: 18, high: 27 },
];

const pieData = [
  { id: "storage", name: "Storage", value: 52, color: "#1B7EFF" },
  { id: "endpoint", name: "Endpoint", value: 20, color: "#F77F00" },
  { id: "server", name: "Server", value: 18, color: "#04C0B9" },
  { id: "application", name: "Application", value: 10, color: "#8B5CF6" },
];

const recentFindings = [
  { id: 1, severity: "Critical", name: "Unencrypted S3 Bucket", asset: "CO-STR-07", time: "2 hours ago" },
  { id: 2, severity: "High", name: "Exposed API Gateway", asset: "MS-WKS-14", time: "4 hours ago" },
  { id: 3, severity: "Critical", name: "Outdated TLS Configuration", asset: "API-GW-03", time: "6 hours ago" },
  { id: 4, severity: "High", name: "Open SSH Port", asset: "SRV-DB-01", time: "8 hours ago" },
  { id: 5, severity: "High", name: "Weak Password Policy", asset: "AD-SRV-02", time: "12 hours ago" },
];

function KPIIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    assets: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="8" height="8" rx="2" fill="#1B7EFF" />
        <rect x="11" y="1" width="8" height="8" rx="2" fill="#1B7EFF" opacity="0.4" />
        <rect x="1" y="11" width="8" height="8" rx="2" fill="#1B7EFF" opacity="0.4" />
        <rect x="11" y="11" width="8" height="8" rx="2" fill="#1B7EFF" opacity="0.2" />
      </svg>
    ),
    critical: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 17H2L10 2Z" fill="#D62828" />
        <path d="M10 8V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14.5" r="0.75" fill="white" />
      </svg>
    ),
    risks: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#F77F00" strokeWidth="2" />
        <path d="M10 6V11" stroke="#F77F00" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="13.5" r="0.75" fill="#F77F00" />
      </svg>
    ),
    entities: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="3" stroke="#04C0B9" strokeWidth="2" />
        <circle cx="10" cy="10" r="3" fill="#04C0B9" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Critical: { bg: "#D62828", color: "#FFFFFF" },
    High: { bg: "#F77F00", color: "#FFFFFF" },
    Medium: { bg: "#FEF3C7", color: "#92400E" },
    Low: { bg: "#ECF0F5", color: "#474E62" },
  };
  const s = styles[severity] || styles.Low;
  return (
    <span
      className="inline-flex items-center px-[8px] py-[2px] rounded-[4px] whitespace-nowrap"
      style={{ backgroundColor: s.bg, fontFamily: font, fontSize: "12px", fontWeight: 500, color: s.color, letterSpacing: "-0.5px", lineHeight: "16px" }}
    >
      {severity}
    </span>
  );
}

function RiskFindingsLineChart({ colors }: { colors: any }) {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={lineData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid key="grid" strokeDasharray="3 3" stroke={colors.border} />
          <XAxis
            key="xaxis"
            dataKey="month"
            tick={{ fontSize: 12, fill: colors.textMuted, fontFamily: font }}
            axisLine={{ stroke: colors.border }}
            tickLine={false}
          />
          <YAxis
            key="yaxis"
            tick={{ fontSize: 12, fill: colors.textMuted, fontFamily: font }}
            axisLine={{ stroke: colors.border }}
            tickLine={false}
          />
          <Tooltip
            key="tooltip"
            contentStyle={{
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              fontFamily: font,
              fontSize: "12px",
              boxShadow: colors.shadowMenu,
            }}
          />
          <Line
            key="critical"
            type="monotone"
            dataKey="critical"
            stroke="#D62828"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#D62828" }}
            name="Critical"
            isAnimationActive={false}
          />
          <Line
            key="high"
            type="monotone"
            dataKey="high"
            stroke="#F77F00"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#F77F00" }}
            name="High"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AssetsPieChart({ colors }: { colors: any }) {
  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            key="pie"
            data={pieData}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={80}
            dataKey="value"
            paddingAngle={2}
            nameKey="name"
            isAnimationActive={false}
          >
            {pieData.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            key="legend"
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value: string, entry: any) => (
              <span style={{ fontFamily: font, fontSize: "12px", color: colors.textSecondary, letterSpacing: "-0.5px" }}>
                {value} {entry.payload.value}%
              </span>
            )}
          />
          <Tooltip
            key="tooltip"
            contentStyle={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, borderRadius: "8px", fontFamily: font, fontSize: "12px" }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OverviewPage() {
  const navigate = useNavigate();
  const colors = useThemeColors();

  const kpiLinks: Record<string, string> = {
    "Total Assets": "/assets",
    "Critical Findings": "/risk-findings",
    "Open Risks": "/assets-risks",
    "Monitored Entities": "/business-entities",
  };

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Page Title */}
      <h3
        className="m-0"
        style={{ fontFamily: font, fontSize: "20px", fontWeight: 700, color: colors.text, lineHeight: "100%", letterSpacing: "-0.5px" }}
      >
        Overview
      </h3>

      {/* KPI Cards */}
      {(() => {
        const accentColors: Record<string, string> = {
          "Total Assets": "#1B7EFF",
          "Critical Findings": "#D62828",
          "Open Risks": "#F77F00",
          "Monitored Entities": "#04C0B9",
        };
        const bgAccents: Record<string, string> = {
          "Total Assets": "rgba(27,126,255,0.07)",
          "Critical Findings": "rgba(214,40,40,0.07)",
          "Open Risks": "rgba(247,127,0,0.07)",
          "Monitored Entities": "rgba(4,192,185,0.07)",
        };
        return (
          <div
            className="rounded-[12px] overflow-hidden flex"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
          >
            {kpis.map((kpi, i) => {
              const accent = accentColors[kpi.label] ?? "#1B7EFF";
              const bgAccent = bgAccents[kpi.label] ?? "transparent";
              const isLast = i === kpis.length - 1;
              return (
                <div
                  key={kpi.label}
                  className="flex-1 relative flex flex-col justify-between cursor-pointer transition-all duration-200 ease overflow-hidden"
                  style={{
                    padding: "0",
                    borderRight: isLast ? "none" : `1px solid ${colors.border}`,
                  }}
                  onClick={() => navigate(kpiLinks[kpi.label])}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = bgAccent; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
                >
                  {/* Colored top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{ height: "3px", backgroundColor: accent }}
                  />

                  {/* Large watermark icon */}
                  <div
                    className="absolute bottom-[-8px] right-[-4px] pointer-events-none"
                    style={{ opacity: 0.07 }}
                  >
                    <div style={{ transform: "scale(3.5)", transformOrigin: "bottom right" }}>
                      <KPIIcon type={kpi.icon} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-col gap-[20px] p-[20px] pt-[24px]">
                    {/* Label + icon row */}
                    <div className="flex items-center gap-[8px]">
                      <div
                        className="flex items-center justify-center rounded-[8px] shrink-0"
                        style={{ width: "28px", height: "28px", backgroundColor: bgAccents[kpi.label] ?? "transparent", border: `1px solid ${accent}22` }}
                      >
                        <KPIIcon type={kpi.icon} />
                      </div>
                      <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 500, color: colors.textMuted, letterSpacing: "-0.5px", lineHeight: "1" }}>
                        {kpi.label}
                      </span>
                    </div>

                    {/* Big number */}
                    <div className="flex flex-col gap-[4px]">
                      <span
                        style={{
                          fontFamily: font,
                          fontSize: "40px",
                          fontWeight: 700,
                          color: colors.text,
                          letterSpacing: "-1.5px",
                          lineHeight: "1",
                        }}
                      >
                        {kpi.value}
                      </span>
                    </div>

                    {/* Bottom: change badge + vs label */}
                    <div className="flex items-center gap-[8px]">
                      <span
                        className="inline-flex items-center gap-[3px] rounded-[4px] px-[7px] py-[3px]"
                        style={{
                          fontFamily: font,
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "-0.5px",
                          lineHeight: "1",
                          color: kpi.positive ? "#04C0B9" : "#D62828",
                          backgroundColor: kpi.positive ? "rgba(4,192,185,0.10)" : "rgba(214,40,40,0.10)",
                        }}
                      >
                        {kpi.positive ? "▲" : "▼"} {kpi.change}
                      </span>
                      <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px" }}>
                        vs last month
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Charts Row */}
      <div className="grid grid-cols-[2fr_1fr] gap-[16px]">
        {/* Line Chart */}
        <div
          className="rounded-[12px] p-[16px] flex flex-col gap-[16px]"
          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
        >
          <span style={{ fontFamily: font, fontSize: "16px", fontWeight: 500, color: colors.text, letterSpacing: "-0.32px" }}>
            Risk Findings Over Time
          </span>
          <RiskFindingsLineChart colors={colors} />
        </div>

        {/* Pie Chart */}
        <div
          className="rounded-[12px] p-[16px] flex flex-col gap-[16px]"
          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
        >
          <span style={{ fontFamily: font, fontSize: "16px", fontWeight: 500, color: colors.text, letterSpacing: "-0.32px" }}>
            Assets by Type
          </span>
          <AssetsPieChart colors={colors} />
        </div>
      </div>

      {/* Recent Risk Findings Table */}
      <div
        className="rounded-[12px] overflow-hidden"
        style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
      >
        <div className="p-[16px] pb-[8px]">
          <span style={{ fontFamily: font, fontSize: "16px", fontWeight: 500, color: colors.text, letterSpacing: "-0.32px" }}>
            Recent Risk Findings
          </span>
        </div>
        {/* Header */}
        <div className="flex items-center px-[16px]" style={{ backgroundColor: colors.bgSecondary, height: "30px" }}>
          <div className="w-[100px]"><span style={{ fontFamily: font, fontSize: "12px", color: colors.textMuted, letterSpacing: "-0.5px" }}>Severity</span></div>
          <div className="flex-1"><span style={{ fontFamily: font, fontSize: "12px", color: colors.textMuted, letterSpacing: "-0.5px" }}>Finding Name</span></div>
          <div className="w-[140px]"><span style={{ fontFamily: font, fontSize: "12px", color: colors.textMuted, letterSpacing: "-0.5px" }}>Affected Asset</span></div>
          <div className="w-[120px]"><span style={{ fontFamily: font, fontSize: "12px", color: colors.textMuted, letterSpacing: "-0.5px" }}>Time Ago</span></div>
        </div>
        {/* Rows */}
        {recentFindings.map((f) => (
          <div key={f.id} className="flex items-center px-[16px] transition-colors duration-150 ease" style={{ height: "42px", borderTop: `1px solid ${colors.border}` }}>
            <div className="w-[100px]"><SeverityBadge severity={f.severity} /></div>
            <div className="flex-1">
              <span
                onClick={() => navigate("/risk-findings")}
                style={{ fontFamily: font, fontSize: "14px", color: colors.textSecondary, letterSpacing: "-0.5px", cursor: "pointer" }}
                className="hover:underline"
              >
                {f.name}
              </span>
            </div>
            <div className="w-[140px]">
              <span
                onClick={() => navigate("/assets")}
                style={{ fontFamily: font, fontSize: "14px", color: colors.textBrand, letterSpacing: "-0.5px", cursor: "pointer" }}
                className="hover:underline"
              >
                {f.asset}
              </span>
            </div>
            <div className="w-[120px]"><span style={{ fontFamily: font, fontSize: "12px", color: colors.textMuted, letterSpacing: "-0.5px" }}>{f.time}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}