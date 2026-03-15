import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../shared/PageHeader";
import { DataTable } from "../shared/DataTable";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const entities = [
  { id: "1", name: "Payment Processing", totalRisks: 14, critical: 4, high: 5, medium: 3, low: 2, riskScore: 87, lastAssessment: "03/04/26" },
  { id: "2", name: "User Authentication", totalRisks: 11, critical: 3, high: 4, medium: 2, low: 2, riskScore: 78, lastAssessment: "03/03/26" },
  { id: "3", name: "Data Analytics", totalRisks: 8, critical: 1, high: 3, medium: 3, low: 1, riskScore: 62, lastAssessment: "03/05/26" },
  { id: "4", name: "Cloud Infrastructure", totalRisks: 15, critical: 5, high: 6, medium: 2, low: 2, riskScore: 92, lastAssessment: "03/05/26" },
  { id: "5", name: "API Gateway Services", totalRisks: 9, critical: 2, high: 3, medium: 3, low: 1, riskScore: 71, lastAssessment: "03/02/26" },
  { id: "6", name: "Customer Data", totalRisks: 6, critical: 1, high: 2, medium: 2, low: 1, riskScore: 55, lastAssessment: "03/01/26" },
  { id: "7", name: "Internal Tools", totalRisks: 3, critical: 0, high: 1, medium: 1, low: 1, riskScore: 28, lastAssessment: "02/28/26" },
  { id: "8", name: "Email Services", totalRisks: 5, critical: 1, high: 1, medium: 2, low: 1, riskScore: 48, lastAssessment: "03/04/26" },
  { id: "9", name: "CI/CD Pipeline", totalRisks: 7, critical: 2, high: 2, medium: 2, low: 1, riskScore: 67, lastAssessment: "03/03/26" },
  { id: "10", name: "Backup Systems", totalRisks: 4, critical: 0, high: 2, medium: 1, low: 1, riskScore: 38, lastAssessment: "02/25/26" },
  { id: "11", name: "Monitoring Stack", totalRisks: 2, critical: 0, high: 0, medium: 1, low: 1, riskScore: 15, lastAssessment: "03/05/26" },
  { id: "12", name: "DNS Management", totalRisks: 3, critical: 0, high: 1, medium: 1, low: 1, riskScore: 32, lastAssessment: "02/20/26" },
];

export function BusinessEntitiesRisksPage() {
  const navigate = useNavigate();
  const colors = useThemeColors();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return entities;
    const q = search.toLowerCase();
    return entities.filter((e) => e.name.toLowerCase().includes(q));
  }, [search]);

  const columns = [
    {
      key: "name",
      label: "Entity Name",
      render: (v: string) => (
        <span
          onClick={() => navigate("/business-entities")}
          style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textBrand, letterSpacing: "-0.5px", cursor: "pointer" }}
          className="hover:underline"
        >
          {v}
        </span>
      ),
    },
    { key: "totalRisks", label: "Total Risks", width: "90px" },
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
    {
      key: "low",
      label: "Low",
      width: "60px",
      render: (v: number) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px" }}>{v}</span>,
    },
    {
      key: "riskScore",
      label: "Risk Score",
      width: "140px",
      render: (v: number) => {
        const color = v > 80 ? "#D62828" : v > 50 ? "#F77F00" : "#04C0B9";
        return (
          <div className="flex items-center gap-[8px]">
            <div className="flex-1 h-[6px] rounded-[3px] overflow-hidden" style={{ backgroundColor: colors.bgTertiary }}>
              <div className="h-full rounded-[3px]" style={{ width: `${v}%`, backgroundColor: color, transition: "width 300ms ease" }} />
            </div>
            <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 500, color, letterSpacing: "-0.5px", minWidth: "24px" }}>{v}</span>
          </div>
        );
      },
    },
    { key: "lastAssessment", label: "Last Assessment", width: "120px" },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageHeader
        title="Business Entities Risks"
        counter={`${filtered.length} business entities`}
        searchPlaceholder="Search entities..."
        searchValue={search}
        onSearchChange={setSearch}
        showExport
      />
      <DataTable columns={columns} data={filtered} pageSize={15} sectionTitle="Entities Risk Overview" />
    </div>
  );
}
