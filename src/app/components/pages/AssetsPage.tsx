import { useState } from "react";
import { Header } from "../Header";
import { AssetsTable, initialAssets, Asset } from "../AssetsTable";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";
import { ManageBusinessEntitiesDialog } from "../ManageBusinessEntitiesDialog";
import { useThemeColors } from "../../hooks/useThemeColors";
import deleteIconPaths from "../../../imports/svg-a7sgbh2n5o";

const font = "'DM Sans', sans-serif";

export function AssetsPage() {
  const colors = useThemeColors();
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTargetIds, setDeleteTargetIds] = useState<Set<string>>(new Set());
  const [manageConnectionsAssetId, setManageConnectionsAssetId] = useState<string | null>(null);
  
  // Filter states
  const [searchValue, setSearchValue] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("Asset type");
  const [selectedCriticality, setSelectedCriticality] = useState("Business Criticality");

  // Filter logic
  const filteredAssets = assets.filter((asset) => {
    if (searchValue && !asset.name.toLowerCase().includes(searchValue.toLowerCase()) && 
        !asset.description.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    if (selectedAssetType !== "Asset type" && asset.type !== selectedAssetType) {
      return false;
    }
    if (selectedCriticality !== "Business Criticality") {
      const criticalityMap: Record<string, number> = {
        "Low": 3,
        "Medium": 5,
        "High": 8,
        "Critical": 10,
      };
      const targetCriticality = criticalityMap[selectedCriticality];
      if (targetCriticality && asset.criticality !== targetCriticality) {
        return false;
      }
    }
    return true;
  });

  const handleClearFilter = (filterType: "search" | "type" | "criticality") => {
    if (filterType === "search") setSearchValue("");
    if (filterType === "type") setSelectedAssetType("Asset type");
    if (filterType === "criticality") setSelectedCriticality("Business Criticality");
  };

  const activeFiltersCount = 
    (searchValue ? 1 : 0) + 
    (selectedAssetType !== "Asset type" ? 1 : 0) + 
    (selectedCriticality !== "Business Criticality" ? 1 : 0);

  const handleAddAsset = (data: {
    name: string;
    type: string;
    description: string;
    criticality: string;
  }) => {
    const now = new Date();
    const dateStr = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}/${String(now.getFullYear()).slice(2)} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newAsset: Asset = {
      id: String(Date.now()),
      name: data.name,
      type: data.type,
      description: data.description || "—",
      criticality: Number(data.criticality),
      entities: 0,
      created: dateStr,
      updated: dateStr,
    };
    setAssets((prev) => [newAsset, ...prev]);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === assets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(assets.map((a) => a.id)));
    }
  };

  const handleDeleteSelected = () => {
    setDeleteTargetIds(new Set(selectedIds));
    setShowDeleteDialog(true);
  };

  const handleDeleteAsset = (id: string) => {
    setDeleteTargetIds(new Set([id]));
    setShowDeleteDialog(true);
  };

  const handleManageConnections = (id: string) => {
    setManageConnectionsAssetId(id);
  };

  const handleConfirmDelete = () => {
    setAssets((prev) => prev.filter((a) => !deleteTargetIds.has(a.id)));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      deleteTargetIds.forEach((id) => next.delete(id));
      return next;
    });
    setDeleteTargetIds(new Set());
    setShowDeleteDialog(false);
  };

  const deleteTargetNames = assets
    .filter((a) => deleteTargetIds.has(a.id))
    .map((a) => a.name);

  const selectionCount = selectedIds.size;

  return (
    <>
      {/* Header */}
      <Header 
        onAddAsset={handleAddAsset} 
        totalAssets={assets.length}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        selectedAssetType={selectedAssetType}
        onAssetTypeChange={setSelectedAssetType}
        selectedCriticality={selectedCriticality}
        onCriticalityChange={setSelectedCriticality}
      />

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex gap-[8px] items-center mt-[16px] mb-[8px]">
          <span
            style={{
              fontFamily: font,
              fontSize: "12px",
              fontWeight: 400,
              color: colors.textMuted,
              letterSpacing: "-0.5px",
            }}
          >
            Active filters:
          </span>
          {searchValue && (
            <div
              className="flex gap-[6px] items-center px-[8px] py-[4px] rounded-[4px]"
              style={{ backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}` }}
            >
              <span
                style={{
                  fontFamily: font,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: colors.textSecondary,
                  letterSpacing: "-0.5px",
                }}
              >
                Search: "{searchValue}"
              </span>
              <button
                onClick={() => handleClearFilter("search")}
                className="flex items-center justify-center w-[14px] h-[14px] rounded-full transition-colors cursor-pointer border-none bg-transparent"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1L7 7M7 1L1 7" stroke={colors.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
          {selectedAssetType !== "Asset type" && (
            <div
              className="flex gap-[6px] items-center px-[8px] py-[4px] rounded-[4px]"
              style={{ backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}` }}
            >
              <span
                style={{
                  fontFamily: font,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: colors.textSecondary,
                  letterSpacing: "-0.5px",
                }}
              >
                Type: {selectedAssetType}
              </span>
              <button
                onClick={() => handleClearFilter("type")}
                className="flex items-center justify-center w-[14px] h-[14px] rounded-full transition-colors cursor-pointer border-none bg-transparent"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1L7 7M7 1L1 7" stroke={colors.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
          {selectedCriticality !== "Business Criticality" && (
            <div
              className="flex gap-[6px] items-center px-[8px] py-[4px] rounded-[4px]"
              style={{ backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}` }}
            >
              <span
                style={{
                  fontFamily: font,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: colors.textSecondary,
                  letterSpacing: "-0.5px",
                }}
              >
                Criticality: {selectedCriticality}
              </span>
              <button
                onClick={() => handleClearFilter("criticality")}
                className="flex items-center justify-center w-[14px] h-[14px] rounded-full transition-colors cursor-pointer border-none bg-transparent"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1L7 7M7 1L1 7" stroke={colors.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
          <button
            onClick={() => {
              setSearchValue("");
              setSelectedAssetType("Asset type");
              setSelectedCriticality("Business Criticality");
            }}
            className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[4px] transition-colors cursor-pointer border-none bg-transparent"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <span
              style={{
                fontFamily: font,
                fontSize: "12px",
                fontWeight: 500,
                color: colors.textBrand,
                letterSpacing: "-0.5px",
              }}
            >
              Clear all
            </span>
          </button>
        </div>
      )}

      {/* Section Title / Selection Bar */}
      <div className="flex h-[28px] items-center justify-between mt-[24px] mb-[12px]">
        <div className="flex gap-[12px] items-center">
          <span
            style={{
              fontFamily: font,
              fontSize: "16px",
              fontWeight: 500,
              color: colors.text,
              letterSpacing: "-0.32px",
              lineHeight: "normal",
            }}
          >
            Assets List
          </span>
          <span
            style={{
              fontFamily: font,
              fontSize: "14px",
              fontWeight: 400,
              color: colors.textMuted,
              letterSpacing: "-0.5px",
              lineHeight: "normal",
            }}
          >
            {filteredAssets.length} {filteredAssets.length === 1 ? "result" : "results"}
          </span>
        </div>

        {selectionCount > 0 && (
          <div className="flex gap-[12px] items-center">
            <span
              style={{
                fontFamily: font,
                fontSize: "14px",
                fontWeight: 400,
                color: colors.textMuted,
                letterSpacing: "-0.5px",
                lineHeight: "normal",
                whiteSpace: "nowrap",
              }}
            >
              {selectionCount} {selectionCount === 1 ? "Asset" : "Assets"} selected
            </span>
            <button
              onClick={handleDeleteSelected}
              className="flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] rounded-[6px] cursor-pointer transition-colors duration-150 ease"
              style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.bgSecondary)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colors.bg)}
            >
              <div className="relative shrink-0 w-[16px] h-[16px]">
                <svg
                  className="absolute w-[12.5px] h-[13.75px]"
                  style={{ top: "3.42%", left: "10.94%" }}
                  fill="none"
                  viewBox="0 0 12.5 13.75"
                >
                  <path d={deleteIconPaths.p4954d00} fill={colors.textSecondary} />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: font,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: colors.textSecondary,
                  lineHeight: "1.4",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                Delete
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <AssetsTable
        assets={filteredAssets}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onDeleteAsset={handleDeleteAsset}
        onManageConnections={handleManageConnections}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        assetNames={deleteTargetNames}
        onClose={() => {
          setShowDeleteDialog(false);
          setDeleteTargetIds(new Set());
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Manage Business Entities Dialog */}
      <ManageBusinessEntitiesDialog
        open={manageConnectionsAssetId !== null}
        assetName={
          manageConnectionsAssetId
            ? assets.find((a) => a.id === manageConnectionsAssetId)?.name || ""
            : ""
        }
        onClose={() => setManageConnectionsAssetId(null)}
        onSave={() => setManageConnectionsAssetId(null)}
      />
    </>
  );
}
