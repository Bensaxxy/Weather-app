"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UnitsModal, { UnitPreferences } from "@/app/modal/UnitsModal";
import { motion, AnimatePresence } from "framer-motion";

interface UnitsProps {
  units: UnitPreferences;
  setUnits: React.Dispatch<React.SetStateAction<UnitPreferences>>;
}

const Units: React.FC<UnitsProps> = ({ units, setUnits }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="flex gap-2 items-center cursor-pointer bg-neutral-800 dark:bg-neutral-200/30 py-2 px-3 rounded focus:ring-1 focus:ring-neutral-200 outline-none"
      >
        <Image
          src="/images/icon-units.svg"
          width={14}
          height={14}
          alt="unit-icon"
        />
        <span className="font-[500]">Units</span>
        <Image
          src="/images/icon-dropdown.svg"
          width={14}
          height={14}
          alt="dropdown-icon"
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} // 👈 plays when unmounted
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute right-0 mt-2 z-50"
        >
          <UnitsModal
            selected={units}
            onSelect={(newUnits) => setUnits(newUnits)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Units;
