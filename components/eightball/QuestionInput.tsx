"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEightBall } from "./context/EightBallContext";
import useEightBallShake from "./hooks/useEightBallShake";
import useQuestionInput from "./hooks/useQuestionInput";
import { QUESTION_MAX_LENGTH } from "../../lib/constants/eightball";

export default function QuestionInput() {
  const { shakeEightBall } = useEightBallShake();
  const { currentPersonality } = useEightBall();
  const {
    questionRef,
    charactersLeft,
    charactersLeftColor,
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
    <fieldset className="w-full max-w-2xl mx-auto space-y-4" disabled={isDisabled}>
      <legend className="sr-only">Ask your question</legend>

      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={questionRef}
            type="text"
            placeholder="Ask your question..."
            maxLength={QUESTION_MAX_LENGTH}
            onKeyDown={handleKeyDown}
            onChange={changeQuestion}
            disabled={isDisabled}
            className={`
          w-full pr-16 px-6 py-4 text-lg md:text-xl rounded-2xl
          bg-white/10 text-white placeholder-white/50
          border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20
          transition-all duration-200
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
          />
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium ${charColor}`}>
            {charactersLeft}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            title="Ask the 8-ball"
            className={`
          p-4 rounded-2xl transition-all duration-200
          ${isDisabled
                ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105"}
        `}
          >
            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
          </button>

          <button
            type="button"
            onClick={deleteQuestion}
            title="Clear question"
            className={`
          p-4 rounded-2xl text-white transition-all duration-200 hover:scale-105
          ${isDisabled ? "bg-red-500/30 cursor-not-allowed" : "bg-red-500/70 hover:bg-red-500/80"}
        `}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
      </div>

      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${progressColor} transition-all duration-200 rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </fieldset>
  );
}
