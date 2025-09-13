import React from "react";

const SecondGrid = () => {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {/* first */}
      <div className=" bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className=" font-[300] text-sm md:text-md text-neutral-200">
          Feels Like
        </p>
        <span>
          <h1 className=" mt-4 text-2xl font-[300]">
            18<sup>°</sup>
          </h1>
        </span>
      </div>
      {/* second */}
      <div className=" bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className=" font-[300] text-sm md:text-md text-neutral-200">
          Humidity
        </p>
        <span>
          <h1 className=" mt-4 text-2xl font-[300]">46%</h1>
        </span>
      </div>
      {/* third */}
      <div className=" bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className=" font-[300] text-sm md:text-md text-neutral-200">Wind</p>
        <span>
          <h1 className=" mt-4 text-2xl font-[300]">14 Km/h</h1>
        </span>
      </div>
      {/* fourth */}
      <div className=" bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className=" font-[300] text-sm md:text-md text-neutral-200">
          Precipitation
        </p>
        <span>
          <h1 className=" mt-4 text-2xl font-[300]">0 mm</h1>
        </span>
      </div>
    </div>
  );
};

export default SecondGrid;
