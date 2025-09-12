import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className=" my-5 py-4 md:px-6 lg:px-16 xl:px-28 2xl:px-40">
      {/* logo */}
      <div className=" flex justify-between items-center">
        <Image src="/images/logo.svg" width={170} height={170} alt="logo" />

        {/* units */}
        <button
          type="button"
          className=" flex gap-2 items-center cursor-pointer bg-neutral-300/30 py-1 px-3 rounded focus:ring-2 focus:ring-neutral-0 outline-none"
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
      </div>
    </div>
  );
};

export default Navbar;
