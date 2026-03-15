import React, { useState } from "react";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  pageSize?: number;
  showCheckbox?: boolean;
  showActions?: boolean;
  onActionClick?: (row: any) => void;
  sectionTitle?: string;
}

export function DataTable({
  columns,
  data,
  pageSize = 15,
  showCheckbox = false,
  showActions = true,
  sectionTitle,
}: DataTableProps) {
  const colors = useThemeColors();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col gap-[12px]">
      {sectionTitle && (
        <span style={{ fontFamily: font, fontSize: "16px", fontWeight: 500, color: colors.text, letterSpacing: "-0.32px", lineHeight: "normal" }}>
          {sectionTitle}
        </span>
      )}
      <div
        className="rounded-[12px] overflow-hidden"
        style={{ border: `1px solid ${colors.border}`, boxShadow: colors.shadowCard }}
      >
        {/* Header */}
        <div className="flex items-center" style={{ backgroundColor: colors.bgSecondary, height: "30px" }}>
          {showCheckbox && (
            <div className="flex items-center justify-center px-[6px] shrink-0">
              <div className="relative w-[14px] h-[14px]">
                <div className="absolute border border-solid inset-0 rounded-[4px]" style={{ borderColor: colors.textMuted }} />
              </div>
            </div>
          )}
          {columns.map((col) => (
            <div key={col.key} className="flex-1 px-[8px] py-[7px]" style={col.width ? { flex: "none", width: col.width } : {}}>
              <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 400, color: colors.textMuted, letterSpacing: "-0.5px", lineHeight: "14px" }}>
                {col.label}
              </span>
            </div>
          ))}
          {showActions && <div className="w-[40px] shrink-0" />}
        </div>

        {/* Rows */}
        {paginatedData.map((row, idx) => (
          <div
            key={row.id || idx}
            className="flex items-center transition-colors duration-150 ease"
            style={{ height: "42px", borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bg }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
          >
            {showCheckbox && (
              <div className="flex items-center justify-center px-[6px] shrink-0">
                <div className="relative w-[14px] h-[14px]">
                  <div className="absolute border border-solid inset-0 rounded-[4px]" style={{ borderColor: colors.textMuted }} />
                </div>
              </div>
            )}
            {columns.map((col) => (
              <div key={col.key} className="flex-1 px-[8px] py-[12px] overflow-hidden" style={col.width ? { flex: "none", width: col.width } : {}}>
                {col.render ? (
                  col.render(row[col.key], row)
                ) : (
                  <span
                    className="whitespace-nowrap overflow-hidden text-ellipsis block"
                    style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.textSecondary, letterSpacing: "-0.5px", lineHeight: "normal" }}
                  >
                    {row[col.key]}
                  </span>
                )}
              </div>
            ))}
            {showActions && (
              <div className="w-[40px] shrink-0 flex items-center justify-center">
                <button
                  className="bg-transparent border-none cursor-pointer p-[4px] rounded-[4px] transition-colors duration-150 ease"
                  style={{ color: colors.textMuted }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgTertiary)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="3" r="1.5" fill={colors.textMuted} />
                    <circle cx="8" cy="8" r="1.5" fill={colors.textMuted} />
                    <circle cx="8" cy="13" r="1.5" fill={colors.textMuted} />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center" style={{ height: "52px", borderTop: `1px solid ${colors.border}`, backgroundColor: colors.bg }}>
            <div className="flex gap-[4px] items-center">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="flex items-center justify-center rounded-[6px] cursor-pointer transition-colors duration-150 ease"
                  style={{
                    width: "32px",
                    height: "28px",
                    border: currentPage === page ? `1px solid ${colors.borderBrand}` : "1px solid transparent",
                    backgroundColor: "transparent",
                    fontFamily: font,
                    fontSize: "14px",
                    fontWeight: currentPage === page ? 600 : 400,
                    color: currentPage === page ? colors.textBrand : colors.textMuted,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {page}
                </button>
              ))}
              {totalPages > 1 && currentPage < totalPages && (
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="flex gap-[4px] h-[28px] items-center justify-center px-[8px] rounded-[6px] cursor-pointer transition-colors duration-150 ease"
                  style={{
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bg,
                    fontFamily: font,
                    fontSize: "14px",
                    fontWeight: 400,
                    color: colors.textMuted,
                    letterSpacing: "-0.5px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
                >
                  Next
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1L5 5L1 9" stroke={colors.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable badge component
export function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-[8px] py-[2px] rounded-[4px] whitespace-nowrap"
      style={{ backgroundColor: bg, fontFamily: font, fontSize: "12px", fontWeight: 500, color, letterSpacing: "-0.5px", lineHeight: "16px" }}
    >
      {label}
    </span>
  );
}

// Type icon badge (Server, Endpoint, etc.)
export function TypeBadge({ type, textColor }: { type: string; textColor?: string }) {
  const bgColors: Record<string, string> = {
    Server: "#D4E7FF",
    Endpoint: "#FEF3C7",
    Application: "#D1FAE5",
    Storage: "#EDE9FE",
  };
  return (
    <div className="flex gap-[6px] items-center">
      <div
        className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] shrink-0"
        style={{ backgroundColor: bgColors[type] || "#D4E7FF" }}
      >
        <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
          <rect x="1" y="1" width="10" height="4" rx="1" fill="#1B7EFF" />
          <rect x="1" y="7" width="10" height="4" rx="1" fill="#1B7EFF" />
        </svg>
      </div>
      <span style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: textColor || "#474E62", letterSpacing: "-0.5px", lineHeight: "normal" }}>
        {type}
      </span>
    </div>
  );
}
