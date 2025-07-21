"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useEightBallShake from "./hooks/useEightBallShake";
import useQuestionInput from "./hooks/useQuestionInput";
import { QUESTION_MAX_LENGTH } from "../../lib/constants/eightball";

export default function QuestionInput() {
  const { shakeEightBall } = useEightBallShake();
  const {
    questionRef,
    charactersLeft,
    deleteQuestion,
    changeQuestion,
    isDisabled
  } = useQuestionInput();

  const handleSubmit = () => {
    questionRef.current?.blur();
    shakeEightBall();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    else if (e.key === "Escape") deleteQuestion();
  };

  const progress = Math.max(0, ((QUESTION_MAX_LENGTH - charactersLeft) / QUESTION_MAX_LENGTH) * 100);
  const charColor = charactersLeft <= 0
    ? "text-red-400"
    : charactersLeft <= 30
      ? "text-yellow-400"
      : "text-white/40";

  const progressColor = charactersLeft <= 0
    ? "bg-red-400"
    : charactersLeft <= 30
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <fieldset className="w-full max-w-2xl mx-auto space-y-4 bg-black/30 rounded-2xl !py-3" disabled={isDisabled}>
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
              w-full pr-16 px-6 py-4 text-lg md:text-xl rounded-2xl
              border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20
              transition-all duration-200
              ${isDisabled ? "opacity-50 cursor-not-allowed text-center" : ""}
            `}
        />
        <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium ${charColor}`}>
          {charactersLeft}
        </span>
      </div>

      <div className="h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressColor} transition-all duration-200 rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </fieldset>
  );
}
