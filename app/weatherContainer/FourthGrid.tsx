"use client";
import React, { useState } from "react";
import Image from "next/image";
import WeeksDayModal from "../modal/WeeksDayModal";

const FourthGrid = () => {
  const [isOpen, setIsOpen] = useState(false);

  // I use this to flip the state every time the button is clicked
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="">
      <div className=" bg-neutral-700 rounded-md p-3">
        <div className=" flex items-center justify-between mb-2 ">
          <h1>Hourly forecast</h1>
          <button
            onClick={toggleModal}
            type="button"
            className=" bg-neutral-300/20 rounded-sm py-1 px-3 flex items-center gap-2 relative cursor-pointer focus:ring-2 focus:ring-neutral-0 outline-none"
          >
            <span>Tuesday</span>
            <Image
              src="/images/icon-dropdown.svg"
              width={14}
              height={14}
              alt="unit-icon"
            />
            {isOpen && (
              <div className="absolute right-0 top-8">
                <WeeksDayModal />
              </div>
            )}
          </button>
        </div>
        <div>
          {/* 1st forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-overcast.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              3 PM
            </span>
            <span>
              20<sup>°</sup>
            </span>
          </div>

          {/* 2nd forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-partly-cloudy.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              4 PM
            </span>
            <span>
              20<sup>°</sup>
            </span>
          </div>

          {/* 3rd forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-sunny.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              5 PM
            </span>
            <span>
              20<sup>°</sup>
            </span>
          </div>

          {/* 4th forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-overcast.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              6 PM
            </span>
            <span>
              19<sup>°</sup>
            </span>
          </div>

          {/* 5th forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-snow.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              7 PM
            </span>
            <span>
              18<sup>°</sup>
            </span>
          </div>

          {/* 6th forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-fog.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              8 PM
            </span>
            <span>
              18<sup>°</sup>
            </span>
          </div>

          {/* 7th forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-snow.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              9 PM
            </span>
            <span>
              17<sup>°</sup>
            </span>
          </div>

          {/* 8th forecast */}
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center mb-2">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-overcast.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              10 PM
            </span>
            <span>
              17<sup>°</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthGrid;
