import { EightBallProvider } from "../context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import Magic8Ball from "./Magic8Ball";

import { PersonalityConfig } from "../../lib/prompts";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personalityData={personalityData}>
      <div
        className={`flex flex-col items-center w-full h-[85vh] lg:h-[94vh] overflow-hidden gap-0 pt-25 pb-6 rounded-b-[40px] mb-10 -z-50`}
        style={{
          background: personalityData.theme.cssBackground
        }}
      >
        <PersonalityInfo />
        <Magic8Ball />
        <p className='text-sm text-center text-white/50'>
          The responses are AI-generated for entertainment purposes only. Do not take this seriously.
        </p>
      </div>
    </EightBallProvider>
  );
}