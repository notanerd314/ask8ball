'use client';

import Image from "next/image";
import { Button } from "../ui/Button";
import { RefreshIcon } from "../icons/FontAwesome";
import ResponsiveBackground from "./ResponsiveBackground";

interface ErrorLayoutProps {
  error: Error;
  reset: () => void;
  title?: string;
  icon?: string;
}

export default function ErrorLayout({ 
  error, 
  reset, 
  title = "Something broke",
  icon = "/favicon500.min.svg"
}: ErrorLayoutProps) {
  return (
    <>
      <div className="absolute p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 md:w-[700px] md:rounded-md w-screen">
        <div className="flex flex-row items-center gap-4">
          <Image src={icon} alt="Error" width={100} height={100} />
          <p className="text-6xl font-bold">{title}</p>
        </div>
        <br />
        <p className="text-2xl">{error.message}</p>
        <br />
        <Button variant="blue" onClick={() => reset()}>
          <RefreshIcon />
          Refresh
        </Button>
      </div>
      <ResponsiveBackground />
    </>
  );
}