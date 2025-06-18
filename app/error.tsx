'use client';

import Image from "next/image";
import { RefreshIcon } from "../components/utils/FontAwesome";

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
  return (
    <>
      <div className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 md:w-[700px] md:rounded-md w-screen">
        <div className="flex flex-row items-center gap-4">
            <Image src="/favicon500.min.svg" alt="500" width={100} height={100}></Image>
          <p className="text-6xl font-bold">Something broke</p>
        </div>
        <br />
        <p className="text-2xl">{error.message}</p>
        <br />
        <button onClick={() => reset()} className="px-4 py-2 text-white bg-indigo-500 rounded">
          <RefreshIcon />
          Refresh
        </button>
      </div>

      <picture>
        <source media="(min-width: 1200px)" srcSet="/images/backgrounds/PC.jpg" />
        <source media="(min-width: 768px)" srcSet="/images/backgrounds/iPad.jpg" />
        <img
          className="fixed object-cover w-screen h-screen pointer-events-none -z-1"
          src="/images/backgrounds/Phone.jpg"
          alt="Background"
        />
      </picture>
    </>
  );
}