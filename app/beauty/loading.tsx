import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
      <p className="text-24-bold text-center">
        Content is loading. Please wait ...
      </p>
    </div>
  );
};

export default Loading;
