"use client";

import EightBall from "./EightBall";
import { EightBallProvider } from "./EightBallContext";
import { PersonalityConfig } from "@/helpers/types";
import QuestionInput from "./QuestionInput";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personality={personalityData}>
      <main className="flex flex-col gap-6 items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h1>The Magic 8 Ball</h1>
          <p className="text-2xl">The fortune teller you did know you don't need it.</p>
        </div>

        <EightBall />
        <QuestionInput />
      </main>
    </EightBallProvider>
  )
}