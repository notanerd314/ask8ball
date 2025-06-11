'use client';

import { useEffect, useState } from "react";

import Image from "next/image";

import notFoundMessages from "../lib/404error"
import { getRandomItem } from "../lib/rng"

import { ChevronRightIcon } from "../components/utils/FontAwesome"

export default function NotFound() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(getRandomItem(notFoundMessages));
  }, []);

  return (
    <>
      <div className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 md:w-[700px] md:rounded-md w-screen">
        <div className="flex flex-row items-center gap-4">
          <Image src="/favicon404.svg" alt="404" width={100} height={100}></Image>
          <p className="text-6xl font-bold">Not Found</p>
        </div>
        <br />
        <h1>{message}</h1>
        <br />
        <button className="p-4 mx-[50%] text-white bg-indigo-500 hover:bg-indigo-600" onClick={() => window.location.replace("/")}>Go Back <ChevronRightIcon /></button>      </div>
      <img className="fixed object-cover w-screen h-screen pointer-events-none -z-1" src="https://picsum.photos/1000/2000" alt="Background" />
    </>
  )
}