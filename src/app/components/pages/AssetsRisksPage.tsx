import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../shared/PageHeader";
import { DataTable, TypeBadge } from "../shared/DataTable";
import { FilterDropdown } from "../shared/FilterDropdown";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const assetsData = (() => {
  const names = ["MS-WKS-14", "CO-STR-07", "API-GW-03", "SRV-DB-01", "AD-SRV-02", "APP-CRM-02", "CO-STR-12", "SRV-WEB-05", "API-GW-01", "IAM-ROLE-07", "API-GW-02", "API-GW-04", "APP-PAY-01", "VPC-SG-11", "FW-RULE-03"];
  const types = ["Server", "Storage", "Endpoint", "Application", "Server", "Application", "Storage", "Server", "Endpoint", "Application", "Endpoint", "Endpoint", "Application", "Server", "Server"];
  const crits = [9, 8, 7, 10, 6, 8, 5, 7, 3, 4, 6, 2, 9, 3, 7];
  const totalFindings = [12, 8, 6, 14, 5, 9, 4, 7, 2, 3, 5, 1, 11, 2, 6];
  const critical = [4, 2, 1, 5, 1, 3, 0, 2, 0, 0, 1, 0, 4, 0, 2];
  const high = [5, 3, 3, 6, 2, 3, 2, 3, 1, 1, 2, 0, 4, 1, 3];
  const medium = [3, 3, 2, 3, 2, 3, 2, 2, 1, 2, 2, 1, 3, 1, 1];
  const dates = ["03/05/26", "03/04/26", "03/03/26", "03/05/26", "03/02/26", "03/04/26", "03/01/26", "03/03/26", "02/28/26", "03/05/26", "03/04/26", "02/25/26", "03/05/26", "02/20/26", "03/03/26"];
  return Array.from({ length: 15 }, (_, i) => ({
    id: String(i + 1),
    name: names[i],
    type: types[i],
    criticality: crits[i],
    totalFindings: totalFindings[i],
    critical: critical[i],
    high: high[i],
    medium: medium[i],
    lastScan: dates[i],
  }));
})();

export function AssetsRisksPage() {
  const navigate = useNavigate();
  const colors = useThemeColors();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [critFilter, setCritFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return assetsData.filter((a) => {
      if (typeFilter && a.type !== typeFilter) return false;
      if (critFilter) {
        if (critFilter === "High (8-10)" && a.criticality < 8) return false;
        if (critFilter === "Medium (5-7)" && (a.criticality < 5 || a.criticality > 7)) return false;
        if (critFilter === "Low (1-4)" && a.criticality > 4) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.type.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, typeFilter, critFilter]);

  const columns = [
    {
      key: "name",
      label: "Asset Name",
      render: (v: string) => (
        <span
          onClick={() => navigate("/assets")}
          style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textBrand, letterSpacing: "-0.5px", cursor: "pointer" }}
          className="hover:underline"
        >
          {v}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      width: "130px",
      render: (v: string) => <TypeBadge type={v} textColor={colors.textSecondary} />,
    },
    {
      key: "criticality",
      label: "Business Criticality",
      width: "140px",
      render: (v: number) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "#D62828", letterSpacing: "-0.5px" }}>{v}</span>,
    },
    { key: "totalFindings", label: "Total Findings", width: "110px" },
    {
      key: "critical",
      label: "Critical",
      width: "80px",
      render: (v: number) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "#D62828", letterSpacing: "-0.5px" }}>{v}</span>,
    },
    {
      key: "high",
      label: "High",
      width: "70px",
      render: (v: number) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "#F77F00", letterSpacing: "-0.5px" }}>{v}</span>,
    },
    {
      key: "medium",
      label: "Medium",
      width: "80px",
      render: (v: number) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 600, color: "#92400E", letterSpacing: "-0.5px" }}>{v}</span>,
    },
    { key: "lastScan", label: "Last Scan Date", width: "120px" },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageHeader
        title="Assets Risks"
        counter={`${filtered.length} assets scanned`}
        searchPlaceholder="Search assets..."
        searchValue={search}
        onSearchChange={setSearch}
        filterElements={
          <>
            <FilterDropdown label="Type" options={["Server", "Endpoint", "Application", "Storage"]} value={typeFilter} onChange={setTypeFilter} />
            <FilterDropdown label="Criticality" options={["High (8-10)", "Medium (5-7)", "Low (1-4)"]} value={critFilter} onChange={setCritFilter} />
          </>
        }
        showExport
      />
      <DataTable columns={columns} data={filtered} sectionTitle="Assets Risk Overview" />
    </div>
  );
}
