import React from "react";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const kpis = [
  { label: "Total Assets", value: "221", change: "+12%", positive: true, icon: "assets", accentColor: "#1B7EFF" },
  { label: "Critical Findings", value: "18", change: "-5%", positive: true, icon: "critical", accentColor: "#D62828" },
  { label: "Open Risks", value: "47", change: "+8%", positive: false, icon: "risks", accentColor: "#F77F00" },
  { label: "Monitored Entities", value: "12", change: "+3%", positive: true, icon: "entities", accentColor: "#04C0B9" },
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

function KPIIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, React.ReactNode> = {
    assets: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 1H3C1.89543 1 1 1.89543 1 3V7C1 8.10457 1.89543 9 3 9H7C8.10457 9 9 8.10457 9 7V3C9 1.89543 8.10457 1 7 1Z" fill={color} />
        <path opacity="0.4" d="M17 1H13C11.8954 1 11 1.89543 11 3V7C11 8.10457 11.8954 9 13 9H17C18.1046 9 19 8.10457 19 7V3C19 1.89543 18.1046 1 17 1Z" fill={color} />
        <path opacity="0.4" d="M7 11H3C1.89543 11 1 11.8954 1 13V17C1 18.1046 1.89543 19 3 19H7C8.10457 19 9 18.1046 9 17V13C9 11.8954 8.10457 11 7 11Z" fill={color} />
        <path opacity="0.2" d="M17 11H13C11.8954 11 11 11.8954 11 13V17C11 18.1046 11.8954 19 13 19H17C18.1046 19 19 18.1046 19 17V13C19 11.8954 18.1046 11 17 11Z" fill={color} />
      </svg>
    ),
    critical: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 17H2L10 2Z" fill={color} />
        <path d="M10 8V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 15.25C10.4142 15.25 10.75 14.9142 10.75 14.5C10.75 14.0858 10.4142 13.75 10 13.75C9.58579 13.75 9.25 14.0858 9.25 14.5C9.25 14.9142 9.58579 15.25 10 15.25Z" fill="white" />
      </svg>
    ),
    risks: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke={color} strokeWidth="2" />
        <path d="M10 6V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5C10.75 13.0858 10.4142 12.75 10 12.75C9.58579 12.75 9.25 13.0858 9.25 13.5C9.25 13.9142 9.58579 14.25 10 14.25Z" fill={color} />
      </svg>
    ),
    entities: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M14 3H6C4.34315 3 3 4.34315 3 6V14C3 15.6569 4.34315 17 6 17H14C15.6569 17 17 15.6569 17 14V6C17 4.34315 15.6569 3 14 3Z" stroke={color} strokeWidth="2" />
        <path d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill={color} />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
}

