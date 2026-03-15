import svgPaths from "./svg-m5ifunwiuu";

function VuesaxBoldCandle() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/bold/candle-2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="candle-2">
          <g id="Vector" opacity="0" />
          <path d={svgPaths.p11df8800} fill="var(--fill-0, #A1B2BF)" id="Vector_2" />
          <path d={svgPaths.p257c5100} fill="var(--fill-0, #A1B2BF)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[4px] relative rounded-[6px] shadow-[0px_6px_16px_0px_rgba(19,37,72,0.14)] size-full">
      <div className="bg-white h-[28px] relative rounded-[6px] shrink-0 w-full" data-name="buttons/buttons/light">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center p-[4px] relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="icons/edit/Outlined">
              <div className="absolute inset-[9.99%_9.69%_12.51%_12.82%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3991 12.4">
                  <path d={svgPaths.p2500aa00} fill="var(--fill-0, #A1B2BF)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#001837] text-[12px] text-center whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
              Edit
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[28px] relative rounded-[6px] shrink-0 w-full" data-name="buttons/buttons/light">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center p-[4px] relative size-full">
            <div className="relative shrink-0 size-[16px]" data-name="icons/delete_forever/Outlined">
              <div className="absolute inset-[3.42%_10.94%_10.64%_10.94%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 13.75">
                  <path d={svgPaths.p4954d00} fill="var(--fill-0, #A1B2BF)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#001837] text-[12px] text-center whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
              Delete
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#f7f9fb] content-stretch flex gap-[4px] h-[28px] items-center p-[4px] relative rounded-[6px] shrink-0" data-name="buttons/buttons/light">
        <div className="relative shrink-0 size-[16px]" data-name="icons/manage/Filled">
          <VuesaxBoldCandle />
        </div>
        <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#001837] text-[12px] text-center whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
          Manage Connections
        </p>
      </div>
    </div>
  );
}