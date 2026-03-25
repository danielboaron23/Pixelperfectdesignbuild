import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { PageHeader } from "../shared/PageHeader";
import { DataTable, Badge } from "../shared/DataTable";
import { FilterDropdown } from "../shared/FilterDropdown";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

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

const avatarColors = ["#1B7EFF", "#04C0B9", "#F77F00", "#8B5CF6", "#D62828", "#059669", "#EC4899", "#6366F1"];

const users = [
  { id: "1", name: "Sarah Cohen", email: "sarah.cohen@sentraguard.io", role: "Admin", lastLogin: "03/05/26 14:32", status: "Active" },
  { id: "2", name: "Michael Levy", email: "michael.levy@sentraguard.io", role: "Admin", lastLogin: "03/05/26 10:15", status: "Active" },
  { id: "3", name: "Tamar Friedman", email: "tamar.friedman@sentraguard.io", role: "Editor", lastLogin: "03/04/26 18:45", status: "Active" },
  { id: "4", name: "David Katz", email: "david.katz@sentraguard.io", role: "Editor", lastLogin: "03/03/26 09:22", status: "Active" },
  { id: "5", name: "Yael Mizrahi", email: "yael.mizrahi@sentraguard.io", role: "Viewer", lastLogin: "03/01/26 16:08", status: "Active" },
  { id: "6", name: "Noam Shapira", email: "noam.shapira@sentraguard.io", role: "Viewer", lastLogin: "Never", status: "Invited" },
  { id: "7", name: "Rina Goldberg", email: "rina.goldberg@sentraguard.io", role: "Editor", lastLogin: "02/20/26 11:30", status: "Disabled" },
  { id: "8", name: "Eitan Ben-Ari", email: "eitan.benari@sentraguard.io", role: "Viewer", lastLogin: "Never", status: "Invited" },
];

export function ManageUsersPage() {
  const colors = useThemeColors();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (statusFilter && u.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, roleFilter, statusFilter]);

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (v: string, row: any) => {
        const initials = v.split(" ").map((n: string) => n[0]).join("");
        const idx = parseInt(row.id) - 1;
        return (
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center justify-center shrink-0 rounded-full" style={{ width: "26px", height: "26px", backgroundColor: avatarColors[idx % avatarColors.length] }}>
              <span style={{ fontFamily: font, fontSize: "11px", fontWeight: 600, color: "white", letterSpacing: "-0.5px" }}>{initials}</span>
            </div>
            <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 500, color: colors.text, letterSpacing: "-0.5px" }}>{v}</span>
          </div>
        );
      },
    },
    {
      key: "email",
      label: "Email",
      render: (v: string) => <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px" }}>{v}</span>,
    },
    {
      key: "role",
      label: "Role",
      width: "100px",
      render: (v: string) => {
        const s = roleStyles[v] || roleStyles.Viewer;
        return <Badge label={v} bg={s.bg} color={s.color} />;
      },
    },
    {
      key: "lastLogin",
      label: "Last Login",
      width: "150px",
      render: (v: string) => (
        <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: v === "Never" ? colors.textMuted : colors.textSecondary, letterSpacing: "-0.5px", fontStyle: v === "Never" ? "italic" : "normal" }}>
          {v}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "100px",
      render: (v: string) => {
        const s = statusStyles[v] || statusStyles.Active;
        return <Badge label={v} bg={s.bg} color={s.color} />;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <PageHeader
        title="Manage Users"
        counter={`${filtered.length} users`}
        searchPlaceholder="Search users..."
        searchValue={search}
        onSearchChange={setSearch}
        filterElements={
          <>
            <FilterDropdown label="Role" options={["Admin", "Editor", "Viewer"]} value={roleFilter} onChange={setRoleFilter} />
            <FilterDropdown label="Status" options={["Active", "Invited", "Disabled"]} value={statusFilter} onChange={setStatusFilter} />
          </>
        }
        primaryAction={{ label: "Invite User" }}
        showExport
      />
      <DataTable columns={columns} data={filtered} showCheckbox sectionTitle="Users List" onRowClick={(row) => navigate(`/manage-users/${row.id}`)} />
    </div>
  );
}
