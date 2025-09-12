"use client";
import React, { useState } from "react";
import Image from "next/image";
import UnitsModal from "@/app/modal/UnitsModal";

const Units = () => {
  const [isOpen, setIsOpen] = useState(false);

  // I use this to flip the state every time the button is clicked
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <div className=" relative">
        <button
          onClick={toggleModal}
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

        {isOpen && (
          <div className="absolute right-0 mt-2 z-50">
            <UnitsModal />
          </div>
        )}
      </div>
    </div>
  );
};

export default Units;
