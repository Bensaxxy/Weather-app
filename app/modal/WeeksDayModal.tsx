import React from "react";

const WeeksDayModal = () => {
  return (
    <div>
      <div>
        <div className="bg-neutral-700 p-2 mt-2 w-46 md:w-50 rounded-md z-50 outline-white drop-shadow-md">
          {/* monday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Monday</h1>
          </div>
          {/* tuesday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Tuesday</h1>
          </div>
          {/* wednesday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Wednesday</h1>
          </div>
          {/* thursday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Thursday</h1>
          </div>
          {/* friday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Friday</h1>
          </div>
          {/* saturday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Saturday</h1>
          </div>
          {/* sunday */}
          <div className=" cursor-pointer hover:bg-neutral-300/10 py-[5px] px-2 rounded-md shadow-2xl ">
            <h1 className=" text-sm md:text-md">Sunday</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeksDayModal;
