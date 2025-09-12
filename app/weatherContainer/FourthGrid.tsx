import Image from "next/image";
import React from "react";
import WeeksDayModal from "../modal/WeeksDayModal";

const FourthGrid = () => {
  return (
    <div className=" relative">
      <div className=" bg-neutral-700 rounded-md p-3">
        <div className=" flex items-center justify-between">
          <h1>Hourly forecast</h1>
          <div className=" bg-neutral-300/20 rounded-sm py-1 px-3 flex items-center gap-2">
            <span>Tuesday</span>
            <Image
              src="/images/icon-dropdown.svg"
              width={14}
              height={14}
              alt="unit-icon"
            />
          </div>
        </div>
        <div>
          <div className=" bg-neutral-300/20 rounded-md px-3 py-1 flex justify-between items-center">
            <span className=" flex items-center gap-1">
              <Image
                src="/images/icon-overcast.webp"
                width={30}
                height={30}
                alt="overcast"
              />
              3 pm
            </span>
            20
          </div>
        </div>
      </div>
      <div className="absolute right-3">
        <WeeksDayModal />
      </div>
    </div>
  );
};

export default FourthGrid;
