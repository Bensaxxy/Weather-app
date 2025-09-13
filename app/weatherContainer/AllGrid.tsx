import React from "react";
import FirstGrid from "./FirstGrid";
import SecondGrid from "./SecondGrid";
import ThirdGrid from "./ThirdGrid";
import FourthGrid from "./FourthGrid";

const AllGrid = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className=" col-span-2">
        <div className="grid gap-4">
          <FirstGrid />
          <SecondGrid />
          <ThirdGrid />
        </div>
      </div>
      <div className="row-span-3">
        <FourthGrid />
      </div>
    </div>
  );
};

export default AllGrid;
