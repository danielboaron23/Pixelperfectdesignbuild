import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../shared/PageHeader";
import { DataTable, Badge } from "../shared/DataTable";
import { FilterDropdown } from "../shared/FilterDropdown";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const eventTypeStyles: Record<string, { bg: string; color: string }> = {
  "Asset Created": { bg: "#D4E7FF", color: "#1B7EFF" },
  "Risk Detected": { bg: "#FFEFF2", color: "#D62828" },
  "Entity Updated": { bg: "#D1FAE5", color: "#059669" },
  "User Action": { bg: "#ECF0F5", color: "#474E62" },
  "Scan Completed": { bg: "#EDE9FE", color: "#7C3AED" },
};

const severityStyles: Record<string, { bg: string; color: string }> = {
  Critical: { bg: "#D62828", color: "#FFFFFF" },
  High: { bg: "#F77F00", color: "#FFFFFF" },
  Medium: { bg: "#FEF3C7", color: "#92400E" },
  Low: { bg: "#ECF0F5", color: "#474E62" },
  Info: { bg: "#D4E7FF", color: "#1B7EFF" },
};

const avatarColors = ["#1B7EFF", "#04C0B9", "#F77F00", "#8B5CF6", "#D62828", "#059669"];
const users = ["Sarah Cohen", "Michael Levy", "Tamar Friedman", "David Katz", "System"];

const events = (() => {
  const types = ["Asset Created", "Risk Detected", "Entity Updated", "User Action", "Scan Completed"];
  const severities = ["Critical", "High", "Medium", "Low", "Info"];
  const assets = ["CO-STR-07", "MS-WKS-14", "API-GW-03", "SRV-DB-01", "AD-SRV-02", "APP-CRM-02", "CO-STR-12", "SRV-WEB-05"];
  const descriptions = [
    "New storage asset CO-WKS-22 was added",
    "Critical vulnerability detected on MS-WKS-14",
    "Business entity 'Payment Processing' updated",
    "User permissions modified for API-GW-03",
    "Full security scan completed successfully",
    "New endpoint asset registered",
    "High severity finding resolved on SRV-DB-01",
    "Entity connection modified for AD-SRV-02",
    "Access control policy updated",
    "Vulnerability scan initiated by admin",
    "Asset criticality rating changed",
    "New risk finding auto-detected",
    "User role assignment changed",
    "Backup verification completed",
    "SSL certificate expiry warning triggered",
  ];
  return Array.from({ length: 15 }, (_, i) => ({
    id: String(i + 1),
    timestamp: `03/${String(5 - Math.floor(i / 5)).padStart(2, "0")}/26 ${String(15 - i).padStart(2, "0")}:${String((i * 17) % 60).padStart(2, "0")}`,
    eventType: types[i % types.length],
    sourceAsset: assets[i % assets.length],
    description: descriptions[i],
    severity: severities[i % severities.length],
    user: users[i % users.length],
  }));
})();

export function ContextEventsPage() {
  const navigate = useNavigate();
  const colors = useThemeColors();
  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (eventTypeFilter && e.eventType !== eventTypeFilter) return false;
      if (severityFilter && e.severity !== severityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return e.description.toLowerCase().includes(q) || e.sourceAsset.toLowerCase().includes(q) || e.user.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, eventTypeFilter, severityFilter]);

  const columns = [
    { key: "timestamp", label: "Timestamp", width: "140px" },
    {
      key: "eventType",
      label: "Event Type",
      width: "140px",
      render: (v: string) => {
        const s = eventTypeStyles[v] || eventTypeStyles["User Action"];
        return <Badge label={v} bg={s.bg} color={s.color} />;
      },
    },
    {
      key: "sourceAsset",
      label: "Source Asset",
      width: "120px",
      render: (v: string) => (
        <span
          onClick={() => navigate("/assets")}
          style={{ fontFamily: font, fontSize: "14px", color: colors.textBrand, letterSpacing: "-0.5px", cursor: "pointer" }}
          className="hover:underline"
        >
          {v}
        </span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (v: string) => (
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px", maxWidth: "320px" }}>
          {v}
        </span>
      ),
    },
    {
      key: "severity",
      label: "Severity",
      width: "90px",
      render: (v: string) => {
        const s = severityStyles[v] || severityStyles.Info;
        return <Badge label={v} bg={s.bg} color={s.color} />;
      },
    },
    {
      key: "user",
      label: "User",
      width: "160px",
      render: (v: string, row: any) => {
        const idx = parseInt(row.id);
        if (v === "System") {
          return (
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center justify-center shrink-0 rounded-full" style={{ width: "22px", height: "22px", backgroundColor: colors.bgTertiary }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke={colors.textMuted} strokeWidth="1.5" />
                  <path d="M6 4V7" stroke={colors.textMuted} strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="6" cy="9" r="0.5" fill={colors.textMuted} />
                </svg>
              </div>
              <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px" }}>System</span>
            </div>
          );
        }
        const initials = v.split(" ").map((n: string) => n[0]).join("");
        return (
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center justify-center shrink-0 rounded-full" style={{ width: "22px", height: "22px", backgroundColor: avatarColors[idx % avatarColors.length] }}>
              <span style={{ fontFamily: font, fontSize: "10px", fontWeight: 600, color: "white", letterSpacing: "-0.5px" }}>{initials}</span>
            </div>
            <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageHeader
        title="Context Events"
        counter={`${filtered.length} events`}
        searchPlaceholder="Search events..."
        searchValue={search}
        onSearchChange={setSearch}
        filterElements={
          <>
            <FilterDropdown label="Event Type" options={["Asset Created", "Risk Detected", "Entity Updated", "User Action", "Scan Completed"]} value={eventTypeFilter} onChange={setEventTypeFilter} width="150px" />
            <FilterDropdown label="Severity" options={["Critical", "High", "Medium", "Low", "Info"]} value={severityFilter} onChange={setSeverityFilter} />
          </>
        }
        showExport
      />
      <DataTable columns={columns} data={filtered} showActions={false} sectionTitle="Event Log" />
    </div>
  );
}
