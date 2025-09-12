import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className=" my-5 p-4 md:px-6 lg:px-10 xl:px-20">
      {/* logo */}
      <div className=" flex justify-between items-center">
        <Image src="/images/logo.svg" width={150} height={150} alt="logo" />
        <div>Units</div>
      </div>
    </div>
  );
};

export default Navbar;
