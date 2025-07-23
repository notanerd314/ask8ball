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
        className="flex flex-col gap-6 items-center justify-center h-screen"
        style={{ background: personalityData?.theme?.cssBackground, opacity: 0.95 }}
      >
        <div className="text-center space-y-4">
          <h1>The Magic 8 Ball</h1>
          <p className="text-2xl">The fortune teller you did know you don't need it.</p>
        </div>

        <PersonalitySelector />
        <EightBall />
        <QuestionInput />
        {/* <ShareButtons /> */}
      </main>
    </EightBallProvider>
  )
}