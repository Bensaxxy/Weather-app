import Image from "next/image";
import React from "react";
import Units from "./Units";
import { UnitPreferences } from "@/app/modal/UnitsModal";

interface NavbarProps {
  units: UnitPreferences;
  setUnits: React.Dispatch<React.SetStateAction<UnitPreferences>>;
}

const Navbar: React.FC<NavbarProps> = ({ units, setUnits }) => {
  return (
    <div className=" my-5 py-4 md:px-6 lg:px-16 xl:px-28 2xl:px-40">
      {/* logo */}
      <div className=" flex justify-between items-center">
        <Image src="/images/logo.svg" width={170} height={170} alt="logo" />

        {/* units */}
        <Units units={units} setUnits={setUnits} />
      </div>
    </div>
  );
};

export default Navbar;
