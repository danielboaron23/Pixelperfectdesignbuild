import svgPaths from "./svg-a7sgbh2n5o";

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#8f97ac] text-[14px] tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        1 Asset selected
      </p>
      <div className="bg-white content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="buttons/buttons/light">
        <div aria-hidden="true" className="absolute border border-[#edecf9] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="relative shrink-0 size-[16px]" data-name="icons/delete_forever/Outlined">
          <div className="absolute inset-[3.42%_10.94%_10.64%_10.94%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 13.75">
              <path d={svgPaths.p4954d00} fill="var(--fill-0, #474E62)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#474e62] text-[12px] text-center whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
          Delete
        </p>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#001837] text-[16px] tracking-[-0.32px] whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
        Assets List
      </p>
      <Frame1 />
    </div>
  );
}