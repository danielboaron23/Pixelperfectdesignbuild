import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

interface Notification {
  id: string;
  type: "critical" | "warning" | "resolved" | "info";
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionLabel: string;
}

const notifications: Notification[] = [
  { id: "1", type: "critical", title: "Critical vulnerability detected on MS-WKS-14", description: "Unencrypted data storage found with public access enabled. Immediate remediation recommended.", time: "2 hours ago", read: false, actionLabel: "View Finding" },
  { id: "2", type: "critical", title: "SQL Injection vulnerability on APP-CRM-02", description: "Input validation bypass detected in customer-facing API endpoint.", time: "3 hours ago", read: false, actionLabel: "View Finding" },
  { id: "3", type: "warning", title: "Elevated risk score for Payment Processing", description: "Risk score increased from 72 to 87 due to new findings.", time: "5 hours ago", read: false, actionLabel: "View Entity" },
  { id: "4", type: "resolved", title: "TLS configuration updated on API-GW-01", description: "Deprecated API version finding has been resolved successfully.", time: "6 hours ago", read: false, actionLabel: "View Asset" },
  { id: "5", type: "info", title: "Weekly security scan completed", description: "Full infrastructure scan completed. 3 new findings detected.", time: "8 hours ago", read: false, actionLabel: "View Report" },
  { id: "6", type: "critical", title: "Hardcoded credentials found in APP-PAY-01", description: "API keys detected in source code repository. Rotation required.", time: "12 hours ago", read: true, actionLabel: "View Finding" },
  { id: "7", type: "warning", title: "Certificate expiry warning for SRV-WEB-05", description: "SSL certificate expires in 14 days. Renewal recommended.", time: "Yesterday", read: true, actionLabel: "View Asset" },
  { id: "8", type: "info", title: "New user Noam Shapira invited", description: "Viewer role assigned. Pending email confirmation.", time: "Yesterday", read: true, actionLabel: "View User" },
  { id: "9", type: "resolved", title: "Open SSH port closed on SRV-DB-01", description: "Network policy updated to restrict SSH access to VPN only.", time: "Yesterday", read: true, actionLabel: "View Finding" },
  { id: "10", type: "warning", title: "Unusual login activity detected", description: "Multiple failed login attempts from unrecognized IP address.", time: "2 days ago", read: true, actionLabel: "View Event" },
  { id: "11", type: "info", title: "Business entity Cloud Infrastructure updated", description: "3 new assets associated with Cloud Infrastructure entity.", time: "2 days ago", read: true, actionLabel: "View Entity" },
  { id: "12", type: "critical", title: "Insecure CORS policy on API-GW-02", description: "Wildcard CORS configuration allowing cross-origin requests from any domain.", time: "2 days ago", read: true, actionLabel: "View Finding" },
  { id: "13", type: "resolved", title: "Rate limiting enabled on API-GW-04", description: "API rate limiting configured at 200 requests per second.", time: "3 days ago", read: true, actionLabel: "View Asset" },
  { id: "14", type: "info", title: "Backup verification completed", description: "All backup systems verified. Recovery time objective met.", time: "3 days ago", read: true, actionLabel: "View Report" },
  { id: "15", type: "warning", title: "Excessive IAM permissions on IAM-ROLE-07", description: "Role has admin-level permissions that exceed required access.", time: "3 days ago", read: true, actionLabel: "View Finding" },
  { id: "16", type: "resolved", title: "Firewall rules updated for FW-RULE-03", description: "Outbound traffic restrictions applied per security policy.", time: "4 days ago", read: true, actionLabel: "View Asset" },
  { id: "17", type: "info", title: "Monthly compliance report generated", description: "SOC 2 compliance status report available for download.", time: "4 days ago", read: true, actionLabel: "View Report" },
  { id: "18", type: "critical", title: "Unpatched CVE-2025-1234 on SRV-WEB-05", description: "Known vulnerability with available patch. CVSS score: 9.1", time: "5 days ago", read: true, actionLabel: "View Finding" },
  { id: "19", type: "warning", title: "DNS configuration change detected", description: "MX record modified for primary domain without change request.", time: "5 days ago", read: true, actionLabel: "View Event" },
  { id: "20", type: "info", title: "New asset CO-STR-22 registered", description: "Storage asset added to Cloud Infrastructure entity.", time: "6 days ago", read: true, actionLabel: "View Asset" },
];

type TabType = "all" | "unread" | "critical";

