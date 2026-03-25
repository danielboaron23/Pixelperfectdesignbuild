import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DataTable, Badge } from "../shared/DataTable";
import { useThemeColors } from "../../hooks/useThemeColors";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const font = "'DM Sans', sans-serif";

// ── Mock Data ──────────────────────────────────────────────────────────

const users = [
  { id: "1", name: "Sarah Cohen", email: "sarah.cohen@sentraguard.io", role: "Admin", lastLogin: "03/05/26 14:32", status: "Active", department: "Security Operations", location: "Tel Aviv, IL", joinedDate: "Jan 15, 2024" },
  { id: "2", name: "Michael Levy", email: "michael.levy@sentraguard.io", role: "Admin", lastLogin: "03/05/26 10:15", status: "Active", department: "Engineering", location: "Tel Aviv, IL", joinedDate: "Mar 22, 2024" },
  { id: "3", name: "Tamar Friedman", email: "tamar.friedman@sentraguard.io", role: "Editor", lastLogin: "03/04/26 18:45", status: "Active", department: "DevOps", location: "Haifa, IL", joinedDate: "Jun 10, 2024" },
  { id: "4", name: "David Katz", email: "david.katz@sentraguard.io", role: "Editor", lastLogin: "03/03/26 09:22", status: "Active", department: "IT Operations", location: "Jerusalem, IL", joinedDate: "Aug 5, 2024" },
  { id: "5", name: "Yael Mizrahi", email: "yael.mizrahi@sentraguard.io", role: "Viewer", lastLogin: "03/01/26 16:08", status: "Active", department: "Compliance", location: "Tel Aviv, IL", joinedDate: "Sep 18, 2024" },
  { id: "6", name: "Noam Shapira", email: "noam.shapira@sentraguard.io", role: "Viewer", lastLogin: "Never", status: "Invited", department: "Risk Management", location: "Beer Sheva, IL", joinedDate: "Mar 01, 2026" },
  { id: "7", name: "Rina Goldberg", email: "rina.goldberg@sentraguard.io", role: "Editor", lastLogin: "02/20/26 11:30", status: "Disabled", department: "Security Operations", location: "Tel Aviv, IL", joinedDate: "Apr 12, 2024" },
  { id: "8", name: "Eitan Ben-Ari", email: "eitan.benari@sentraguard.io", role: "Viewer", lastLogin: "Never", status: "Invited", department: "Engineering", location: "Ramat Gan, IL", joinedDate: "Feb 28, 2026" },
];

const roleStyles: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "#EDE9FE", color: "#7C3AED" },
  Editor: { bg: "#D4E7FF", color: "#1B7EFF" },
  Viewer: { bg: "#ECF0F5", color: "#8F97AC" },
};

const statusStyles: Record<string, { bg: string; color: string }> = {
  Active: { bg: "#D1FAE5", color: "#059669" },
  Invited: { bg: "#FEF3C7", color: "#92400E" },
  Disabled: { bg: "#ECF0F5", color: "#8F97AC" },
};

const roleAccentColors: Record<string, string> = {
  Admin: "#7C3AED",
  Editor: "#1B7EFF",
  Viewer: "#8F97AC",
};

const avatarColors = ["#1B7EFF", "#04C0B9", "#F77F00", "#8B5CF6", "#D62828", "#059669", "#EC4899", "#6366F1"];

const permissions: Record<string, Record<string, boolean>> = {
  Admin: { "View risk findings": true, "Edit risk findings": true, "Manage assets": true, "Manage users": true, "System configuration": true, "Export data": true, "View audit logs": true, "Delete records": true },
  Editor: { "View risk findings": true, "Edit risk findings": true, "Manage assets": true, "Manage users": false, "System configuration": false, "Export data": true, "View audit logs": true, "Delete records": false },
  Viewer: { "View risk findings": true, "Edit risk findings": false, "Manage assets": false, "Manage users": false, "System configuration": false, "Export data": false, "View audit logs": true, "Delete records": false },
};

