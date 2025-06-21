'use client';

import { useEffect, useState } from "react";

import { getRandomItem } from "../lib/rng"

import { ChevronRightIcon } from "../components/utils/FontAwesome"

export default function NotFound() {
  return (
    <>
      <div className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 md:w-[700px] md:rounded-md w-screen shadow-xl">
        <div className="flex flex-row items-center gap-4">
          <img src="/favicon404.min.svg" alt="404" width={100} height={100}></img>
          <p className="text-6xl font-bold">Not Found</p>
        </div>

        <br />
        <h1>You stupid person.</h1>
        <br />

        <button className="p-4 mx-[50%] text-white bg-indigo-500 hover:bg-indigo-600" onClick={() => window.location.replace("/")}>Go Back <ChevronRightIcon /></button>
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
  )
}