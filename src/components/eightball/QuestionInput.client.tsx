"use client";

import { useRef, useState } from "react";
import useEightBallShake from "./hooks/useEightBallShake";
import { QUESTION_MAX_LENGTH } from "@/utils/eightball/types";
import { useEightBall } from "./EightBallContext.client";
import { EightBallState } from "@/utils/eightball/types";

export default function QuestionInput() {
  const { setQuestion, currentBallState } = useEightBall();
  const { shakeEightBall } = useEightBallShake();
  const [charactersLeft, setCharactersLeft] = useState<number>(QUESTION_MAX_LENGTH);
  const questionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    questionRef.current?.blur();
    shakeEightBall();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuestion(input);

    const charsLeft = QUESTION_MAX_LENGTH - input.length;
    setCharactersLeft(charsLeft);
  };

  const charColor = charactersLeft <= 0
    ? "text-red-400"
    : charactersLeft <= 30
      ? "text-yellow-400"
      : "text-white/40";

  const isDisabled = currentBallState === EightBallState.Shaking; 

  return (
    <fieldset className="w-full max-w-2xl mx-auto px-7" disabled={isDisabled}>
      <legend className="sr-only">Ask your question</legend>

      <div className="relative flex-1">
        <input
          ref={questionRef}
          type="text"
          placeholder="Ask a yes or no question..."
          maxLength={QUESTION_MAX_LENGTH}
          title="Ask a yes/no question..."
          onKeyDown={handleKeyDown}
          onChange={changeQuestion}
          disabled={isDisabled}
          className={`
              w-full pr-16 px-6 py-4 text-lg md:text-xl rounded-2xl shadow-lg
              border border-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/20
              transition-all duration-200
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
        />
        <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium ${charColor}`}>
          {charactersLeft}
        </span>
      </div>
    </fieldset>
  );
}
