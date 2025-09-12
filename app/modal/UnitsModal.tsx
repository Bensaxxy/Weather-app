import React from "react";

const UnitsModal = () => {
  return (
    <div>
      <div className="bg-neutral-700 p-2 mt-2 w-46 md:w-50 rounded-md z-20">
        {/* Switch to Imperial */}
        <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
          <h1 className=" text-sm md:text-md">Switch to Imperial</h1>
        </div>

        {/* Temperature */}
        <div>
          <p className=" text-sm md:text-md my-2 font-[300] text-neutral-200">
            Temperature
          </p>
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1>Celsius</h1>
          </div>
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1>Fahrenheit</h1>
          </div>
          <hr className=" border-neutral-600" />
        </div>
        {/* Wind Speed */}
        <div>
          <p className=" text-sm md:text-md my-2 font-[300] text-neutral-200">
            Wind Speed
          </p>
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1>Km/h</h1>
          </div>
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1>mph</h1>
          </div>
          <hr className=" border-neutral-600" />
        </div>
      </div>
    </div>
  );
};

export default UnitsModal;
