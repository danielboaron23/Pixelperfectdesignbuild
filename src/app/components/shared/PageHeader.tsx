import React, { useState } from "react";
import svgPaths from "../../../imports/svg-8hpunv596b";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

interface PageHeaderProps {
  title: string;
  counter: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filterElements?: React.ReactNode;
  primaryAction?: { label: string; onClick?: () => void };
  showExport?: boolean;
  extraActions?: React.ReactNode;
}

export function PageHeader({
  title,
  counter,
  searchPlaceholder = "Search...",
  searchValue: controlledSearchValue,
  onSearchChange,
  filterElements,
  primaryAction,
  showExport = true,
  extraActions,
}: PageHeaderProps) {
  const colors = useThemeColors();
  const [internalSearch, setInternalSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const searchValue = controlledSearchValue !== undefined ? controlledSearchValue : internalSearch;
  const handleSearchChange = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    else setInternalSearch(val);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: Title */}
      <div className="flex gap-[12px] items-center whitespace-nowrap" style={{ letterSpacing: "-0.5px", lineHeight: "normal" }}>
        <h3
          className="m-0"
          style={{
            fontFamily: font,
            fontSize: "20px",
            fontWeight: 700,
            color: colors.text,
            lineHeight: "100%",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            fontFamily: font,
            fontSize: "14px",
            fontWeight: 400,
            color: colors.textMuted,
            letterSpacing: "-0.5px",
          }}
        >
          {counter}
        </span>
      </div>

      {/* Right: Search, filters, actions */}
      <div className="flex gap-[12px] items-center">
        <div className="flex gap-[8px] items-center">
          {/* Search */}
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
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-transparent border-none outline-none p-0"
                style={{ fontFamily: font, fontSize: "14px", fontWeight: 400, color: colors.text, letterSpacing: "-0.5px", lineHeight: "normal" }}
              />
            </div>
          </div>

          {/* Filter elements (rendered from parent) */}
          {filterElements}
        </div>

        {/* Separator */}
        <div className="flex h-[24px] items-center justify-center shrink-0 w-0">
          <div className="rotate-90 flex-none">
            <svg className="block w-[24px] h-[1px]" fill="none" viewBox="0 0 24 1">
              <line opacity="0.3" stroke={colors.textMuted} x2="24" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        <div className="flex gap-[8px] items-center">
          {showExport && (
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
              <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 500, color: colors.text, lineHeight: 1.4, whiteSpace: "nowrap" }}>
                Export
              </span>
            </button>
          )}

          {primaryAction && (
            <button
              className="flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] rounded-[6px] shrink-0 cursor-pointer transition-colors duration-150 ease hover:bg-[#1565D8]"
              style={{ backgroundColor: colors.bgBrand, border: "none" }}
              onClick={primaryAction.onClick}
            >
              <div className="relative shrink-0 w-[16px] h-[16px]">
                <div className="absolute" style={{ inset: "20.83%" }}>
                  <svg className="block w-full h-full" fill="none" viewBox="0 0 9.333 9.333">
                    <path d={svgPaths.p398c8880} fill="white" />
                  </svg>
                </div>
              </div>
              <span style={{ fontFamily: font, fontSize: "12px", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.4, whiteSpace: "nowrap" }}>
                {primaryAction.label}
              </span>
            </button>
          )}

          {extraActions}
        </div>
      </div>
    </div>
  );
}
