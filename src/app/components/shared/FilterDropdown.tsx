import React, { useState, useRef, useEffect } from "react";
import svgPaths from "../../../imports/svg-8hpunv596b";
import { useThemeColors } from "../../hooks/useThemeColors";

const font = "'DM Sans', sans-serif";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
  width?: string;
}

export function FilterDropdown({ label, options, value, onChange, width = "140px" }: FilterDropdownProps) {
  const colors = useThemeColors();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const displayLabel = value || label;
  const hasValue = value !== null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-[28px] items-center justify-between px-[8px] py-[2px] rounded-[6px] shrink-0 cursor-pointer transition-colors duration-150 ease"
        style={{
          backgroundColor: colors.bg,
          border: open ? `1px solid ${colors.borderBrand}` : `1px solid ${colors.border}`,
          width,
          boxShadow: open ? "0 0 0 3px rgba(27,126,255,0.1)" : "none",
          transition: "border-color 150ms ease, box-shadow 150ms ease",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.backgroundColor = colors.bgSecondary; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.backgroundColor = colors.bg; }}
      >
        <span
          style={{
            fontFamily: font,
            fontSize: "12px",
            fontWeight: hasValue ? 500 : 400,
            color: hasValue ? colors.text : colors.textMuted,
            letterSpacing: "-0.5px",
            lineHeight: "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayLabel}
        </span>
        <div className="flex items-center gap-[2px] shrink-0">
          {hasValue && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                setOpen(false);
              }}
              className="flex items-center justify-center cursor-pointer rounded-full transition-colors duration-150 ease"
              style={{ width: "14px", height: "14px" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgTertiary)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1 1L7 7M7 1L1 7" stroke={colors.textMuted} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          )}
          <svg
            className="shrink-0 transition-transform duration-150 ease"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", width: "16px", height: "16px" }}
            fill="none"
            viewBox="0 0 7.4 4.43"
          >
            <path d={svgPaths.p15660b00} fill={colors.textMuted} />
          </svg>
        </div>
      </button>

      {open && (
        <div
          className="absolute top-[32px] left-0 z-[100] rounded-[8px] overflow-hidden"
          style={{
            width: Math.max(parseInt(width), 160) + "px",
            border: `1px solid ${colors.border}`,
            boxShadow: colors.shadowMenu,
            padding: "4px",
            backgroundColor: colors.bg,
          }}
        >
          {/* All / Clear option */}
          <button
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
            className="flex items-center w-full px-[12px] py-[6px] rounded-[4px] cursor-pointer border-none transition-colors duration-150 ease"
            style={{ height: "28px", backgroundColor: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <span
              style={{
                fontFamily: font,
                fontSize: "14px",
                fontWeight: value === null ? 600 : 400,
                color: value === null ? colors.textBrand : colors.textSecondary,
                letterSpacing: "-0.5px",
                lineHeight: "normal",
              }}
            >
              All
            </span>
          </button>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: colors.border, margin: "2px 0" }} />

          {/* Options */}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="flex items-center w-full px-[12px] py-[6px] rounded-[4px] cursor-pointer border-none transition-colors duration-150 ease"
              style={{ height: "28px", backgroundColor: "transparent" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span
                style={{
                  fontFamily: font,
                  fontSize: "14px",
                  fontWeight: value === opt ? 600 : 400,
                  color: value === opt ? colors.textBrand : colors.textSecondary,
                  letterSpacing: "-0.5px",
                  lineHeight: "normal",
                }}
              >
                {opt}
              </span>
              {value === opt && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto shrink-0">
                  <path d="M3 7L6 10L11 4" stroke={colors.textBrand} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
