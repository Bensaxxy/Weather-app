import Image from "next/image";
import React from "react";

const ProgressLoading = () => {
  return (
    <div className="flex gap-2 items-center bg-neutral-600 dark:bg-neutral-300/20  rounded-lg py-3 px-4">
      <Image
        src="/images/icon-loading.svg"
        width={20}
        height={20}
        alt="loading"
      />
      <h1>Search in progress</h1>
    </div>
  );
};

export default ProgressLoading;
