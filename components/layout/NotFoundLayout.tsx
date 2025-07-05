'use client';

import { Button } from "../ui/Button";
import { ChevronRightIcon } from "../icons/FontAwesome";
import ResponsiveBackground from "./ResponsiveBackground";

export default function NotFoundLayout() {
  return (
    <>
      <div className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 md:w-[700px] md:rounded-md w-screen shadow-xl">
        <div className="flex flex-row items-center gap-4">
          <img src="/favicon404.min.svg" alt="404" width={100} height={100} />
          <p className="text-6xl font-bold">Not Found</p>
        </div>

        <br />
        <h1>You stupid person.</h1>
        <br />

        <Button 
          variant="blue" 
          className="mx-[50%]" 
          onClick={() => window.location.replace("/")}
        >
          Go Back <ChevronRightIcon />
        </Button>
      </div>
      <ResponsiveBackground />
    </>
  );
}