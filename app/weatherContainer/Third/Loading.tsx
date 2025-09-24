import React from "react";

const Loading = () => {
  return (
    <div>
      <h1 className="font-semibold">Daily Forecast</h1>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-5 mt-2">
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
        <div className="bg-neutral-600  py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg h-30"></div>
      </div>
    </div>
  );
};

export default Loading;
