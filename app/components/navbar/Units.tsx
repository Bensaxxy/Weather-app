import React from "react";
import Image from "next/image";
import UnitsModal from "@/app/modal/UnitsModal";

const Units = () => {
  return (
    <div>
      <div className=" relative">
        <button
          type="button"
          className=" flex gap-2 items-center cursor-pointer bg-neutral-700 py-1 px-3 rounded focus:ring-2 focus:ring-neutral-0 outline-none"
        >
          <Image
            src="/images/icon-units.svg"
            width={14}
            height={14}
            alt="unit-icon"
          />
          <span className=" font-[500]">Units</span>
          <Image
            src="/images/icon-dropdown.svg"
            width={14}
            height={14}
            alt="unit-icon"
          />
        </button>
        <div className="absolute right-0">
          <UnitsModal />
        </div>
      </div>
    </div>
  );
};

export default Units;
