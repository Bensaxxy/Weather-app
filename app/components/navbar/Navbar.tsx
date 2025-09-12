import Image from "next/image";
import React from "react";
import Units from "./Units";

const Navbar = () => {
  return (
    <div className=" my-5 py-4 md:px-6 lg:px-16 xl:px-28 2xl:px-40">
      {/* logo */}
      <div className=" flex justify-between items-center">
        <Image src="/images/logo.svg" width={170} height={170} alt="logo" />

        {/* units */}
        <Units />
      </div>
    </div>
  );
};

export default Navbar;
