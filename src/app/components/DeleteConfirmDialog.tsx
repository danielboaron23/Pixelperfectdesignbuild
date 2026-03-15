import React from "react";
import svgPaths from "../../imports/svg-smp716qknm";
import { useThemeColors } from "../hooks/useThemeColors";

interface DeleteConfirmDialogProps {
  open: boolean;
  assetNames: string[];
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({
  open,
  assetNames,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const colors = useThemeColors();
  if (!open) return null;

  const count = assetNames.length;
  const isSingle = count === 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 24, 55, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="flex flex-col rounded-[12px]"
        style={{
          width: "420px",
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadowMenu,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[16px] py-[12px] shrink-0"
          style={{
            borderBottom: `1px solid ${colors.border}`,
            borderRadius: "12px 12px 0 0",
            height: "56px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: colors.text,
              letterSpacing: "-0.32px",
              lineHeight: "normal",
            }}
          >
            Delete assets
          </span>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-[24px] h-[24px] bg-transparent border-none cursor-pointer p-0"
          >
            <svg width="13.19" height="13.19" viewBox="0 0 13.1885 13.1885" fill="none">
              <path d={svgPaths.p17985b00} fill={colors.text} />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center justify-center p-[32px]">
          {/* Trash Icon Circle */}
          <div className="shrink-0 w-[104px] h-[104px]">
            <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
              <circle cx="52" cy="52" r="52" fill="#FFEFF2" />
              <path d={svgPaths.p3a92ea00} fill="#D62828" opacity="0.4" />
              <path d={svgPaths.pf05a800} fill="#D62828" />
              <path d={svgPaths.pf98f00} fill="#D62828" />
              <path d={svgPaths.p36552bb0} fill="#D62828" />
            </svg>
          </div>

          {/* Message */}
          <div className="mt-[12px] w-full text-center">
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: colors.text,
                letterSpacing: "-0.5px",
                lineHeight: "normal",
              }}
            >
              {isSingle
                ? `Are you sure you want to delete asset <${assetNames[0]}>? `
                : `Are you sure you want to delete ${count} assets? `}
            </span>
            <br />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: colors.text,
                letterSpacing: "-0.32px",
                lineHeight: "normal",
              }}
            >
              This action cannot be undone.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end p-[8px] gap-[8px]"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          {/* Cancel */}
          <button
            onClick={onClose}
            className="flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] rounded-[6px] cursor-pointer transition-colors duration-150 ease"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: colors.text,
                lineHeight: "1.4",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Cancel
            </span>
          </button>

          {/* Delete */}
          <button
            onClick={onConfirm}
            className="flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] rounded-[6px] cursor-pointer transition-colors duration-150 ease"
            style={{ backgroundColor: colors.bg, border: "1px solid #D62828" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFEFF2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#D62828",
                lineHeight: "1.4",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
