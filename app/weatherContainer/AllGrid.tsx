import React from "react";
import FirstGrid from "./FirstGrid";
import SecondGrid from "./SecondGrid";
import ThirdGrid from "./ThirdGrid";
import FourthGrid from "./FourthGrid";

const AllGrid = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className=" col-span-2 bg-neutral-700">
        <FirstGrid />
        <SecondGrid />
        <ThirdGrid />
      </div>
      <FourthGrid />
    </div>
  );
};

export default AllGrid;
