import React, { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-uheoyqb1mb";
import contextMenuSvgPaths from "../../imports/svg-m5ifunwiuu";
import { useThemeColors } from "../hooks/useThemeColors";

// Type icons
function ServerIcon() {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] shrink-0" style={{ backgroundColor: "#D4E7FF" }}>
      <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
        <path d={svgPaths.p251d5300} fill="#1B7EFF" />
        <path d={svgPaths.p145f1800} fill="#1B7EFF" />
      </svg>
    </div>
  );
}

function EndpointIcon() {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] shrink-0" style={{ backgroundColor: "#D4E7FF" }}>
      <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
        <path d={svgPaths.p1ab4bf00} fill="#1B7EFF" />
        <path d={svgPaths.p24eefc00} fill="#1B7EFF" />
        <path d={svgPaths.p5187a00} fill="#1B7EFF" />
        <path d={svgPaths.p2edab700} fill="#1B7EFF" />
      </svg>
    </div>
  );
}

function ApplicationIcon() {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] shrink-0" style={{ backgroundColor: "#EDECF9" }}>
      <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
        <path d={svgPaths.p29e95d00} fill="#474E62" />
        <path d={svgPaths.p1a778c00} fill="#474E62" />
        <path d={svgPaths.p1060ab00} fill="#474E62" />
      </svg>
    </div>
  );
}

function StorageIcon() {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-[5px] shrink-0" style={{ backgroundColor: "#D4E7FF" }}>
      <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 9 9.75">
        <path d={svgPaths.p22888e80} fill="#1B7EFF" />
      </svg>
    </div>
  );
}

const typeIcons: Record<string, React.ReactNode> = {
  Server: <ServerIcon />,
  Endpoint: <EndpointIcon />,
  Application: <ApplicationIcon />,
  Storage: <StorageIcon />,
};

function SortIcon({ color }: { color: string }) {
  return (
    <div className="shrink-0 w-[7px] h-[14px]">
      <svg className="block w-full h-full" fill="none" viewBox="0 0 7 14.1244">
        <path d={svgPaths.p1c8cf7f0} fill={color} />
        <path d={svgPaths.p39d4d900} fill={color} />
      </svg>
    </div>
  );
}

function MoreIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 w-[16px] h-[16px]">
      <div className="absolute" style={{ inset: "16.67% 41.67%" }}>
        <svg className="block w-full h-full" fill="none" viewBox="0 0 2.667 10.667">
          <path d={svgPaths.pdf1da30} fill={color} />
        </svg>
      </div>
    </div>
  );
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  description: string;
  criticality: number;
  entities: number;
  created: string;
  updated: string;
}

