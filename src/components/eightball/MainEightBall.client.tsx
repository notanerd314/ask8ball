"use client";

import EightBall from "./EightBall.client";
import { EightBallProvider } from "./EightBallContext.client";
import { PersonalityConfig } from "@/helpers/eightball/types";
import QuestionInput from "./QuestionInput.client";
import PersonalitySelector from "./PersonalitySelector";
import ShareButtons from "./ShareButtons.client";

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

        <footer>
          <p className="text-center text-white/40">
            Made with 💔 by notanerd
          </p>
        </footer>
      </main>
    </EightBallProvider>
  )
}