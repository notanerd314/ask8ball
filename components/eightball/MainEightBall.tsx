"use client"

import { useState } from "react";

import ShareDialog from "../dialogs/ShareDialog";

import { EightBallProvider } from "../context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import { ShareIcon } from "../utils/FontAwesome";
import Magic8Ball from "./Magic8Ball";

import { PersonalityConfig } from "../../lib/prompts";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <EightBallProvider personalityData={personalityData}>
      <div
        className={`flex flex-col items-center w-full lg:h-[90vh] h-[97vh] overflow-hidden gap-4 pr-5 pl-5 pt-25 pb-6 rounded-b-[40px] mb-10 -z-50`}
        style={{
          background: personalityData.theme.cssBackground
        }}
      >
        <ShareDialog isOpen={isShareOpen} setIsOpen={setIsShareOpen} />
        
        <PersonalityInfo />
        <Magic8Ball />

        <div className='flex flex-row items-center gap-2'>
          <button className="lg:!p-4 !p-5 text-green-400 !text-2xl !rounded-full bg-black/60 transition-transform hover:scale-110 active:scale-95" onClick={() => setIsShareOpen(true)}>
            <ShareIcon size={20} /> Share
          </button>
        </div>

        <p className='text-sm text-center text-white/50'>
          The responses are AI-generated for entertainment purposes only. Do not take this seriously.
        </p>
      </div>
    </EightBallProvider>
  );
}