export const initialAssets: Asset[] = [
  { id: "1", name: "MS-WKS-14", type: "Server", description: "Main API gateway for external services", criticality: 10, entities: 4, created: "05/15/23 14:30", updated: "12/20/24 09:15" },
  { id: "2", name: "NY-WKS-38", type: "Endpoint", description: "Endpoint asset description...", criticality: 8, entities: 6, created: "06/22/23 10:45", updated: "12/18/24 16:20" },
  { id: "3", name: "MS-WKS-18", type: "Application", description: "User authentication and authorization", criticality: 5, entities: 8, created: "07/10/23 08:00", updated: "12/15/24 11:30" },
  { id: "4", name: "CO-WKS-22", type: "Storage", description: "Cloud-based file storage system", criticality: 10, entities: 4, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
  { id: "5", name: "DB-SRV-01", type: "Server", description: "Database server for production", criticality: 3, entities: 4, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
  { id: "6", name: "APP-WEB-12", type: "Application", description: "Customer-facing web application", criticality: 8, entities: 4, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
  { id: "7", name: "STR-AWS-05", type: "Storage", description: "AWS S3 bucket for backups", criticality: 5, entities: 2, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
  { id: "8", name: "EP-LAP-88", type: "Endpoint", description: "Employee laptop workstation", criticality: 3, entities: 12, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
  { id: "9", name: "SRV-MAIL-03", type: "Server", description: "Email server infrastructure", criticality: 10, entities: 4, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
  { id: "10", name: "STR-NAS-22", type: "Storage", description: "Network attached storage device", criticality: 5, entities: 2, created: "08/05/23 13:20", updated: "12/10/24 14:45" },
];

function ContextMenu({
  x,
  y,
  onClose,
  onDelete,
  onManageConnections,
  colors,
}: {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onManageConnections: () => void;
  colors: ReturnType<typeof useThemeColors>;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuItemStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    color: colors.text,
    lineHeight: "1.4",
    whiteSpace: "nowrap" as const,
    textAlign: "center" as const,
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 rounded-[6px] flex flex-col items-start p-[4px]"
      style={{
        left: x,
        top: y,
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowMenu,
      }}
    >
      {/* Edit */}
      <button
        className="flex gap-[4px] items-center w-full h-[28px] p-[4px] rounded-[6px] cursor-pointer transition-colors duration-150 ease border-none"
        style={{ backgroundColor: colors.bg }}
        onClick={onClose}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
      >
        <div className="relative shrink-0 w-[16px] h-[16px]">
          <svg
            className="absolute block"
            style={{ width: "12.4px", height: "12.4px", top: "9.99%", left: "12.82%" }}
            fill="none"
            viewBox="0 0 12.3991 12.4"
          >
            <path d={contextMenuSvgPaths.p2500aa00} fill={colors.textMuted} />
          </svg>
        </div>
        <span style={menuItemStyle}>Edit</span>
      </button>
      {/* Delete */}
      <button
        className="flex gap-[4px] items-center w-full h-[28px] p-[4px] rounded-[6px] cursor-pointer transition-colors duration-150 ease border-none"
        style={{ backgroundColor: colors.bg }}
        onClick={onDelete}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
      >
        <div className="relative shrink-0 w-[16px] h-[16px]">
          <svg
            className="absolute block"
            style={{ width: "12.5px", height: "13.75px", top: "3.42%", left: "10.94%" }}
            fill="none"
            viewBox="0 0 12.5 13.75"
          >
            <path d={contextMenuSvgPaths.p4954d00} fill={colors.textMuted} />
          </svg>
        </div>
        <span style={menuItemStyle}>Delete</span>
      </button>
      {/* Manage Connections */}
      <button
        className="flex gap-[4px] items-center w-full h-[28px] p-[4px] rounded-[6px] cursor-pointer transition-colors duration-150 ease border-none"
        style={{ backgroundColor: colors.bgSecondary }}
        onClick={onManageConnections}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgTertiary)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
      >
        <div className="relative shrink-0 w-[16px] h-[16px]">
          <svg className="block w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
            <path d={contextMenuSvgPaths.p11df8800} fill={colors.textMuted} />
            <path d={contextMenuSvgPaths.p257c5100} fill={colors.textMuted} />
          </svg>
        </div>
        <span style={menuItemStyle}>Manage Connections</span>
      </button>
    </div>
  );
}

const textStyle14Reg = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "-0.5px",
  lineHeight: "normal",
} as React.CSSProperties;

const textStyle12Reg = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "-0.5px",
  lineHeight: "14px",
} as React.CSSProperties;

interface AssetsTableProps {
  assets: Asset[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onDeleteAsset: (id: string) => void;
  onManageConnections: (id: string) => void;
}

export function AssetsTable({ assets, selectedIds, onToggleSelect, onToggleSelectAll, onDeleteAsset, onManageConnections }: AssetsTableProps) {
  const colors = useThemeColors();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; assetId: string } | null>(null);

  const handleMoreClick = (e: React.MouseEvent, assetId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenu({ x: rect.left - 160, y: rect.bottom + 4, assetId });
  };

  return (
    <div
      className="rounded-[12px] p-[16px] w-full"
      style={{
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadowCard,
      }}
    >
      {/* Table Header */}
      <div className="flex items-center w-full" style={{ borderBottom: `1px solid ${colors.border}` }}>
        {/* Checkbox */}
        <div className="flex h-[30px] items-center justify-center px-[4px] py-[12px] shrink-0">
          <button
            className="block cursor-pointer relative shrink-0 w-[14px] h-[14px] bg-transparent border-none p-0"
            onClick={onToggleSelectAll}
          >
            {selectedIds.size === assets.length && assets.length > 0 ? (
              <div className="absolute inset-0 rounded-[4px] flex items-center justify-center" style={{ backgroundColor: colors.bgBrand }}>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : selectedIds.size > 0 ? (
              <div className="absolute inset-0 rounded-[4px] flex items-center justify-center" style={{ backgroundColor: colors.bgBrand }}>
                <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                  <path d="M1 1H7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ) : (
              <div className="absolute border border-solid inset-0 rounded-[4px]" style={{ borderColor: colors.textMuted }} />
            )}
          </button>
        </div>
        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Name</span>
            <SortIcon color={colors.textMuted} />
          </div>
        </div>
        {/* Type */}
        <div className="w-[140px] shrink-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Type</span>
            <SortIcon color={colors.textMuted} />
          </div>
        </div>
        {/* Description */}
        <div className="w-[320px] shrink-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Description</span>
          </div>
        </div>
        {/* Business Criticality */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Business Criticality</span>
            <SortIcon color={colors.textMuted} />
          </div>
        </div>
        {/* Business Entities */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Business Entities</span>
            <SortIcon color={colors.textMuted} />
          </div>
        </div>
        {/* Created */}
        <div className="w-[110px] shrink-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Created</span>
            <SortIcon color={colors.textMuted} />
          </div>
        </div>
        {/* Updated */}
        <div className="w-[110px] shrink-0">
          <div className="flex gap-[10px] items-center px-[8px] py-[7px]">
            <span style={{ ...textStyle12Reg, color: colors.textMuted }}>Updated</span>
            <SortIcon color={colors.textMuted} />
          </div>
        </div>
        {/* Actions spacer */}
        <div className="flex h-[30px] items-center justify-center px-[4px] py-[12px] shrink-0" />
      </div>

      {/* Table Rows */}
      {assets.map((asset) => {
        const isSelected = selectedIds.has(asset.id);
        const rowBg = isSelected
          ? "rgba(27,126,255,0.08)"
          : colors.bg;
        return (
          <div
            key={asset.id}
            className="flex items-center w-full transition-colors duration-150 ease group"
            style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: rowBg }}
            onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = colors.bgSecondary; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isSelected ? "rgba(27,126,255,0.08)" : colors.bg; }}
          >
            {/* Checkbox */}
            <div className="flex h-[42px] items-center justify-center px-[4px] py-[12px] shrink-0">
              <button
                className="block cursor-pointer relative shrink-0 w-[14px] h-[14px] bg-transparent border-none p-0"
                onClick={() => onToggleSelect(asset.id)}
              >
                {isSelected ? (
                  <div className="absolute inset-0 rounded-[4px] flex items-center justify-center" style={{ backgroundColor: colors.bgBrand }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="absolute border border-solid inset-0 rounded-[4px]" style={{ borderColor: colors.textMuted }} />
                )}
              </button>
            </div>
            {/* Name */}
            <div className="flex-1 min-w-0 h-[42px]">
              <div className="flex items-center h-full pl-[8px] pr-[32px] py-[12px]">
                <span style={{ ...textStyle14Reg, color: colors.text, fontWeight: 600, whiteSpace: "nowrap" }}>
                  {asset.name}
                </span>
              </div>
            </div>
            {/* Type */}
            <div className="w-[140px] shrink-0 h-[42px]">
              <div className="flex gap-[6px] items-center h-full pl-[8px] pr-[32px] py-[12px]">
                {typeIcons[asset.type]}
                <span style={{ ...textStyle14Reg, color: colors.textSecondary, whiteSpace: "nowrap" }}>
                  {asset.type}
                </span>
              </div>
            </div>
            {/* Description */}
            <div className="w-[320px] shrink-0 h-[42px]">
              <div className="flex items-center h-full pl-[8px] pr-[32px] py-[12px]">
                <span
                  className="truncate"
                  style={{ ...textStyle14Reg, color: colors.textSecondary, whiteSpace: "nowrap" }}
                >
                  {asset.description}
                </span>
              </div>
            </div>
            {/* Business Criticality */}
            <div className="flex-1 min-w-0 h-[42px]">
              <div className="flex items-center h-full px-[8px] py-[12px]">
                <div
                  className="flex items-center justify-center rounded-[100px] shrink-0"
                  style={{
                    backgroundColor: "#FFEFF2",
                    padding: "3px 10px",
                    minWidth: "28px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#D62828",
                      letterSpacing: "-0.5px",
                      lineHeight: "normal",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {asset.criticality}
                  </span>
                </div>
              </div>
            </div>
            {/* Business Entities */}
            <div className="flex-1 min-w-0 h-[42px]">
              <div className="flex items-center h-full pl-[8px] pr-[32px] py-[12px]">
                <a
                  href="#"
                  className="no-underline hover:underline"
                  style={{
                    ...textStyle14Reg,
                    color: colors.textBrand,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {asset.entities}
                </a>
              </div>
            </div>
            {/* Created */}
            <div className="w-[110px] shrink-0 h-[42px]">
              <div className="flex items-center h-full pl-[8px] pr-[32px] py-[12px]">
                <span style={{ ...textStyle12Reg, color: colors.textMuted, whiteSpace: "nowrap" }}>
                  {asset.created}
                </span>
              </div>
            </div>
            {/* Updated */}
            <div className="w-[110px] shrink-0 h-[42px]">
              <div className="flex items-center h-full pl-[8px] pr-[32px] py-[12px]">
                <span style={{ ...textStyle12Reg, color: colors.textMuted, whiteSpace: "nowrap" }}>
                  {asset.updated}
                </span>
              </div>
            </div>
            {/* Actions */}
            <div className="flex h-[42px] items-center justify-center px-[4px] py-[12px] shrink-0">
              <button
                className="cursor-pointer bg-transparent border-none p-0"
                onClick={(e) => handleMoreClick(e, asset.id)}
              >
                <MoreIcon color={colors.textSecondary} />
              </button>
            </div>
          </div>
        );
      })}

      {/* Pagination */}
      <div className="flex items-center justify-center h-[52px] gap-[4px]">
        {/* Page 1 - Active */}
        <button
          className="flex items-center justify-center w-[32px] h-[28px] rounded-[6px] cursor-pointer"
          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.borderBrand}` }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: colors.textBrand,
              letterSpacing: "-0.5px",
            }}
          >
            1
          </span>
        </button>
        {[2, 3, 4].map((page) => (
          <button
            key={page}
            className="flex items-center justify-center w-[31px] h-[28px] rounded-[6px] bg-transparent border-none cursor-pointer transition-colors duration-150 ease"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: colors.textMuted,
                letterSpacing: "-0.5px",
              }}
            >
              {page}
            </span>
          </button>
        ))}
        {/* Ellipsis */}
        <span
          className="flex items-center justify-center w-[31px] h-[28px]"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: colors.textMuted,
            letterSpacing: "-0.5px",
          }}
        >
          ...
        </span>
        {/* Last page */}
        <button
          className="flex items-center justify-center w-[31px] h-[28px] rounded-[6px] bg-transparent border-none cursor-pointer transition-colors duration-150 ease"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: colors.textMuted,
              letterSpacing: "-0.5px",
            }}
          >
            125
          </span>
        </button>
        {/* Next button */}
        <button
          className="flex gap-[4px] items-center justify-center h-[28px] px-[12px] rounded-[6px] cursor-pointer transition-colors duration-150 ease"
          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: colors.textSecondary,
              letterSpacing: "-0.5px",
              whiteSpace: "nowrap",
            }}
          >
            Next
          </span>
          <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 7.4 4.43" style={{ transform: "rotate(-90deg)" }}>
            <path d={svgPaths.p15660b00} fill={colors.textSecondary} />
          </svg>
        </button>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          colors={colors}
          onClose={() => setContextMenu(null)}
          onDelete={() => {
            onDeleteAsset(contextMenu.assetId);
            setContextMenu(null);
          }}
          onManageConnections={() => {
            onManageConnections(contextMenu.assetId);
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
}
