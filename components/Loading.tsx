import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
      Content is loading. Please wait ...
    </div>
  );
};

export default Loading;