const activityData = [
  { id: 1, action: "Resolved finding 'Open SSH Port' on SRV-DB-01", time: "2 hours ago", type: "resolved" },
  { id: 2, action: "Reviewed risk assessment for Cloud Infrastructure", time: "5 hours ago", type: "review" },
  { id: 3, action: "Updated asset configuration for API-GW-03", time: "Yesterday", type: "config" },
  { id: 4, action: "Assigned 3 findings to David Katz", time: "Yesterday", type: "review" },
  { id: 5, action: "Logged in from new device (Chrome / macOS)", time: "2 days ago", type: "login" },
  { id: 6, action: "Exported risk report for Finance Division", time: "3 days ago", type: "config" },
];

const activityColors: Record<string, string> = {
  resolved: "#059669",
  review: "#1B7EFF",
  config: "#F77F00",
  login: "#8F97AC",
};

const accessScopes = [
  { name: "Finance Division", level: "Full Access" },
  { name: "Cloud Infrastructure", level: "Full Access" },
  { name: "Payment Systems", level: "Read Only" },
  { name: "HR Systems", level: "No Access" },
];

const managedAssets = [
  { id: "1", name: "SRV-DB-01", type: "Server", riskLevel: "Critical", lastScan: "03/05/26" },
  { id: "2", name: "API-GW-03", type: "Application", riskLevel: "High", lastScan: "03/04/26" },
  { id: "3", name: "CO-STR-07", type: "Storage", riskLevel: "Medium", lastScan: "03/04/26" },
  { id: "4", name: "MS-WKS-14", type: "Endpoint", riskLevel: "Low", lastScan: "03/03/26" },
  { id: "5", name: "AD-SRV-02", type: "Server", riskLevel: "High", lastScan: "03/02/26" },
];

const attributedFindings = [
  { id: "1", severity: "Critical", name: "Unencrypted S3 Bucket", asset: "CO-STR-07", status: "Open", firstSeen: "02/28/26" },
  { id: "2", severity: "High", name: "Exposed API Gateway", asset: "API-GW-03", status: "Open", firstSeen: "03/01/26" },
  { id: "3", severity: "High", name: "Open SSH Port", asset: "SRV-DB-01", status: "Resolved", firstSeen: "02/15/26" },
  { id: "4", severity: "Medium", name: "Weak Password Policy", asset: "AD-SRV-02", status: "Open", firstSeen: "01/20/26" },
  { id: "5", severity: "Low", name: "Outdated SSL Certificate", asset: "MS-WKS-14", status: "Resolved", firstSeen: "12/10/25" },
];

const loginHistory = [
  { id: "1", dateTime: "03/05/26 14:32", ip: "185.32.xx.xx", location: "Tel Aviv, IL", device: "Chrome / macOS", status: "Success" },
  { id: "2", dateTime: "03/04/26 09:15", ip: "185.32.xx.xx", location: "Tel Aviv, IL", device: "Chrome / macOS", status: "Success" },
  { id: "3", dateTime: "03/03/26 22:41", ip: "94.188.xx.xx", location: "Haifa, IL", device: "Safari / iOS", status: "MFA Challenge" },
  { id: "4", dateTime: "03/02/26 08:30", ip: "185.32.xx.xx", location: "Tel Aviv, IL", device: "Chrome / macOS", status: "Success" },
  { id: "5", dateTime: "03/01/26 18:12", ip: "Unknown", location: "Unknown", device: "Firefox / Windows", status: "Failed" },
  { id: "6", dateTime: "02/28/26 10:05", ip: "185.32.xx.xx", location: "Tel Aviv, IL", device: "Chrome / macOS", status: "Success" },
  { id: "7", dateTime: "02/27/26 14:20", ip: "185.32.xx.xx", location: "Tel Aviv, IL", device: "Chrome / macOS", status: "Success" },
  { id: "8", dateTime: "02/25/26 09:50", ip: "185.32.xx.xx", location: "Tel Aviv, IL", device: "Postman / API", status: "Success" },
];

