"use client"

import { useState } from "react";

import { EightBallProvider } from "../context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import { TwitterIcon } from "../utils/FontAwesome";
import Magic8Ball from "./Magic8Ball";

import { PersonalityConfig } from "../../lib/prompts";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <EightBallProvider personalityData={personalityData}>
      <div
        className={`flex flex-col items-center w-full lg:h-[90vh] h-[97vh] overflow-hidden gap-4 pr-5 pl-5 pt-25 pb-6 rounded-b-[40px] mb-10 -z-50`}
        style={{
          background: personalityData.theme.cssBackground
        }}
      >
        <PersonalityInfo />
        <Magic8Ball />

        <div className='flex flex-row items-center gap-2'>
          <a className="lg:!p-4 !p-5 !text-white !rounded-full !bg-black transition-transform hover:scale-110 active:scale-95" href="https://twitter.com/elonmusk" target="_blank">
            <TwitterIcon size={20} />
          </a>
        </div>

        <p className='text-sm text-center text-white/50'>
          The responses are AI-generated for entertainment purposes only. Do not take this seriously.
        </p>
      </div>
    </EightBallProvider>
  );
}