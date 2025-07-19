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
    <fieldset className="w-full max-w-3xl mx-auto space-y-6 glass-dark !py-6 !px-6" disabled={isDisabled}>
      <legend className="sr-only">Ask your question</legend>

      <div className="relative flex items-center gap-4">
        <div className="relative flex-1">
          <input
            ref={questionRef}
            type="text"
            placeholder="Ask me anything magical! ✨"
            maxLength={QUESTION_MAX_LENGTH}
            title="Ask me anything magical!"
            onKeyDown={handleKeyDown}
            onChange={changeQuestion}
            disabled={isDisabled}
            className={`
              w-full pr-20 px-8 py-6 text-xl md:text-2xl rounded-3xl font-bold
              transition-all duration-300
              ${isDisabled ? "opacity-50 cursor-not-allowed text-center" : ""}
            `}
          />
          <span className={`absolute right-6 top-1/2 -translate-y-1/2 text-lg font-black ${charColor}`}>
            {charactersLeft}
          </span>
        </div>

        <div className="flex gap-4" hidden={isDisabled}>
          <button
            type="button"
            onClick={handleSubmit}
            title="Ask the 8-ball"
            className={`
              !p-6 !rounded-3xl transition-all duration-300 !text-2xl
              ${isDisabled
                ? "!bg-gray-500/20 !text-gray-400 cursor-not-allowed"
                : "buttonPrimary"
              }
            `}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>

          <button
            type="button"
            onClick={deleteQuestion}
            title="Clear question"
            className="buttonRed !p-6 !text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>

      <div className="h-3 bg-black/50 rounded-full overflow-hidden border-2 border-white/30">
        <div
          className={`h-full ${progressColor} transition-all duration-300 rounded-full relative overflow-hidden`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
    </fieldset>
  );
}