const securityEvents = [
  { action: "Password changed", date: "Feb 15, 2026" },
  { action: "MFA enabled (Authenticator app)", date: "Jan 20, 2026" },
  { action: "API key rotated", date: "Jan 5, 2026" },
  { action: "Session revoked from unknown device", date: "Dec 18, 2025" },
];

const severityStyles: Record<string, { bg: string; color: string }> = {
  Critical: { bg: "#FEE2E2", color: "#D62828" },
  High: { bg: "#FEF3C7", color: "#92400E" },
  Medium: { bg: "#FEF9C3", color: "#854D0E" },
  Low: { bg: "#ECF0F5", color: "#474E62" },
};

const loginStatusStyles: Record<string, { bg: string; color: string }> = {
  Success: { bg: "#D1FAE5", color: "#059669" },
  Failed: { bg: "#FEE2E2", color: "#D62828" },
  "MFA Challenge": { bg: "#FEF3C7", color: "#92400E" },
};

const accessLevelStyles: Record<string, { bg: string; color: string }> = {
  "Full Access": { bg: "#D1FAE5", color: "#059669" },
  "Read Only": { bg: "#D4E7FF", color: "#1B7EFF" },
  "No Access": { bg: "#ECF0F5", color: "#8F97AC" },
};

// ── Components ─────────────────────────────────────────────────────────

function InfoRow({ icon, label, value, colors }: { icon: React.ReactNode; label: string; value: string; colors: any }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex items-center justify-center shrink-0" style={{ width: "18px", color: colors.textMuted }}>
        {icon}
      </div>
      <div className="flex flex-col gap-[2px]">
        <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.3px" }}>{label}</span>
        <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 500, color: colors.text, letterSpacing: "-0.3px" }}>{value}</span>
      </div>
    </div>
  );
}

