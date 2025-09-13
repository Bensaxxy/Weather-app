import Image from "next/image";
import React from "react";

const ThirdGrid = () => {
  return (
    <div className=" mt-5">
      <h1>Daily Forecast</h1>
      <div className=" grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-5 mt-2">
        {/* 1st week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">Tue</h1>
          <Image
            src="/images/icon-partly-cloudy.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>20</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>14</p>
              <sub>°</sub>
            </span>
          </div>
        </div>

        {/* 2nd week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">Wed</h1>
          <Image
            src="/images/icon-rain.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>21</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>15</p>
              <sub>°</sub>
            </span>
          </div>
        </div>
        {/* 1st week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">thu</h1>
          <Image
            src="/images/icon-sunny.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>20</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>14</p>
              <sub>°</sub>
            </span>
          </div>
        </div>
        {/* 1st week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">fri</h1>
          <Image
            src="/images/icon-overcast.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>20</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>14</p>
              <sub>°</sub>
            </span>
          </div>
        </div>
        {/* 1st week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">sat</h1>
          <Image
            src="/images/icon-storm.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>20</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>14</p>
              <sub>°</sub>
            </span>
          </div>
        </div>
        {/* 1st week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">sun</h1>
          <Image
            src="/images/icon-snow.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>20</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>14</p>
              <sub>°</sub>
            </span>
          </div>
        </div>
        {/* 7th week */}
        <div className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg">
          <h1 className=" text-sm font-[500] text-neutral-0">mon</h1>
          <Image
            src="/images/icon-fog.webp"
            width={40}
            height={40}
            alt="overcast"
          />
          <div className=" flex justify-between items-center w-full">
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>20</p>
              <sub>°</sub>
            </span>
            <span className=" flex text-sm font-[500] text-neutral-200">
              <p>14</p>
              <sub>°</sub>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdGrid;
