import React, { useState } from "react";
import svgPaths from "../../imports/svg-m77svu59py";
import svgPathsAttr from "../../imports/svg-xsq0a1rplb";
import svgPathsMgmt from "../../imports/svg-mgxx5nra7e";
import { useThemeColors } from "../hooks/useThemeColors";

const fontVar = { fontVariationSettings: "'opsz' 14" } as React.CSSProperties;

// Step definitions
const steps = [
  { label: "Metadata" },
  { label: "Attributes" },
  { label: "Business Entities\nConnections", multiline: true },
  { label: "Review & save" },
];

// Example JSON
const exampleJson = `{
  "owner_team": "Platform",
  "environment": "production",
  "region": "us-east-1",
  "public_exposure": true,
  "rate_limit_rps": 200,
  "upstream_services": [
    "orders",
    "users"
  ],
  "auth": {
    "type": "jwt",
    "issuer": "auth-service"
  }
}`;

// Business entities mock data
const businessEntities = [
  { id: "1", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "2", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "3", name: "TechCorp Inc.", type: "Server", location: "New York, USA" },
  { id: "4", name: "SecureNet AG", type: "Server", location: "Zurich, Switzerland" },
];

interface AddAssetDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: { name: string; type: string; description: string; criticality: string }) => void;
}

interface FormData {
  name: string;
  type: string;
  description: string;
  criticality: string;
  attributes: string;
}

function ServerIcon() {
  return (
    <div className="bg-[#d4e7ff] content-stretch flex items-center justify-center px-[8.333px] py-[5px] relative rounded-[5px] shrink-0 size-[20px]">
      <div className="relative shrink-0 size-[12px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPathsMgmt.p251d5300} fill="#1B7EFF" />
          <path d={svgPathsMgmt.p145f1800} fill="#1B7EFF" />
        </svg>
      </div>
    </div>
  );
}

