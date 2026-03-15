import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../shared/PageHeader";
import { DataTable } from "../shared/DataTable";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

const avatarColors = ["#1B7EFF", "#04C0B9", "#F77F00", "#8B5CF6", "#D62828", "#059669"];

const entities = [
  { id: "1", name: "Payment Processing", description: "Handles all payment transactions and billing operations", assets: 18, owner: "Sarah Cohen", created: "06/15/25", updated: "03/05/26" },
  { id: "2", name: "User Authentication", description: "Manages user identity, SSO, and access control", assets: 12, owner: "Michael Levy", created: "05/20/25", updated: "03/04/26" },
  { id: "3", name: "Data Analytics", description: "Data pipeline and analytics infrastructure", assets: 24, owner: "Tamar Friedman", created: "07/01/25", updated: "03/03/26" },
  { id: "4", name: "Cloud Infrastructure", description: "Core cloud resources and compute services", assets: 45, owner: "David Katz", created: "04/10/25", updated: "03/05/26" },
  { id: "5", name: "API Gateway Services", description: "External and internal API management layer", assets: 8, owner: "Sarah Cohen", created: "08/22/25", updated: "03/02/26" },
  { id: "6", name: "Customer Data", description: "Customer PII storage and data management", assets: 15, owner: "Tamar Friedman", created: "05/05/25", updated: "03/01/26" },
  { id: "7", name: "Internal Tools", description: "Developer and internal team productivity tools", assets: 6, owner: "Michael Levy", created: "09/15/25", updated: "02/28/26" },
  { id: "8", name: "Email Services", description: "Email sending, receiving, and notification system", assets: 4, owner: "David Katz", created: "06/30/25", updated: "03/04/26" },
  { id: "9", name: "CI/CD Pipeline", description: "Continuous integration and deployment infrastructure", assets: 11, owner: "Sarah Cohen", created: "07/20/25", updated: "03/03/26" },
  { id: "10", name: "Backup Systems", description: "Data backup and disaster recovery systems", assets: 9, owner: "Michael Levy", created: "04/25/25", updated: "02/25/26" },
  { id: "11", name: "Monitoring Stack", description: "Application and infrastructure monitoring tools", assets: 7, owner: "Tamar Friedman", created: "08/10/25", updated: "03/05/26" },
  { id: "12", name: "DNS Management", description: "Domain name system and routing configuration", assets: 3, owner: "David Katz", created: "05/12/25", updated: "02/20/26" },
];

export function BusinessEntitiesPage() {
  const navigate = useNavigate();
  const colors = useThemeColors();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return entities;
    const q = search.toLowerCase();
    return entities.filter((e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.owner.toLowerCase().includes(q));
  }, [search]);

  const columns = [
    { key: "name", label: "Entity Name" },
    {
      key: "description",
      label: "Description",
      render: (v: string) => (
        <span className="block overflow-hidden text-ellipsis" style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px", maxWidth: "280px", whiteSpace: "nowrap" }}>
          {v}
        </span>
      ),
    },
    {
      key: "assets",
      label: "Associated Assets",
      width: "130px",
      render: (v: number) => (
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
      key: "owner",
      label: "Owner",
      width: "160px",
      render: (v: string, row: any) => {
        const initials = v.split(" ").map((n: string) => n[0]).join("");
        const idx = parseInt(row.id);
        return (
          <div className="flex items-center gap-[8px]">
            <div
              className="flex items-center justify-center shrink-0 rounded-full"
              style={{ width: "22px", height: "22px", backgroundColor: avatarColors[idx % avatarColors.length] }}
            >
              <span style={{ fontFamily: font, fontSize: "10px", fontWeight: 600, color: "white", letterSpacing: "-0.5px" }}>{initials}</span>
            </div>
            <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px" }}>{v}</span>
          </div>
        );
      },
    },
    { key: "created", label: "Created", width: "100px" },
    { key: "updated", label: "Updated", width: "100px" },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageHeader
        title="Business Entities"
        counter={`${filtered.length} business entities`}
        searchPlaceholder="Search entities..."
        searchValue={search}
        onSearchChange={setSearch}
        primaryAction={{ label: "New Entity" }}
        showExport
      />
      <DataTable columns={columns} data={filtered} showCheckbox sectionTitle="Entities List" />
    </div>
  );
}
