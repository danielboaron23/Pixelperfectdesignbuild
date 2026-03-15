import React, { useState } from "react";
import svgPaths from "../../imports/svg-mgxx5nra7e";
import { useThemeColors } from "../hooks/useThemeColors";

interface BusinessEntity {
  id: string;
  name: string;
  type: string;
  location: string;
}

const mockEntities: BusinessEntity[] = [
  { id: "1", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "2", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "3", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "4", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "5", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "6", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "7", name: "SecureNet AG", type: "Server", location: "Zurich, Switzerland" },
];

interface ManageBusinessEntitiesDialogProps {
  open: boolean;
  assetName: string;
  onClose: () => void;
  onSave: (selectedEntityNames: string[]) => void;
}

const fontVar = { fontVariationSettings: "'opsz' 14" } as React.CSSProperties;

function ServerIcon() {
  return (
    <div className="bg-[#d4e7ff] content-stretch flex items-center justify-center px-[8.333px] py-[5px] relative rounded-[5px] shrink-0 size-[20px]">
      <div className="relative shrink-0 size-[12px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p251d5300} fill="#1B7EFF" />
          <path d={svgPaths.p145f1800} fill="#1B7EFF" />
        </svg>
      </div>
    </div>
  );
}

export function ManageBusinessEntitiesDialog({
  open,
  assetName,
  onClose,
  onSave,
}: ManageBusinessEntitiesDialogProps) {
  const colors = useThemeColors();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(["1", "2"]));
  const [search, setSearch] = useState("");

  if (!open) return null;

  const toggleEntity = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredEntities.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEntities.map((e) => e.id)));
    }
  };

  const filteredEntities = mockEntities.filter((e) => {
    return !search || e.name.toLowerCase().includes(search.toLowerCase());
  });

  const selectedEntities = mockEntities.filter((e) => selectedIds.has(e.id));

  const handleSave = () => {
    onSave(selectedEntities.map((e) => e.name));
    resetState();
  };

  const resetState = () => {
    setStep(1);
    setSelectedIds(new Set(["1", "2"]));
    setSearch("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 24, 55, 0.4)" }}
      onClick={handleClose}
    >
      <div
        className="flex flex-col rounded-[12px]"
        style={{
          width: "830px",
          height: "570px",
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadowMenu,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="h-[56px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full"
          style={{ backgroundColor: colors.bg }}
        >
          <div
            aria-hidden="true"
            className="absolute border-b border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]"
            style={{ borderColor: colors.border }}
          />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative size-full">
              <p
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[16px] tracking-[-0.32px] whitespace-nowrap"
                style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.text }}
              >
                Manage Asset's Business Entities
              </p>
              <button
                onClick={handleClose}
                className="relative shrink-0 size-[24px] bg-transparent border-none cursor-pointer p-0"
              >
                <div className="absolute inset-[22.5%_22.5%_22.55%_22.55%]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1885 13.1885">
                    <path d={svgPaths.p17985b00} fill={colors.text} />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-0 relative w-full">
          {/* Side Menu */}
          <div className="content-stretch flex flex-col items-center relative shrink-0">
            {/* Step 1 */}
            <div
              className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[24px] py-[12px] relative shrink-0 w-[174px]"
              style={{ backgroundColor: step === 1 ? colors.bgSecondary : colors.bg }}
            >
              {step === 1 && (
                <div aria-hidden="true" className="absolute border-[#1b7eff] border-l-4 border-solid inset-0 pointer-events-none" />
              )}
              <div className="relative shrink-0 size-[24px]">
                {step === 2 ? (
                  /* Completed checkmark */
                  <div className="absolute bg-[#d4e7ff] inset-0 rounded-[13.479px]">
                    <div className="absolute inset-[37.5%_31.25%]">
                      <div className="absolute inset-[-14.58%_-9.72%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.75 7.75">
                          <path d="M9.875 0.875002L3.57502 6.875L0.875002 4.30356" stroke="#1B7EFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute bg-[#1b7eff] content-stretch flex flex-col items-center justify-center left-0 px-[8px] py-[3px] rounded-[13.479px] size-[24px] top-0">
                    <p
                      className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap"
                      style={{ ...fontVar, fontWeight: 600, lineHeight: "normal" }}
                    >
                      1
                    </p>
                  </div>
                )}
              </div>
              <p
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                style={{
                  ...fontVar,
                  fontWeight: step === 1 ? 600 : 400,
                  color: step === 1 ? colors.text : colors.textSecondary,
                  lineHeight: "normal",
                }}
              >
                Manage
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[24px] py-[12px] relative shrink-0 w-[174px]"
              style={{ backgroundColor: step === 2 ? colors.bgSecondary : colors.bg }}
            >
              {step === 2 && (
                <div aria-hidden="true" className="absolute border-[#1b7eff] border-l-4 border-solid inset-0 pointer-events-none" />
              )}
              <div className="relative shrink-0 size-[24px]">
                <div
                  className="absolute content-stretch flex flex-col items-center justify-center left-0 px-[8px] py-[3px] rounded-[13.479px] size-[24px] top-0"
                  style={{ backgroundColor: step === 2 ? "#1b7eff" : colors.bgTertiary }}
                >
                  <p
                    className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                    style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: step === 2 ? "white" : colors.textDisabled }}
                  >
                    2
                  </p>
                </div>
              </div>
              <p
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                style={{
                  ...fontVar,
                  fontWeight: step === 2 ? 600 : 400,
                  color: step === 2 ? colors.text : colors.textMuted,
                  lineHeight: "normal",
                }}
              >
                {`Review & save`}
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div
            className="flex-[1_0_0] h-full min-h-0 min-w-0 relative overflow-hidden"
            style={{ backgroundColor: colors.bgSecondary }}
          >
            <div aria-hidden="true" className="absolute border-l border-solid inset-0 pointer-events-none" style={{ borderColor: colors.border }} />

            {step === 1 ? (
              <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full overflow-auto">
                {/* Asset label + Search */}
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <div
                    className="content-stretch flex font-['DM_Sans',sans-serif] gap-[8px] items-start relative shrink-0 text-[16px] text-center tracking-[-0.32px] whitespace-nowrap"
                    style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textMuted }}
                  >
                    <p className="relative shrink-0">Asset:</p>
                    <p className="relative shrink-0">{assetName}</p>
                  </div>

                  {/* Search + Filter */}
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div
                      className="flex-[1_0_0] h-[32px] min-h-0 min-w-0 relative rounded-[6px]"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
                          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
                            <div className="relative shrink-0 size-[16px]">
                              <div className="absolute inset-[9.12%_10.84%_10.88%_9.17%]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7994 12.8">
                                  <path d={svgPaths.p92dba00} fill="#A1B2BF" />
                                </svg>
                              </div>
                            </div>
                            <input
                              type="text"
                              placeholder="Search..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              className="flex-1 bg-transparent border-none outline-none font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px] placeholder:text-[#8f97ac]"
                              style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.text }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="content-stretch cursor-pointer flex gap-[12px] h-[32px] items-center px-[8px] py-[4px] relative rounded-[6px] shrink-0 border-none"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
                      <p
                        className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-left tracking-[-0.5px] whitespace-nowrap"
                        style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textMuted }}
                      >
                        Business Entity type
                      </p>
                      <div className="relative shrink-0 size-[18px]">
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.978px] left-[calc(50%-0.34px)] top-[calc(50%-0.21px)] w-[8.326px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.32646 4.97822">
                            <path d={svgPaths.p3d861600} fill="#8F97AC" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Business Entities label + Create */}
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <p
                      className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-right tracking-[-0.5px] whitespace-nowrap"
                      style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textSecondary }}
                    >
                      Business Entities
                    </p>
                    <button className="content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0 bg-transparent border-none cursor-pointer">
                      <div className="relative shrink-0 size-[16px]">
                        <div className="absolute inset-[20.83%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                            <path d={svgPaths.p398c8880} fill="#1B7EFF" />
                          </svg>
                        </div>
                      </div>
                      <p className="font-['DM_Sans',sans-serif] relative shrink-0 text-[#1b7eff] text-[12px] text-center whitespace-nowrap" style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4" }}>
                        Create Business Entity
                      </p>
                    </button>
                  </div>

                  {/* Table */}
                  <div className="relative rounded-[12px] shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                      {/* Table Header */}
                      <div className="content-stretch flex items-start relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border border-solid inset-[-1px] pointer-events-none rounded-tl-[13px] rounded-tr-[13px]" style={{ borderColor: colors.border }} />
                        <div
                          className="content-stretch flex h-[30px] items-center justify-center px-[6px] py-[12px] relative rounded-tl-[12px] shrink-0"
                          style={{ backgroundColor: colors.bgSecondary }}
                        >
                          <button
                            className="block cursor-pointer relative shrink-0 size-[14px] bg-transparent border-none p-0"
                            onClick={toggleAll}
                          >
                            {selectedIds.size === filteredEntities.length && filteredEntities.length > 0 ? (
                              <>
                                <div className="absolute bg-[#1b7eff] border border-[#1b7eff] border-solid inset-0 rounded-[4px]" />
                                <div className="absolute inset-[37.5%_29.17%_33.33%_29.17%]">
                                  <div className="absolute inset-[-18.37%_-12.86%]">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33337 5.58334">
                                      <path d={svgPaths.p309c4780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                  </div>
                                </div>
                              </>
                            ) : selectedIds.size > 0 ? (
                              <>
                                <div className="absolute bg-[#1b7eff] border border-[#1b7eff] border-solid inset-0 rounded-[4px]" />
                                <div className="absolute flex items-center justify-center inset-0">
                                  <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
                                    <path d="M1 1H7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                </div>
                              </>
                            ) : (
                              <div className="absolute border border-[#a1b2bf] border-solid inset-0 rounded-[4px]" />
                            )}
                          </button>
                        </div>
                        {(["Name", "Type", "Location"] as const).map((col, i) => (
                          <div
                            key={col}
                            className={`flex-[1_0_0] min-h-0 min-w-0 relative${i === 2 ? " rounded-tr-[12px]" : ""}`}
                            style={{ backgroundColor: colors.bgSecondary }}
                          >
                            <div className="content-stretch flex gap-[10px] items-start px-[8px] py-[7px] relative w-full">
                              <p
                                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[12px] tracking-[-0.5px] whitespace-nowrap"
                                style={{ ...fontVar, fontWeight: 400, lineHeight: "14px", color: colors.textMuted }}
                              >
                                {col}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Table Rows */}
                      {filteredEntities.map((entity, idx) => {
                        const isChecked = selectedIds.has(entity.id);
                        const isLast = idx === filteredEntities.length - 1;
                        return (
                          <div
                            key={entity.id}
                            className="content-stretch flex items-start relative shrink-0 w-full cursor-pointer transition-colors duration-150 ease"
                            style={{ backgroundColor: colors.bg }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
                            onClick={() => toggleEntity(entity.id)}
                          >
                            {!isLast && (
                              <div aria-hidden="true" className="absolute border-b border-solid inset-[0_0_-1px_0] pointer-events-none" style={{ borderColor: colors.border }} />
                            )}
                            <div className="relative self-stretch shrink-0">
                              <div className="flex flex-row items-center justify-center size-full">
                                <div className="content-stretch flex h-full items-center justify-center px-[6px] py-[12px] relative">
                                  <div className="relative shrink-0 size-[14px]">
                                    {isChecked ? (
                                      <>
                                        <div className="absolute bg-[#1b7eff] border border-[#1b7eff] border-solid inset-0 rounded-[4px]" />
                                        <div className="absolute inset-[37.5%_29.17%_33.33%_29.17%]">
                                          <div className="absolute inset-[-18.37%_-12.86%]">
                                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.33337 5.58334">
                                              <path d={svgPaths.p309c4780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                            </svg>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <div className="absolute border border-[#a1b2bf] border-solid inset-0 rounded-[4px]" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-[1_0_0] h-[42px] min-h-0 min-w-0 relative">
                              <div className="flex flex-row items-center size-full">
                                <div className="content-stretch flex gap-[7px] items-center px-[8px] py-[12px] relative size-full">
                                  <p
                                    className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                                    style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textSecondary }}
                                  >
                                    {entity.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex-[1_0_0] h-[42px] min-h-0 min-w-0 relative">
                              <div className="flex flex-row items-center size-full">
                                <div className="content-stretch flex gap-[10px] items-center pl-[8px] pr-[32px] py-[12px] relative size-full">
                                  <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                                    <ServerIcon />
                                    <p
                                      className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                                      style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textSecondary }}
                                    >
                                      {entity.type}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-[1_0_0] h-[42px] min-h-0 min-w-0 relative">
                              <div className="flex flex-row items-center size-full">
                                <div className="content-stretch flex gap-[10px] items-center pl-[8px] pr-[32px] py-[12px] relative size-full">
                                  <p
                                    className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                                    style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textSecondary }}
                                  >
                                    {entity.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div aria-hidden="true" className="absolute border border-solid inset-[-1px] pointer-events-none rounded-[13px]" style={{ borderColor: colors.border }} />
                  </div>
                </div>
              </div>
            ) : (
              /* Step 2: Review & Save */
              <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-0 min-w-0 relative w-full">
                  {/* Asset label */}
                  <div
                    className="content-stretch flex font-['DM_Sans',sans-serif] gap-[8px] items-start relative shrink-0 text-[16px] text-center tracking-[-0.32px] whitespace-nowrap"
                    style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textMuted }}
                  >
                    <p className="relative shrink-0">Asset:</p>
                    <p className="relative shrink-0">{assetName}</p>
                  </div>

                  {/* Review list */}
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <p
                      className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-right tracking-[-0.5px] whitespace-nowrap"
                      style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textSecondary }}
                    >
                      Review connected Business Entities:
                    </p>
                    <div
                      className="relative rounded-[6px] shrink-0 w-full"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
                      <div className="flex flex-col justify-center size-full">
                        <div
                          className="content-stretch flex flex-col font-['DM_Sans',sans-serif] gap-[6px] items-start justify-center px-[4px] py-[8px] relative text-[14px] tracking-[-0.5px] w-full whitespace-nowrap"
                          style={{ ...fontVar, fontWeight: 400, lineHeight: "0", color: colors.textSecondary }}
                        >
                          {selectedEntities.map((entity) => (
                            <ul key={entity.id} className="block relative shrink-0" style={fontVar}>
                              <li className="list-disc ms-[21px] whitespace-pre-wrap">
                                <span style={{ lineHeight: "normal" }}>{entity.name}</span>
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative shrink-0 w-full" style={{ backgroundColor: colors.bg }}>
          <div aria-hidden="true" className="absolute border-t border-solid inset-0 pointer-events-none" style={{ borderColor: colors.border }} />
          <div className="flex flex-col items-end size-full">
            <div className="content-stretch flex items-center justify-between p-[8px] relative w-full">
              {/* Cancel / Back */}
              {step === 1 ? (
                <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
                  <button
                    onClick={handleClose}
                    className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
                    <p
                      className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center whitespace-nowrap"
                      style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4", color: colors.text }}
                    >
                      Cancel
                    </p>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleClose}
                  className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none"
                  style={{ backgroundColor: colors.bg }}
                >
                  <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
                  <p
                    className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center whitespace-nowrap"
                    style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4", color: colors.text }}
                  >
                    Cancel
                  </p>
                </button>
              )}

              {/* Right buttons */}
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none transition-colors duration-150 ease"
                    style={{ backgroundColor: colors.bg }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
                  >
                    <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
                    <div className="relative shrink-0 size-[20px]">
                      <div className="absolute flex inset-[25.34%_36.18%_28.4%_36.17%] items-center justify-center">
                        <div className="flex-none h-[5.531px] rotate-90 w-[9.252px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.25163 5.53136">
                            <path d={svgPaths.p204d3200} fill="#1B7EFF" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p
                      className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center whitespace-nowrap"
                      style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4", color: colors.text }}
                    >
                      Back
                    </p>
                  </button>
                )}
                {step === 1 ? (
                  <button
                    onClick={() => setStep(2)}
                    className="bg-[#1b7eff] content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none transition-colors duration-150 ease hover:bg-[#1565D8]"
                  >
                    <p className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4" }}>
                      Next
                    </p>
                    <div className="relative shrink-0 size-[20px]">
                      <div className="absolute flex inset-[25.33%_36.18%_28.41%_36.17%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[5.531px] w-[9.252px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.25163 5.53136">
                            <path d={svgPaths.p204d3200} fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="bg-[#1b7eff] content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none transition-colors duration-150 ease hover:bg-[#1565D8]"
                  >
                    <p className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4" }}>
                      Save
                    </p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