export function NotificationsPage() {
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [notifs, setNotifs] = useState(notifications);
  const navigate = useNavigate();

  const typeIcons: Record<string, { bg: string; icon: React.ReactNode }> = {
    critical: {
      bg: "#FFEFF2",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L14 13H2L8 2Z" fill="#D62828" />
          <path d="M8 6.5V9.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.6" fill="white" />
        </svg>
      ),
    },
    warning: {
      bg: "#FEF3C7",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#F77F00" strokeWidth="1.5" />
          <path d="M8 5V9" stroke="#F77F00" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.6" fill="#F77F00" />
        </svg>
      ),
    },
    resolved: {
      bg: "#D1FAE5",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#059669" strokeWidth="1.5" />
          <path d="M5.5 8L7.5 10L10.5 6" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    info: {
      bg: "#D4E7FF",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#1B7EFF" strokeWidth="1.5" />
          <path d="M8 7V11" stroke="#1B7EFF" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="8" cy="5.5" r="0.6" fill="#1B7EFF" />
        </svg>
      ),
    },
  };

  const actionRoutes: Record<string, string> = {
    "View Finding": "/risk-findings",
    "View Asset": "/assets",
    "View Entity": "/business-entities",
    "View User": "/manage-users",
    "View Event": "/context-events",
    "View Report": "/overview",
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = notifs.filter((n) => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "critical") return n.type === "critical";
    return true;
  });

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const tabs: { key: TabType; label: string; badge?: number }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread", badge: unreadCount },
    { key: "critical", label: "Critical" },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-[12px] items-center">
          <h3 className="m-0" style={{ fontFamily: font, fontSize: "20px", fontWeight: 700, color: colors.text, lineHeight: "100%", letterSpacing: "-0.5px" }}>
            Notifications
          </h3>
          <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px" }}>
            {unreadCount} unread notifications
          </span>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] rounded-[6px] shrink-0 cursor-pointer transition-colors duration-150 ease"
          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
        >
          <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 500, color: colors.text, lineHeight: 1.4, whiteSpace: "nowrap" }}>
            Mark all as read
          </span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-[4px]" style={{ borderBottom: `1px solid ${colors.border}`, paddingBottom: "0" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-[6px] px-[12px] py-[8px] cursor-pointer bg-transparent border-none transition-colors duration-150 ease"
            style={{
              borderBottom: activeTab === tab.key ? `2px solid ${colors.borderBrand}` : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            <span
              style={{
                fontFamily: font,
                fontSize: "14px",
                fontWeight: activeTab === tab.key ? 600 : 400,
                color: activeTab === tab.key ? colors.textBrand : colors.textMuted,
                letterSpacing: "-0.5px",
              }}
            >
              {tab.label}
            </span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 5px",
                  backgroundColor: "#D62828",
                  fontFamily: font,
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: "-0.5px",
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div
        className="flex flex-col rounded-[12px] overflow-hidden"
        style={{ border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
      >
        {filtered.map((notif, idx) => {
          const typeStyle = typeIcons[notif.type];
          return (
            <div
              key={notif.id}
              className="flex items-start gap-[12px] px-[16px] py-[14px] transition-colors duration-150 ease"
              style={{
                backgroundColor: colors.bg,
                borderTop: idx > 0 ? `1px solid ${colors.border}` : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
            >
              {/* Unread dot */}
              <div className="flex items-center justify-center shrink-0 pt-[6px]" style={{ width: "8px" }}>
                {!notif.read && (
                  <div className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: colors.bgBrand }} />
                )}
              </div>

              {/* Icon */}
              <div
                className="flex items-center justify-center shrink-0 rounded-[6px]"
                style={{ width: "32px", height: "32px", backgroundColor: typeStyle.bg }}
              >
                {typeStyle.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="m-0"
                  style={{
                    fontFamily: font,
                    fontSize: "14px",
                    fontWeight: notif.read ? 400 : 600,
                    color: colors.text,
                    letterSpacing: "-0.5px",
                    lineHeight: "normal",
                  }}
                >
                  {notif.title}
                </p>
                <p
                  className="m-0 mt-[4px]"
                  style={{
                    fontFamily: font,
                    fontSize: "14px",
                    fontWeight: 400,
                    color: colors.textMuted,
                    letterSpacing: "-0.5px",
                    lineHeight: "normal",
                  }}
                >
                  {notif.description}
                </p>
              </div>

              {/* Time + Action */}
              <div className="flex flex-col items-end gap-[6px] shrink-0">
                <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
                  {notif.time}
                </span>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => navigate(actionRoutes[notif.actionLabel] || "/overview")}
                  style={{ fontFamily: font, fontSize: "12px", fontWeight: 500, color: colors.textBrand, letterSpacing: "-0.5px", whiteSpace: "nowrap" }}
                >
                  {notif.actionLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