// Stepper sidebar
function StepperSidebar({ currentStep, completedSteps }: { currentStep: number; completedSteps: number[] }) {
  const colors = useThemeColors();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      {steps.map((step, i) => {
        const stepNum = i + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = completedSteps.includes(stepNum);

        return (
          <div
            key={stepNum}
            className="content-stretch flex gap-[8px] items-center pl-[16px] pr-[24px] py-[12px] relative shrink-0 w-[174px]"
            style={{ backgroundColor: isActive ? colors.bgSecondary : colors.bg }}
          >
            {isActive && (
              <div aria-hidden="true" className="absolute border-[#1b7eff] border-l-4 border-solid inset-0 pointer-events-none" />
            )}
            <div className="relative shrink-0 size-[24px]">
              {isCompleted ? (
                <>
                  <div className="absolute bg-[#d4e7ff] inset-0 rounded-[13.479px]" />
                  <div className="absolute inset-[37.5%_31.25%]">
                    <div className="absolute inset-[-14.58%_-9.72%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.75 7.75">
                        <path d={svgPathsAttr.p314ec600} stroke="#1B7EFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="absolute content-stretch flex flex-col items-center justify-center left-0 px-[8px] py-[3px] rounded-[13.479px] size-[24px] top-0"
                  style={{ backgroundColor: isActive ? "#1b7eff" : colors.bgTertiary }}
                >
                  <p
                    className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                    style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: isActive ? "white" : colors.textDisabled }}
                  >
                    {stepNum}
                  </p>
                </div>
              )}
            </div>
            {step.multiline ? (
              <div
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px]"
                style={{
                  ...fontVar,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? colors.text : isCompleted ? colors.textSecondary : colors.textMuted,
                  lineHeight: "normal",
                }}
              >
                <p className="mb-0">Business Entities</p>
                <p>Connections</p>
              </div>
            ) : (
              <p
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
                style={{
                  ...fontVar,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? colors.text : isCompleted ? colors.textSecondary : colors.textMuted,
                  lineHeight: "normal",
                }}
              >
                {step.label}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Step 1: Metadata
function MetadataStep({
  formData,
  setFormData,
  errors,
}: {
  formData: FormData;
  setFormData: (d: FormData) => void;
  errors: Record<string, string>;
}) {
  const colors = useThemeColors();
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      {/* Asset name */}
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <p
          className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center tracking-[-0.5px] whitespace-nowrap"
          style={{ ...fontVar, fontWeight: 600, lineHeight: "0", color: colors.textSecondary }}
        >
          <span style={{ lineHeight: "normal" }}>{"Asset name "}</span>
          <span className="text-[#d62828]" style={{ lineHeight: "normal" }}>*</span>
        </p>
        <div className="content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full">
          <div
            className="h-[32px] relative rounded-[4px] shrink-0 w-full"
            style={{ backgroundColor: errors.name ? colors.bgTertiary : colors.bg }}
          >
            <div
              aria-hidden="true"
              className="absolute border border-solid inset-0 pointer-events-none rounded-[4px]"
              style={{ borderColor: errors.name ? "#d62828" : colors.border }}
            />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[12px] items-center px-[8px] py-[4px] relative size-full">
                <input
                  type="text"
                  placeholder="Enter asset name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="flex-1 bg-transparent border-none outline-none font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px] placeholder:text-[#8f97ac]"
                  style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textSecondary }}
                />
              </div>
            </div>
          </div>
          {errors.name && (
            <p className="font-['DM_Sans',sans-serif] relative shrink-0 text-[#d62828] text-[12px] tracking-[-0.5px] w-[180px]" style={{ ...fontVar, fontWeight: 400, lineHeight: "14px" }}>
              Enter a valid asset name
            </p>
          )}
        </div>
      </div>

      {/* Asset type */}
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <p
          className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center tracking-[-0.5px] whitespace-nowrap"
          style={{ ...fontVar, fontWeight: 600, lineHeight: "0", color: colors.textSecondary }}
        >
          <span style={{ lineHeight: "normal" }}>{"Asset type "}</span>
          <span className="text-[#d62828]" style={{ lineHeight: "normal" }}>*</span>
        </p>
        <div
          className="cursor-pointer h-[32px] relative rounded-[6px] shrink-0 w-full"
          style={{ backgroundColor: colors.bg }}
        >
          <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[8px] py-[4px] relative size-full">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="appearance-none bg-transparent border-none outline-none cursor-pointer flex-1 font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px]"
                style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: formData.type ? colors.textSecondary : colors.textMuted }}
              >
                <option value="" disabled>Select type</option>
                <option value="Server">Server</option>
                <option value="Endpoint">Endpoint</option>
                <option value="Application">Application</option>
                <option value="Storage">Storage</option>
              </select>
              <div className="relative shrink-0 size-[18px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.978px] left-[calc(50%-0.34px)] top-[calc(50%-0.21px)] w-[8.326px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.32646 4.97822">
                    <path d={svgPaths.p3d861600} fill="#8F97AC" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <p
          className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center tracking-[-0.5px] whitespace-nowrap"
          style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textSecondary }}
        >
          {"Description "}
        </p>
        <div
          className="cursor-pointer h-[96px] relative rounded-[6px] shrink-0 w-full"
          style={{ backgroundColor: colors.bg }}
        >
          <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
          <div className="content-stretch flex gap-[12px] items-start pb-[4px] pt-[8px] px-[8px] relative size-full">
            <textarea
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none resize-none font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px] h-full placeholder:text-[#8f97ac]"
              style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textSecondary }}
            />
          </div>
        </div>
      </div>

      {/* Business Criticality */}
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <p
          className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center tracking-[-0.5px] whitespace-nowrap"
          style={{ ...fontVar, fontWeight: 600, lineHeight: "0", color: colors.textSecondary }}
        >
          <span style={{ lineHeight: "normal" }}>{"Business Criticality "}</span>
          <span className="text-[#d62828]" style={{ lineHeight: "normal" }}>*</span>
        </p>
        <div
          className="cursor-pointer h-[32px] relative rounded-[6px] shrink-0 w-full"
          style={{ backgroundColor: colors.bg }}
        >
          <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[8px] py-[4px] relative size-full">
              <select
                value={formData.criticality}
                onChange={(e) => setFormData({ ...formData, criticality: e.target.value })}
                className="appearance-none bg-transparent border-none outline-none cursor-pointer flex-1 font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px]"
                style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: formData.criticality ? colors.textSecondary : colors.textMuted }}
              >
                <option value="" disabled>Select</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                  <option key={v} value={String(v)}>{v}</option>
                ))}
              </select>
              <div className="relative shrink-0 size-[18px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[4.978px] left-[calc(50%-0.34px)] top-[calc(50%-0.21px)] w-[8.326px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.32646 4.97822">
                    <path d={svgPaths.p3d861600} fill="#8F97AC" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Attributes
