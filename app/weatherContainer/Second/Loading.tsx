import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <div className="bg-neutral-600  rounded-lg p-4 outline outline-neutral-500/60">
          <p className="font-[300] text-sm md:text-md text-neutral-200">
            Feels Like
          </p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
        <div className="bg-neutral-600  rounded-lg p-4 outline outline-neutral-500/60">
          <p className="font-[300] text-sm md:text-md text-neutral-200">
            Humidity
          </p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
        <div className="bg-neutral-600  rounded-lg p-4 outline outline-neutral-500/60">
          <p className="font-[300] text-sm md:text-md text-neutral-200">Wind</p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
        <div className="bg-neutral-600  rounded-lg p-4 outline outline-neutral-500/60">
          <p className="font-[300] text-sm md:text-md text-neutral-200">
            Precipitation
          </p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
