import svgPaths from "./svg-smp716qknm";

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#001837] text-[16px] tracking-[-0.32px] whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
        Delete assets
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white h-[56px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#edecf9] border-b border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative size-full">
          <Frame />
          <div className="relative shrink-0 size-[24px]" data-name="icons/remove/Outlined">
            <div className="absolute inset-[22.5%_22.5%_22.55%_22.55%]" data-name="vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1885 13.1885">
                <path d={svgPaths.p17985b00} fill="var(--fill-0, #001837)" id="vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[104px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 104 104">
        <g id="Group 1">
          <circle cx="52" cy="52" fill="var(--fill-0, #FFEFF2)" id="Ellipse 1" r="52" />
          <g id="trash 2">
            <path d={svgPaths.p3a92ea00} fill="var(--fill-0, #D62828)" id="Vector 504" opacity="0.4" />
            <g id="Vector 505">
              <path d={svgPaths.pf05a800} fill="var(--fill-0, #D62828)" id="Vector" />
              <path d={svgPaths.pf98f00} fill="var(--fill-0, #D62828)" id="Vector_2" />
              <path d={svgPaths.p36552bb0} fill="var(--fill-0, #D62828)" id="Vector_3" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[0] min-h-px min-w-px relative text-[#001837] text-[0px] text-[16px] text-center tracking-[-0.32px] whitespace-pre-wrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[normal] tracking-[-0.5px]" style={{ fontVariationSettings: "'opsz' 14" }}>{`Are you sure you want to delete asset <MS-WKS-14>? `}</span>
        <span className="leading-[normal]">
          <br aria-hidden="true" />
          This action cannot be undone.
        </span>
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center p-[32px] relative w-full">
          <Group />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
      <div className="bg-white content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="buttons/buttons/light">
        <div aria-hidden="true" className="absolute border border-[#edecf9] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#001837] text-[14px] text-center whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
          Cancel
        </p>
      </div>
      <div className="bg-white content-stretch flex gap-[4px] h-[32px] items-center justify-center px-[12px] py-[4px] relative rounded-[6px] shrink-0" data-name="buttons/buttons/light">
        <div aria-hidden="true" className="absolute border border-[#d62828] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[#d62828] text-[14px] text-center whitespace-nowrap" dir="auto" style={{ fontVariationSettings: "'opsz' 14" }}>
          Delete
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#edecf9] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col items-end p-[8px] relative w-full">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[12px] size-full">
      <Frame1 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}