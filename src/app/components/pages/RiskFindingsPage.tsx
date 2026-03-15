import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../shared/PageHeader";
import { DataTable, Badge } from "../shared/DataTable";
import { FilterDropdown } from "../shared/FilterDropdown";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const severityStyles: Record<string, { bg: string; color: string }> = {
  Critical: { bg: "#D62828", color: "#FFFFFF" },
  High: { bg: "#F77F00", color: "#FFFFFF" },
  Medium: { bg: "#FEF3C7", color: "#92400E" },
  Low: { bg: "#ECF0F5", color: "#474E62" },
};

const statusStyles: Record<string, { bg: string; color: string }> = {
  Open: { bg: "#D4E7FF", color: "#1B7EFF" },
  Resolved: { bg: "#D1FAE5", color: "#059669" },
  Ignored: { bg: "#ECF0F5", color: "#8F97AC" },
};

const findings = [
  { id: "1", severity: "Critical", name: "Unencrypted S3 Bucket", asset: "CO-STR-07", category: "Encryption", status: "Open", firstSeen: "01/15/26", lastSeen: "03/05/26" },
  { id: "2", severity: "Critical", name: "Exposed API Gateway", asset: "API-GW-03", category: "Access Control", status: "Open", firstSeen: "02/01/26", lastSeen: "03/05/26" },
  { id: "3", severity: "High", name: "Outdated TLS Configuration", asset: "MS-WKS-14", category: "Encryption", status: "Open", firstSeen: "12/20/25", lastSeen: "03/04/26" },
  { id: "4", severity: "Critical", name: "Open SSH Port", asset: "SRV-DB-01", category: "Network", status: "Open", firstSeen: "01/28/26", lastSeen: "03/05/26" },
  { id: "5", severity: "High", name: "Weak Password Policy", asset: "AD-SRV-02", category: "Access Control", status: "Open", firstSeen: "02/10/26", lastSeen: "03/03/26" },
  { id: "6", severity: "Medium", name: "Missing Access Logs", asset: "CO-STR-12", category: "Configuration", status: "Open", firstSeen: "01/05/26", lastSeen: "03/05/26" },
  { id: "7", severity: "High", name: "Unpatched CVE-2025-1234", asset: "SRV-WEB-05", category: "Configuration", status: "Open", firstSeen: "02/15/26", lastSeen: "03/04/26" },
  { id: "8", severity: "Low", name: "Deprecated API Version", asset: "API-GW-01", category: "Configuration", status: "Resolved", firstSeen: "11/10/25", lastSeen: "02/28/26" },
  { id: "9", severity: "Critical", name: "SQL Injection Vulnerability", asset: "APP-CRM-02", category: "Access Control", status: "Open", firstSeen: "02/20/26", lastSeen: "03/05/26" },
  { id: "10", severity: "Medium", name: "Excessive IAM Permissions", asset: "IAM-ROLE-07", category: "Access Control", status: "Ignored", firstSeen: "12/01/25", lastSeen: "03/01/26" },
  { id: "11", severity: "High", name: "Insecure CORS Policy", asset: "API-GW-02", category: "Network", status: "Open", firstSeen: "01/22/26", lastSeen: "03/05/26" },
  { id: "12", severity: "Low", name: "Missing Rate Limiting", asset: "API-GW-04", category: "Network", status: "Resolved", firstSeen: "10/15/25", lastSeen: "01/30/26" },
  { id: "13", severity: "Critical", name: "Hardcoded Credentials", asset: "APP-PAY-01", category: "Access Control", status: "Open", firstSeen: "03/01/26", lastSeen: "03/05/26" },
  { id: "14", severity: "Medium", name: "Unused Security Groups", asset: "VPC-SG-11", category: "Network", status: "Ignored", firstSeen: "11/20/25", lastSeen: "02/15/26" },
  { id: "15", severity: "High", name: "Unrestricted Outbound Traffic", asset: "FW-RULE-03", category: "Network", status: "Open", firstSeen: "02/05/26", lastSeen: "03/04/26" },
];

export function RiskFindingsPage() {
  const navigate = useNavigate();
  const colors = useThemeColors();
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return findings.filter((f) => {
      if (severityFilter && f.severity !== severityFilter) return false;
      if (statusFilter && f.status !== statusFilter) return false;
      if (categoryFilter && f.category !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return f.name.toLowerCase().includes(q) || f.asset.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, severityFilter, statusFilter, categoryFilter]);

  const openCount = filtered.filter((f) => f.status === "Open").length;

  const columns = [
    {
      key: "severity",
      label: "Severity",
      width: "100px",
      render: (v: string) => {
        const s = severityStyles[v] || severityStyles.Low;
        return <Badge label={v} bg={s.bg} color={s.color} />;
      },
    },
    { key: "name", label: "Finding Name" },
    {
      key: "asset",
      label: "Affected Asset",
      width: "130px",
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
    { key: "category", label: "Category", width: "120px" },
    {
      key: "status",
      label: "Status",
      width: "100px",
      render: (v: string) => {
        const s = statusStyles[v] || statusStyles.Open;
        return <Badge label={v} bg={s.bg} color={s.color} />;
      },
    },
    { key: "firstSeen", label: "First Seen", width: "100px" },
    { key: "lastSeen", label: "Last Seen", width: "100px" },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageHeader
        title="Risk Findings"
        counter={`${openCount} open findings`}
        searchPlaceholder="Search findings..."
        searchValue={search}
        onSearchChange={setSearch}
        filterElements={
          <>
            <FilterDropdown label="Severity" options={["Critical", "High", "Medium", "Low"]} value={severityFilter} onChange={setSeverityFilter} />
            <FilterDropdown label="Status" options={["Open", "Resolved", "Ignored"]} value={statusFilter} onChange={setStatusFilter} />
            <FilterDropdown label="Category" options={["Encryption", "Access Control", "Network", "Configuration"]} value={categoryFilter} onChange={setCategoryFilter} />
          </>
        }
        primaryAction={{ label: "New Finding" }}
      />
      <DataTable
        columns={columns}
        data={filtered}
        showCheckbox
        sectionTitle="Findings List"
      />
    </div>
  );
}