function AttributesStep({
  attributes,
  setAttributes,
}: {
  attributes: string;
  setAttributes: (v: string) => void;
}) {
  const colors = useThemeColors();
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-0 min-w-0 relative w-full">
      {/* Header */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <p
          className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center tracking-[-0.5px] whitespace-nowrap"
          style={{ ...fontVar, fontWeight: 600, lineHeight: "0", color: colors.textSecondary }}
        >
          <span style={{ lineHeight: "normal" }}>{"Manage Attributes "}</span>
          <span className="font-['DM_Sans',sans-serif]" style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textSecondary }}>
            (optional)
          </span>
        </p>
        {!showExample ? (
          <button
            onClick={() => setShowExample(true)}
            className="content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none"
            style={{ backgroundColor: colors.bg }}
          >
            <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
            <div className="relative shrink-0 size-[16px]">
              <div className="absolute inset-[8.12%_14.38%_8.13%_9.69%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1504 13.4004">
                  <path d={svgPathsAttr.p2201e7f0} fill="#1B7EFF" />
                </svg>
              </div>
            </div>
            <p
              className="font-['DM_Sans',sans-serif] relative shrink-0 text-[12px] text-center whitespace-nowrap"
              style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4", color: colors.text }}
            >
              Show example
            </p>
          </button>
        ) : (
          <div className="flex gap-[8px] items-center">
            <button
              onClick={() => setShowExample(false)}
              className="content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none"
              style={{ backgroundColor: colors.bg }}
            >
              <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
              <div className="relative shrink-0 size-[16px]">
                <div className="absolute inset-[8.12%_14.38%_8.13%_9.69%]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1504 13.4004">
                    <path d={svgPathsAttr.p2201e7f0} fill="#1B7EFF" />
                  </svg>
                </div>
              </div>
              <p
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[12px] text-center whitespace-nowrap"
                style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4", color: colors.text }}
              >
                Back to editor
              </p>
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(exampleJson)}
              className="content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none"
              style={{ backgroundColor: colors.bg }}
            >
              <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
              <div className="relative shrink-0 size-[16px]">
                <div className="absolute inset-[8.12%_14.38%_8.13%_9.69%]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1504 13.4004">
                    <path d={svgPathsAttr.p2201e7f0} fill={colors.textSecondary} />
                  </svg>
                </div>
              </div>
              <p
                className="font-['DM_Sans',sans-serif] relative shrink-0 text-[12px] text-center whitespace-nowrap"
                style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4", color: colors.text }}
              >
                Copy
              </p>
            </button>
          </div>
        )}
      </div>

      {/* Example header when showing */}
      {showExample && (
        <div
          className="px-[8px] py-[6px] rounded-[6px] shrink-0 w-full relative"
          style={{ backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}` }}
        >
          <p
            className="font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px]"
            style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.text }}
          >
            Example JSON for {"{assetType}"}
          </p>
          <p
            className="font-['DM_Sans',sans-serif] text-[12px] tracking-[-0.5px]"
            style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.textMuted }}
          >
            This is an example template. Use Copy button to copy it.
          </p>
        </div>
      )}

      {/* Editor area */}
      <div
        className="cursor-pointer flex-[1_0_0] min-h-0 min-w-0 relative rounded-[6px] w-full"
        style={{ backgroundColor: colors.bgTertiary }}
      >
        <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" style={{ borderColor: colors.border }} />
        <div className="content-stretch flex gap-[12px] items-start pb-[4px] pt-[8px] px-[8px] relative size-full">
          <textarea
            value={showExample ? exampleJson : attributes}
            onChange={(e) => {
              if (!showExample) setAttributes(e.target.value);
            }}
            readOnly={showExample}
            placeholder="{ }"
            className="flex-1 bg-transparent border-none outline-none resize-none font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px] h-full placeholder:text-[#8f97ac]"
            style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.text }}
          />
        </div>
      </div>
    </div>
  );
}

// Step 3: Business Entities Connections
function BusinessEntitiesStep({ assetName }: { assetName: string }) {
  const colors = useThemeColors();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleEntity = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredEntities = businessEntities.filter((e) =>
    !search || e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* Asset label + Search */}
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
        <div
          className="content-stretch flex font-['DM_Sans',sans-serif] gap-[8px] items-start relative shrink-0 text-[16px] text-center tracking-[-0.32px] whitespace-nowrap"
          style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textMuted }}
        >
          <p className="relative shrink-0">Asset:</p>
          <p className="relative shrink-0">{assetName || "Unnamed Asset"}</p>
        </div>

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
                        <path d={svgPathsMgmt.p92dba00} fill="#A1B2BF" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search.."
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
            style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textBrand }}
          >
            Business Entities
          </p>
          <button className="content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0 bg-transparent border-none cursor-pointer">
            <div className="relative shrink-0 size-[16px]">
              <div className="absolute inset-[20.83%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
                  <path d={svgPathsMgmt.p398c8880} fill="#1B7EFF" />
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
            {/* Header */}
            <div className="content-stretch flex items-start relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
              <div aria-hidden="true" className="absolute border border-solid inset-[-1px] pointer-events-none rounded-tl-[13px] rounded-tr-[13px]" style={{ borderColor: colors.border }} />
              <div
                className="content-stretch flex h-[30px] items-center justify-center px-[6px] py-[12px] relative rounded-tl-[12px] shrink-0"
                style={{ backgroundColor: colors.bgSecondary }}
              >
                <div className="relative shrink-0 size-[14px]">
                  <div className="absolute border border-[#a1b2bf] border-solid inset-0 rounded-[4px]" />
                </div>
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

            {/* Rows */}
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
                                    <path d={svgPathsMgmt.p309c4780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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
  );
}

// Step 4: Review & Save
function ReviewRow({ label, value }: { label: string; value: string }) {
  const colors = useThemeColors();
  return (
    <div className="flex items-start gap-[12px]">
      <span
        className="font-['DM_Sans',sans-serif] shrink-0 text-[12px] tracking-[-0.5px]"
        style={{ ...fontVar, fontWeight: 400, lineHeight: "14px", width: "140px", color: colors.textMuted }}
      >
        {label}
      </span>
      <span
        className="font-['DM_Sans',sans-serif] text-[14px] tracking-[-0.5px]"
        style={{ ...fontVar, fontWeight: 400, lineHeight: "normal", color: colors.text }}
      >
        {value || "—"}
      </span>
    </div>
  );
}

function ReviewStep({ formData }: { formData: FormData }) {
  const colors = useThemeColors();
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <p
        className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] tracking-[-0.5px] whitespace-nowrap"
        style={{ ...fontVar, fontWeight: 600, lineHeight: "normal", color: colors.textSecondary }}
      >
        Review your asset details
      </p>

      <div
        className="relative rounded-[6px] shrink-0 w-full"
        style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
      >
        <div className="flex flex-col gap-[12px] p-[16px]">
          <ReviewRow label="Asset name" value={formData.name} />
          <ReviewRow label="Asset type" value={formData.type} />
          <ReviewRow label="Description" value={formData.description || "—"} />
          <ReviewRow label="Business Criticality" value={formData.criticality} />
        </div>
      </div>

      {formData.attributes && formData.attributes !== "{}" && (
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <p
            className="font-['DM_Sans',sans-serif] relative shrink-0 text-[12px] tracking-[-0.5px]"
            style={{ ...fontVar, fontWeight: 400, lineHeight: "14px", color: colors.textMuted }}
          >
            Attributes
          </p>
          <div
            className="relative rounded-[6px] shrink-0 w-full"
            style={{ backgroundColor: colors.bgTertiary, border: `1px solid ${colors.border}` }}
          >
            <pre
              className="p-[12px] text-[12px] font-['DM_Sans',monospace] whitespace-pre-wrap m-0"
              style={{ ...fontVar, fontWeight: 400, color: colors.textSecondary }}
            >
              {formData.attributes}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export function AddAssetDialog({ open, onClose, onSuccess }: AddAssetDialogProps) {
  const colors = useThemeColors();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    description: "",
    criticality: "",
    attributes: "{}",
  });

  if (!open) return null;

  const resetState = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setErrors({});
    setFormData({ name: "", type: "", description: "", criticality: "", attributes: "{}" });
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) newErrors.name = "Enter a valid asset name";
      if (!formData.type) newErrors.type = "Select an asset type";
      if (!formData.criticality) newErrors.criticality = "Select business criticality";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    );
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
      onSuccess({ name: formData.name, type: formData.type, description: formData.description, criticality: formData.criticality });
    }
  };

  const isLastStep = currentStep === 4;

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
                Add new Asset
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
          <StepperSidebar currentStep={currentStep} completedSteps={completedSteps} />

          {/* Right Content */}
          <div
            className="flex-[1_0_0] h-full min-h-0 min-w-0 relative overflow-auto"
            style={{ backgroundColor: colors.bgSecondary }}
          >
            <div aria-hidden="true" className="absolute border-l border-solid inset-0 pointer-events-none" style={{ borderColor: colors.border }} />
            <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
              {currentStep === 1 && (
                <MetadataStep formData={formData} setFormData={setFormData} errors={errors} />
              )}
              {currentStep === 2 && (
                <AttributesStep
                  attributes={formData.attributes}
                  setAttributes={(v) => setFormData({ ...formData, attributes: v })}
                />
              )}
              {currentStep === 3 && (
                <BusinessEntitiesStep assetName={formData.name} />
              )}
              {currentStep === 4 && <ReviewStep formData={formData} />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative shrink-0 w-full" style={{ backgroundColor: colors.bg }}>
          <div aria-hidden="true" className="absolute border-t border-solid inset-0 pointer-events-none" style={{ borderColor: colors.border }} />
          <div className="flex flex-col items-end size-full">
            <div className="content-stretch flex items-center justify-end p-[8px] relative w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                {/* Cancel */}
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

                {/* Next / Save */}
                <button
                  onClick={handleNext}
                  className="bg-[#1b7eff] content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0 cursor-pointer border-none transition-colors duration-150 ease hover:bg-[#1565D8]"
                >
                  <p className="font-['DM_Sans',sans-serif] relative shrink-0 text-[14px] text-center text-white whitespace-nowrap" style={{ ...fontVar, fontWeight: 500, lineHeight: "1.4" }}>
                    {isLastStep ? "Save" : "Next"}
                  </p>
                  {!isLastStep && (
                    <div className="relative shrink-0 size-[20px]">
                      <div className="absolute flex inset-[25.33%_36.18%_28.41%_36.17%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[5.531px] w-[9.252px]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.25163 5.53136">
                            <path d={svgPaths.p204d3200} fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Success Toast
const text14Reg: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "-0.5px",
  lineHeight: "normal",
};

export function SuccessToast({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const colors = useThemeColors();
  return (
    <div
      className="fixed z-[200] flex items-center gap-[10px] px-[16px] py-[10px] rounded-[8px]"
      style={{
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: colors.bg,
        boxShadow: colors.shadowCard,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div
        className="flex items-center justify-center shrink-0 rounded-full"
        style={{ width: "22px", height: "22px", backgroundColor: "#04C0B9" }}
      >
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span style={{ ...text14Reg, color: colors.text }}>
        Asset <strong>{name}</strong> was successfully created
      </span>

      <button
        className="cursor-pointer bg-transparent border-none p-0"
        style={{
          ...text14Reg,
          color: colors.textBrand,
          fontWeight: 500,
          marginLeft: "4px",
        }}
      >
        View details
      </button>

      <button
        className="cursor-pointer bg-transparent border-none p-0 ml-[8px]"
        onClick={onClose}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M1 1L11 11M11 1L1 11"
            stroke={colors.textMuted}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