function KPIWatermark({ type, color }: { type: string; color: string }) {
  const watermarks: Record<string, React.ReactNode> = {
    assets: (
      <svg width="70" height="70" viewBox="0 0 20 20" fill="none">
        <path d="M7 1H3C1.89543 1 1 1.89543 1 3V7C1 8.10457 1.89543 9 3 9H7C8.10457 9 9 8.10457 9 7V3C9 1.89543 8.10457 1 7 1Z" fill={color} />
        <path opacity="0.4" d="M17 1H13C11.8954 1 11 1.89543 11 3V7C11 8.10457 11.8954 9 13 9H17C18.1046 9 19 8.10457 19 7V3C19 1.89543 18.1046 1 17 1Z" fill={color} />
        <path opacity="0.4" d="M7 11H3C1.89543 11 1 11.8954 1 13V17C1 18.1046 1.89543 19 3 19H7C8.10457 19 9 18.1046 9 17V13C9 11.8954 8.10457 11 7 11Z" fill={color} />
        <path opacity="0.2" d="M17 11H13C11.8954 11 11 11.8954 11 13V17C11 18.1046 11.8954 19 13 19H17C18.1046 19 19 18.1046 19 17V13C19 11.8954 18.1046 11 17 11Z" fill={color} />
      </svg>
    ),
    critical: (
      <svg width="70" height="70" viewBox="0 0 56 52.5" fill="none">
        <path d="M28 0L56 52.5H0L28 0Z" fill={color} />
      </svg>
    ),
    risks: (
      <svg width="70" height="70" viewBox="0 0 63 63" fill="none">
        <path d="M31.5 59.5C46.964 59.5 59.5 46.964 59.5 31.5C59.5 16.036 46.964 3.5 31.5 3.5C16.036 3.5 3.5 16.036 3.5 31.5C3.5 46.964 16.036 59.5 31.5 59.5Z" stroke={color} strokeWidth="7" />
      </svg>
    ),
    entities: (
      <svg width="70" height="70" viewBox="0 0 56 56" fill="none">
        <path d="M42 3.5H14C8.20101 3.5 3.5 8.20101 3.5 14V42C3.5 47.799 8.20101 52.5 14 52.5H42C47.799 52.5 52.5 47.799 52.5 42V14C52.5 8.20101 47.799 3.5 42 3.5Z" stroke={color} strokeWidth="7" />
        <path d="M28 38.5C33.799 38.5 38.5 33.799 38.5 28C38.5 22.201 33.799 17.5 28 17.5C22.201 17.5 17.5 22.201 17.5 28C17.5 33.799 22.201 38.5 28 38.5Z" fill={color} />
      </svg>
    ),
  };
  return <>{watermarks[type]}</>;
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
      <div
        className="grid grid-cols-4 rounded-[12px] overflow-hidden"
        style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: `0px 6px 16px 0px rgba(19,37,72,0.14)` }}
      >
        {kpis.map((kpi, idx) => {
          const changeColor = kpi.positive ? "#04C0B9" : "#D62828";
          const changeBg = kpi.positive ? "rgba(4,192,185,0.1)" : "rgba(214,40,40,0.1)";
          const arrow = kpi.positive ? "▲" : "▼";
          return (
            <div
              key={kpi.label}
              className="relative overflow-hidden cursor-pointer transition-all duration-150 ease"
              style={{
                height: 170,
                borderRight: idx < kpis.length - 1 ? `1px solid ${colors.border}` : "none",
              }}
              onClick={() => navigate(kpiLinks[kpi.label])}
            >
              {/* Colored top bar */}
              <div className="absolute top-0 left-0 right-0" style={{ height: 3, backgroundColor: kpi.accentColor }} />

              {/* Watermark icon */}
              <div className="absolute" style={{ right: -16, bottom: -12, opacity: 0.07 }}>
                <KPIWatermark type={kpi.icon} color={kpi.accentColor} />
              </div>

              {/* Content */}
              <div className="relative flex flex-col gap-[20px] h-full pl-[20px] pt-[24px]">
                {/* Icon badge + label */}
                <div className="flex items-center gap-[8px]">
                  <div
                    className="flex items-center justify-center rounded-[8px] shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: `${kpi.accentColor}12`,
                      border: `1px solid ${kpi.accentColor}21`,
                    }}
                  >
                    <KPIIcon type={kpi.icon} color={kpi.accentColor} />
                  </div>
                  <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: "#8F97AC", letterSpacing: "-0.5px", lineHeight: "13px" }}>
                    {kpi.label}
                  </span>
                </div>

                {/* Value */}
                <p className="m-0" style={{ fontFamily: font, fontSize: 40, fontWeight: 700, color: "#001837", letterSpacing: "-1.5px", lineHeight: "40px" }}>
                  {kpi.value}
                </p>

                {/* Change pill + vs last month */}
                <div className="flex items-center gap-[8px]">
                  <span
                    className="inline-flex items-center rounded-[4px] px-[7px] py-[3px]"
                    style={{ backgroundColor: changeBg, fontFamily: font, fontSize: 12, fontWeight: 600, color: changeColor, letterSpacing: "-0.5px", lineHeight: "12px" }}
                  >
                    {arrow} {kpi.change}
                  </span>
                  <span style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: "#8F97AC", letterSpacing: "-0.5px", lineHeight: "18px" }}>
                    vs last month
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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