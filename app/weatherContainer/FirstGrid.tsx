import Image from "next/image";
import React from "react";

const FirstGrid = () => {
  return (
    <div className=" overflow-hidden rounded-xl">
      <div className="h-[240px] bg-[url('/images/bg-today-small.svg')] bg-cover bg-center  md:bg-[url('/images/bg-today-large.svg')]">
        <div className="h-full flex items-center justify-between px-4 md:px-6">
          <div>
            <h1 className=" text-2xl md:text-3xl font-[600]">
              Berlin, Germany
            </h1>
            <p className=" font-[300] mt-2 text-neutral-0 text-sm md:text-md">
              Tuesday, Aug 5, 2025
            </p>
          </div>
          <div className=" flex items-center">
            <Image
              src="/images/icon-sunny.webp"
              width={110}
              height={110}
              alt="overcast"
            />
            <span>
              <h1 className=" text-6xl md:text-8xl font-[700] italic">
                20 <sup>°</sup>
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstGrid;