function MiniKPI({ label, value, accent, colors }: { label: string; value: string; accent: string; colors: any }) {
  return (
    <div
      className="rounded-[12px] p-[16px] flex flex-col gap-[8px] flex-1"
      style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
    >
      <div className="flex items-center justify-between">
        <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.3px" }}>{label}</span>
        <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <span style={{ fontFamily: font, fontSize: "32px", fontWeight: 700, color: colors.text, letterSpacing: "-0.5px", lineHeight: 1 }}>{value}</span>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────

function DepartmentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 14V4L8 1L14 4V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8H7M5 11H7M9 8H11M9 11H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1C5.23858 1 3 3.23858 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.23858 10.7614 1 8 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 7H14M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L2 4V8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8V4L8 1Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────

export function UserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState("overview");

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-[16px]" style={{ minHeight: "400px" }}>
        <span style={{ fontFamily: font, fontSize: "18px", fontWeight: 600, color: colors.text }}>User not found</span>
        <button
          onClick={() => navigate("/manage-users")}
          className="bg-transparent border-none cursor-pointer"
          style={{ fontFamily: font, fontSize: "14px", fontWeight: 500, color: "#1B7EFF" }}
        >
          ← Back to Manage Users
        </button>
      </div>
    );
  }

  const initials = user.name.split(" ").map((n) => n[0]).join("");
  const idx = parseInt(user.id) - 1;
  const avatarColor = avatarColors[idx % avatarColors.length];
  const accentColor = roleAccentColors[user.role] || "#8F97AC";
  const roleStyle = roleStyles[user.role] || roleStyles.Viewer;
  const statusStyle = statusStyles[user.status] || statusStyles.Active;
  const userPermissions = permissions[user.role] || permissions.Viewer;

  // ── Column configs for tables ──

  const assetColumns = [
    { key: "name", label: "Asset Name", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 500, color: colors.text, letterSpacing: "-0.5px" }}>{v}</span> },
    { key: "type", label: "Type", width: "110px", render: (v: string) => <Badge label={v} bg={v === "Server" ? "#D4E7FF" : v === "Endpoint" ? "#FEF3C7" : v === "Storage" ? "#EDE9FE" : "#D1FAE5"} color={v === "Server" ? "#1B7EFF" : v === "Endpoint" ? "#92400E" : v === "Storage" ? "#7C3AED" : "#059669"} /> },
    { key: "riskLevel", label: "Risk Level", width: "100px", render: (v: string) => { const s = severityStyles[v] || severityStyles.Low; return <Badge label={v} bg={s.bg} color={s.color} />; } },
    { key: "lastScan", label: "Last Scan", width: "110px", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span> },
  ];

  const findingsColumns = [
    { key: "severity", label: "Severity", width: "100px", render: (v: string) => { const s = severityStyles[v] || severityStyles.Low; return <Badge label={v} bg={s.bg} color={s.color} />; } },
    { key: "name", label: "Finding", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 500, color: colors.text, letterSpacing: "-0.5px" }}>{v}</span> },
    { key: "asset", label: "Asset", width: "110px", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: "#1B7EFF", letterSpacing: "-0.5px" }}>{v}</span> },
    { key: "status", label: "Status", width: "100px", render: (v: string) => <Badge label={v} bg={v === "Open" ? "#D4E7FF" : "#D1FAE5"} color={v === "Open" ? "#1B7EFF" : "#059669"} /> },
    { key: "firstSeen", label: "First Seen", width: "110px", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span> },
  ];

  const loginColumns = [
    { key: "dateTime", label: "Date / Time", width: "150px", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span> },
    { key: "ip", label: "IP Address", width: "130px", render: (v: string) => <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.3px", fontVariantNumeric: "tabular-nums" }}>{v}</span> },
    { key: "location", label: "Location", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span> },
    { key: "device", label: "Device / Browser", render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span> },
    { key: "status", label: "Status", width: "120px", render: (v: string) => { const s = loginStatusStyles[v] || loginStatusStyles.Success; return <Badge label={v} bg={s.bg} color={s.color} />; } },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Back link */}
      <button
        onClick={() => navigate("/manage-users")}
        className="flex items-center gap-[6px] bg-transparent border-none cursor-pointer p-0 self-start"
        style={{ fontFamily: font, fontSize: "13px", fontWeight: 500, color: "#1B7EFF", letterSpacing: "-0.3px" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 3L5 7L9 11" stroke="#1B7EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Manage Users
      </button>

      {/* Two-column layout */}
      <div className="flex gap-[24px]" style={{ alignItems: "flex-start" }}>
        {/* ── Left Column: Profile Sidebar ── */}
        <div className="flex flex-col gap-[16px] shrink-0" style={{ width: "320px" }}>
          {/* Profile Card */}
          <div
            className="rounded-[12px] overflow-hidden flex flex-col"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
          >
            {/* Accent bar */}
            <div style={{ height: "3px", backgroundColor: accentColor }} />

            <div className="flex flex-col items-center gap-[12px] p-[24px] pb-[20px]">
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: "64px", height: "64px", backgroundColor: avatarColor }}
              >
                <span style={{ fontFamily: font, fontSize: "22px", fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>{initials}</span>
              </div>

              {/* Name & email */}
              <div className="flex flex-col items-center gap-[4px]">
                <span style={{ fontFamily: font, fontSize: "20px", fontWeight: 700, color: colors.text, letterSpacing: "-0.5px" }}>{user.name}</span>
                <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.3px" }}>{user.email}</span>
              </div>

              {/* Role & Status badges */}
              <div className="flex items-center gap-[8px]">
                <Badge label={user.role} bg={roleStyle.bg} color={roleStyle.color} />
                <Badge label={user.status} bg={statusStyle.bg} color={statusStyle.color} />
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: "1px", backgroundColor: colors.border, margin: "0 16px" }} />

            {/* Info rows */}
            <div className="flex flex-col gap-[14px] p-[20px]">
              <InfoRow icon={<DepartmentIcon />} label="Department" value={user.department} colors={colors} />
              <InfoRow icon={<LocationIcon />} label="Location" value={user.location} colors={colors} />
              <InfoRow icon={<CalendarIcon />} label="Joined" value={user.joinedDate} colors={colors} />
              <InfoRow icon={<ClockIcon />} label="Last Login" value={user.lastLogin} colors={colors} />
            </div>
          </div>

          {/* Quick Actions Card */}
          <div
            className="rounded-[12px] p-[20px] flex flex-col gap-[12px]"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
          >
            <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: colors.text, letterSpacing: "-0.3px" }}>Quick Actions</span>
            <div className="flex flex-col gap-[8px]">
              {[
                { label: "Edit User", color: colors.text, borderColor: colors.border },
                { label: "Reset Password", color: colors.text, borderColor: colors.border },
                { label: "Disable Account", color: "#D62828", borderColor: "#FEE2E2" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className="flex items-center justify-center rounded-[8px] cursor-pointer transition-all duration-150 ease"
                  style={{
                    height: "36px",
                    backgroundColor: "transparent",
                    border: `1px solid ${btn.borderColor}`,
                    fontFamily: font,
                    fontSize: "13px",
                    fontWeight: 500,
                    color: btn.color,
                    letterSpacing: "-0.3px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Tabbed Content ── */}
        <div className="flex-1 min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="w-full justify-start gap-0 rounded-none bg-transparent p-0 h-auto"
              style={{ borderBottom: `1px solid ${colors.border}` }}
            >
              {["overview", "permissions", "assets", "logins"].map((tab) => {
                const labels: Record<string, string> = { overview: "Overview", permissions: "Permissions & Access", assets: "Assets & Findings", logins: "Login History" };
                const isActive = activeTab === tab;
                return (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none bg-transparent shadow-none data-[state=active]:shadow-none px-[16px] py-[10px]"
                    style={{
                      fontFamily: font,
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#1B7EFF" : colors.textMuted,
                      letterSpacing: "-0.3px",
                      borderBottom: isActive ? "2px solid #1B7EFF" : "2px solid transparent",
                      marginBottom: "-1px",
                    }}
                  >
                    {labels[tab]}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* ── Tab: Overview ── */}
            <TabsContent value="overview" className="mt-[20px]">
              <div className="flex flex-col gap-[20px]">
                {/* Mini KPIs */}
                <div className="grid grid-cols-3 gap-[16px]">
                  <MiniKPI label="Risk Findings" value="7" accent="#D62828" colors={colors} />
                  <MiniKPI label="Assets Managed" value="14" accent="#1B7EFF" colors={colors} />
                  <MiniKPI label="Permissions" value={String(Object.values(userPermissions).filter(Boolean).length)} accent="#04C0B9" colors={colors} />
                </div>

                {/* Activity Timeline */}
                <div
                  className="rounded-[12px] p-[20px] flex flex-col gap-[16px]"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
                >
                  <span style={{ fontFamily: font, fontSize: "15px", fontWeight: 600, color: colors.text, letterSpacing: "-0.3px" }}>Recent Activity</span>
                  <div className="flex flex-col">
                    {activityData.map((item, i) => (
                      <div key={item.id} className="flex gap-[12px]" style={{ paddingBottom: i < activityData.length - 1 ? "16px" : "0" }}>
                        {/* Timeline line + dot */}
                        <div className="flex flex-col items-center shrink-0" style={{ width: "20px" }}>
                          <div className="rounded-full shrink-0" style={{ width: "10px", height: "10px", backgroundColor: activityColors[item.type] || "#8F97AC", marginTop: "4px" }} />
                          {i < activityData.length - 1 && <div className="flex-1" style={{ width: "2px", backgroundColor: colors.border, marginTop: "4px" }} />}
                        </div>
                        {/* Content */}
                        <div className="flex flex-col gap-[2px] pb-[4px]">
                          <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 400, color: colors.text, letterSpacing: "-0.3px", lineHeight: "1.4" }}>{item.action}</span>
                          <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.3px" }}>{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Tab: Permissions & Access ── */}
            <TabsContent value="permissions" className="mt-[20px]">
              <div className="grid grid-cols-2 gap-[16px]">
                {/* Role & Permissions */}
                <div
                  className="rounded-[12px] p-[20px] flex flex-col gap-[16px]"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: font, fontSize: "15px", fontWeight: 600, color: colors.text, letterSpacing: "-0.3px" }}>Role & Permissions</span>
                    <Badge label={user.role} bg={roleStyle.bg} color={roleStyle.color} />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    {Object.entries(userPermissions).map(([perm, granted]) => (
                      <div key={perm} className="flex items-center justify-between py-[6px]" style={{ borderBottom: `1px solid ${colors.border}` }}>
                        <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.3px" }}>{perm}</span>
                        {granted ? <CheckIcon color="#059669" /> : <XIcon color="#D62828" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Access Scope */}
                <div
                  className="rounded-[12px] p-[20px] flex flex-col gap-[16px]"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
                >
                  <span style={{ fontFamily: font, fontSize: "15px", fontWeight: 600, color: colors.text, letterSpacing: "-0.3px" }}>Access Scope</span>
                  <div className="flex flex-col gap-[10px]">
                    {accessScopes.map((scope) => {
                      const levelStyle = accessLevelStyles[scope.level] || accessLevelStyles["No Access"];
                      return (
                        <div key={scope.name} className="flex items-center justify-between py-[8px]" style={{ borderBottom: `1px solid ${colors.border}` }}>
                          <div className="flex items-center gap-[8px]">
                            <ShieldIcon color={colors.textMuted} />
                            <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 500, color: colors.text, letterSpacing: "-0.3px" }}>{scope.name}</span>
                          </div>
                          <Badge label={scope.level} bg={levelStyle.bg} color={levelStyle.color} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Tab: Assets & Findings ── */}
            <TabsContent value="assets" className="mt-[20px]">
              <div className="flex flex-col gap-[20px]">
                <DataTable columns={assetColumns} data={managedAssets} showActions={false} sectionTitle="Managed Assets" />
                <DataTable columns={findingsColumns} data={attributedFindings} showActions={false} sectionTitle="Attributed Findings" />
              </div>
            </TabsContent>

            {/* ── Tab: Login History ── */}
            <TabsContent value="logins" className="mt-[20px]">
              <div className="flex flex-col gap-[20px]">
                <DataTable columns={loginColumns} data={loginHistory} showActions={false} sectionTitle="Login History" />

                {/* Security Events */}
                <div
                  className="rounded-[12px] p-[20px] flex flex-col gap-[14px]"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
                >
                  <span style={{ fontFamily: font, fontSize: "15px", fontWeight: 600, color: colors.text, letterSpacing: "-0.3px" }}>Security Events</span>
                  <div className="flex flex-col gap-[10px]">
                    {securityEvents.map((evt) => (
                      <div key={evt.action} className="flex items-center justify-between py-[6px]" style={{ borderBottom: `1px solid ${colors.border}` }}>
                        <div className="flex items-center gap-[8px]">
                          <ShieldIcon color={colors.textMuted} />
                          <span style={{ fontFamily: font, fontSize: "13px", fontWeight: 400, color: colors.text, letterSpacing: "-0.3px" }}>{evt.action}</span>
                        </div>
                        <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.3px" }}>{evt.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
