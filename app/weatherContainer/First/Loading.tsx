import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="overflow-hidden rounded-xl h-[240px] flex flex-col gap-2 items-center justify-center bg-neutral-600 dark:bg-neutral-950 text-sm">
        <Image
          src="/images/icon-loading.svg"
          width={32}
          height={32}
          alt="loading"
        />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
