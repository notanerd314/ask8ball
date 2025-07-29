"use client";

import EightBall from "./EightBall";
import { EightBallProvider } from "./EightBallContext";
import { PersonalityConfig } from "@/helpers/types";
import QuestionInput from "./QuestionInput";
import PersonalitySelector from "./PersonalitySelector";
import ShareButtons from "./ShareButtons";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personality={personalityData}>
      <main
        className="flex flex-col items-center justify-center h-screen gap-6 font-comicneue"
        style={{ background: personalityData?.theme?.cssBackground, opacity: 0.95 }}
      >
        <div className="px-3 text-center space-y-4">
          <h1 className="text-shadow-lg">The Magic 8 Ball</h1>
          <p className="text-2xl text-shadow-lg">{personalityData?.description}</p>
        </div>

        <PersonalitySelector />
        <EightBall />
        <QuestionInput />
        <ShareButtons />
      </main>
    </EightBallProvider>
  )
}