import React, { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-8hpunv596b";
import svgPathsFilter from "../../imports/svg-cuzf6sz2e9";
import svgPathsCriticality from "../../imports/svg-81kpo2wyk5";
import { AddAssetDialog, SuccessToast } from "./AddAssetDialog";
import { useThemeColors } from "../hooks/useThemeColors";

interface NewAssetData {
  name: string;
  type: string;
  description: string;
  criticality: string;
}

interface HeaderProps {
  onAddAsset: (data: NewAssetData) => void;
  totalAssets: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedAssetType: string;
  onAssetTypeChange: (type: string) => void;
  selectedCriticality: string;
  onCriticalityChange: (criticality: string) => void;
}

export function Header({ 
  onAddAsset, 
  totalAssets,
  searchValue,
  onSearchChange,
  selectedAssetType,
  onAssetTypeChange,
  selectedCriticality,
  onCriticalityChange,
}: HeaderProps) {
  const colors = useThemeColors();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [successName, setSuccessName] = useState<string | null>(null);
  const [assetTypeOpen, setAssetTypeOpen] = useState(false);
  const [criticalityOpen, setCriticalityOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const criticalityRef = useRef<HTMLDivElement>(null);

  const assetTypes = ["Asset type", "Database", "Server", "Application", "Storage", "Network"];
  const criticalityLevels = ["Business Criticality", "Low", "Medium", "High", "Critical"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAssetTypeOpen(false);
      }
      if (criticalityRef.current && !criticalityRef.current.contains(event.target as Node)) {
        setCriticalityOpen(false);
      }
    };

    if (assetTypeOpen || criticalityOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [assetTypeOpen, criticalityOpen]);

  return (
    <>
    <div className="flex items-center justify-between w-full">
      {/* Left: Title */}
      <div className="flex gap-[12px] items-center whitespace-nowrap" style={{ letterSpacing: "-0.5px", lineHeight: "normal" }}>
        <h3
          className="m-0"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "20px",
            fontWeight: 700,
            color: colors.text,
            lineHeight: "100%",
            letterSpacing: "-0.5px",
          }}
        >
          Assets
        </h3>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: colors.textMuted,
            letterSpacing: "-0.5px",
          }}
        >
          {totalAssets} total assets
        </span>
      </div>

      {/* Right: Search, filters, actions */}
      <div className="flex gap-[12px] items-center">
        {/* Search + Filters group */}
        <div className="flex gap-[8px] items-center">
          {/* Search Input */}
          <div
            className="relative flex h-[28px] items-center justify-between px-[8px] py-[4px] rounded-[6px] shrink-0 w-[180px]"
            style={{
              backgroundColor: colors.bg,
              border: searchFocused ? `1px solid ${colors.borderBrand}` : `1px solid ${colors.border}`,
              boxShadow: searchFocused ? "0 0 0 3px rgba(27,126,255,0.1)" : "none",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
            }}
          >
            <div className="flex gap-[6px] items-center w-full">
              <div className="relative shrink-0 w-[16px] h-[16px]">
                <svg className="absolute block w-full h-full" fill="none" viewBox="0 0 12.8 12.8" style={{ inset: "9.12% 10.84% 10.88% 9.17%", width: "auto", height: "auto" }}>
                  <path d={svgPaths.p92dba00} fill={colors.textMuted} />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search assets..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-transparent border-none outline-none p-0"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: colors.text,
                  letterSpacing: "-0.5px",
                  lineHeight: "normal",
                }}
              />
            </div>
          </div>

          {/* Asset type filter */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex h-[28px] items-center justify-between px-[8px] py-[2px] rounded-[6px] shrink-0 w-[140px] cursor-pointer transition-colors duration-150 ease"
              style={{
                backgroundColor: colors.bg,
                border: assetTypeOpen ? `1px solid ${colors.borderBrand}` : `1px solid ${colors.border}`,
              }}
              onClick={() => setAssetTypeOpen(!assetTypeOpen)}
              onMouseEnter={(e) => { if (!assetTypeOpen) e.currentTarget.style.backgroundColor = colors.bgSecondary; }}
              onMouseLeave={(e) => { if (!assetTypeOpen) e.currentTarget.style.backgroundColor = colors.bg; }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: colors.textSecondary,
                  letterSpacing: "-0.5px",
                  lineHeight: "14px",
                }}
              >
                {selectedAssetType}
              </span>
              <svg className="w-[16px] h-[16px] shrink-0" fill="none" viewBox="0 0 7.4 4.43">
                <path d={svgPaths.p15660b00} fill={colors.textMuted} />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {assetTypeOpen && (
              <div
                className="absolute top-[calc(100%+4px)] left-0 right-0 rounded-[6px] overflow-hidden z-50"
                style={{
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                  boxShadow: colors.shadowMenu,
                }}
              >
                <div className="flex flex-col gap-[4px] p-[4px]">
                  {assetTypes.map((type) => (
                    <button
                      key={type}
                      className="cursor-pointer min-w-[148px] relative rounded-[4px] shrink-0 w-full transition-colors duration-150 ease border-none"
                      onClick={() => {
                        onAssetTypeChange(type);
                        setAssetTypeOpen(false);
                      }}
                      style={{
                        backgroundColor: type === selectedAssetType ? colors.bgTertiary : colors.bg,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = type === selectedAssetType ? colors.bgTertiary : colors.bgSecondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = type === selectedAssetType ? colors.bgTertiary : colors.bg;
                      }}
                    >
                      <div className="flex items-center justify-between px-[12px] py-[4px]">
                        <p
                          className="leading-[normal] max-w-[202px] min-w-[90px] shrink-0 text-[14px] text-left tracking-[-0.5px] whitespace-nowrap m-0"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            color: type === selectedAssetType ? colors.text : colors.textMuted,
                          }}
                        >
                          {type}
                        </p>
                        <div
                          className="relative shrink-0 size-[20px]"
                          style={{ opacity: type === selectedAssetType ? 1 : 0 }}
                        >
                          <div className="absolute inset-[26.77%_18.02%_26.77%_17.97%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8025 9.29167">
                              <path d={svgPathsFilter.p1c094840} fill={colors.textBrand} />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Business Criticality filter */}
          <div ref={criticalityRef} className="relative">
            <button
              className="flex h-[28px] items-center justify-between px-[8px] py-[2px] rounded-[6px] shrink-0 w-[140px] cursor-pointer transition-colors duration-150 ease"
              style={{
                backgroundColor: colors.bg,
                border: criticalityOpen ? `1px solid ${colors.borderBrand}` : `1px solid ${colors.border}`,
              }}
              onClick={() => setCriticalityOpen(!criticalityOpen)}
              onMouseEnter={(e) => { if (!criticalityOpen) e.currentTarget.style.backgroundColor = colors.bgSecondary; }}
              onMouseLeave={(e) => { if (!criticalityOpen) e.currentTarget.style.backgroundColor = colors.bg; }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: colors.textSecondary,
                  letterSpacing: "-0.5px",
                  lineHeight: "14px",
                }}
              >
                {selectedCriticality}
              </span>
              <svg className="w-[16px] h-[16px] shrink-0" fill="none" viewBox="0 0 7.4 4.43">
                <path d={svgPaths.p15660b00} fill={colors.textMuted} />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {criticalityOpen && (
              <div
                className="absolute top-[calc(100%+4px)] left-0 right-0 rounded-[6px] overflow-hidden z-50"
                style={{
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                  boxShadow: colors.shadowMenu,
                }}
              >
                <div className="flex flex-col gap-[4px] p-[4px]">
                  {criticalityLevels.map((level) => (
                    <button
                      key={level}
                      className="cursor-pointer min-w-[148px] relative rounded-[4px] shrink-0 w-full transition-colors duration-150 ease border-none"
                      onClick={() => {
                        onCriticalityChange(level);
                        setCriticalityOpen(false);
                      }}
                      style={{
                        backgroundColor: level === selectedCriticality ? colors.bgTertiary : colors.bg,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = level === selectedCriticality ? colors.bgTertiary : colors.bgSecondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = level === selectedCriticality ? colors.bgTertiary : colors.bg;
                      }}
                    >
                      <div className="flex items-center justify-between px-[12px] py-[4px]">
                        <p
                          className="leading-[normal] max-w-[202px] min-w-[90px] shrink-0 text-[14px] text-left tracking-[-0.5px] whitespace-nowrap m-0"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            color: level === selectedCriticality ? colors.text : colors.textMuted,
                          }}
                        >
                          {level}
                        </p>
                        <div
                          className="shrink-0 w-[20px] h-[20px]"
                          style={{ opacity: level === selectedCriticality ? 1 : 0 }}
                        >
                          <div className="absolute inset-[26.77%_18.02%_26.77%_17.97%]">
                            <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8025 9.29167">
                              <path d={svgPathsFilter.p1c094840} fill={colors.textBrand} />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="flex h-[24px] items-center justify-center shrink-0 w-0">
          <div className="rotate-90 flex-none">
            <svg className="block w-[24px] h-[1px]" fill="none" viewBox="0 0 24 1">
              <line opacity="0.3" stroke={colors.textMuted} x2="24" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* Export + New Asset */}
        <div className="flex gap-[8px] items-center">
          {/* Export button */}
          <button
            className="flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] rounded-[6px] shrink-0 cursor-pointer transition-colors duration-150 ease"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
          >
            <div className="relative shrink-0 w-[16px] h-[16px]">
              <div className="absolute" style={{ inset: "62.5% 16.67% 16.67% 16.67%" }}>
                <svg className="block w-full h-full" fill="none" viewBox="0 0 10.667 3.333">
                  <path d={svgPaths.p34f664f0} fill={colors.textMuted} />
                </svg>
              </div>
              <div className="absolute flex items-center justify-center" style={{ inset: "18.44% 30.31% 33.65% 30.31%" }}>
                <div className="-scale-y-100 flex-none" style={{ width: "7.875px", height: "9.583px" }}>
                  <svg className="block w-full h-full" fill="none" viewBox="0 0 6.3 7.667">
                    <path d={svgPaths.p304178e0} fill={colors.textMuted} />
                  </svg>
                </div>
              </div>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: colors.text,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
              }}
            >
              Export
            </span>
          </button>

          {/* + New Asset button */}
          <button
            className="flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] rounded-[6px] shrink-0 cursor-pointer transition-colors duration-150 ease hover:bg-[#1565D8]"
            style={{ backgroundColor: colors.bgBrand, border: "none" }}
            onClick={() => setShowAddAsset(true)}
          >
            <div className="relative shrink-0 w-[16px] h-[16px]">
              <div className="absolute" style={{ inset: "20.83%" }}>
                <svg className="block w-full h-full" fill="none" viewBox="0 0 9.333 9.333">
                  <path d={svgPaths.p398c8880} fill="white" />
                </svg>
              </div>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: "#FFFFFF",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
              }}
            >
              New Asset
            </span>
          </button>
        </div>
      </div>
    </div>

      {/* Add Asset Dialog */}
      <AddAssetDialog
        open={showAddAsset}
        onClose={() => setShowAddAsset(false)}
        onSuccess={(data) => {
          onAddAsset(data);
          setSuccessName(data.name);
          setTimeout(() => setSuccessName(null), 5000);
        }}
      />

      {/* Success Toast */}
      {successName && (
        <SuccessToast name={successName} onClose={() => setSuccessName(null)} />
      )}
    </>
  );
}