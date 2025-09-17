import Image from "next/image";
import React from "react";

const ProgressLoading = () => {
  return (
    <div className="flex gap-2 items-center bg-amber-900">
      <Image
        src="/images/icon-loading.svg"
        width={30}
        height={30}
        alt="loading"
      />
      <h1>Search in progress</h1>
    </div>
  );
};

export default ProgressLoading;
