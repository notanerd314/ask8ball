import { EightBallProvider } from "../context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import Magic8Ball from "./Magic8Ball";

import { PersonalityConfig } from "../../lib/prompts";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
    return (
        <EightBallProvider personalityData={personalityData}>
            <div className="flex flex-col items-center w-full h-[85vh] lg:h-[94vh] overflow-hidden gap-0 pt-25 pb-3 rounded-b-[50px] mb-10 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 -z-50">
                <PersonalityInfo />
                <Magic8Ball />
                <p className='text-sm text-center text-gray-400'>
                    The responses are AI-generated for entertainment purposes only. Do not take this seriously.
                </p>
                <div className='corner-bg'></div>
            </div>
        </EightBallProvider>
    );
}