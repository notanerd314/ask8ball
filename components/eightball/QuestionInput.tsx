"use client";

import useEightBallShake from "./hooks/useEightBallShake";
import useQuestionInput from "./hooks/useQuestionInput";
import { useEightBall } from "./context/EightBallContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { QUESTION_MAX_LENGTH } from "../../lib/constants/eightball";

/** 
 * Optimized input component for asking questions
 * @returns JSX element with simplified question input interface
 */
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      questionRef.current?.blur();
      shakeEightBall();
    } else if (e.key === "Escape") {
      deleteQuestion();
    }
  };

  const handleSubmit = () => {
    questionRef.current?.blur();
    shakeEightBall();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Main input area */}
      <div className="relative group">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={questionRef}
              type="text"
              placeholder="Ask your question..."
              className={`
                w-full pr-16 text-lg md:text-xl
                bg-white/10 border border-white/20
                rounded-2xl px-6 py-4
                text-white placeholder-white/50
                focus:border-white/40 focus:ring-2 focus:ring-white/20
                transition-all duration-200
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onKeyDown={handleKeyDown}
              onChange={changeQuestion}
              disabled={isDisabled}
              maxLength={QUESTION_MAX_LENGTH}
            />
            
            {/* Character counter */}
            <div className={`
              absolute right-4 top-1/2 transform -translate-y-1/2
              text-sm font-medium transition-colors duration-200
              ${charactersLeftColor === 'text-red-400' ? 'text-red-400' : 
                charactersLeftColor === 'text-red-300' ? 'text-yellow-400' : 
                'text-white/40'}
            `}>
              {charactersLeft}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className={`
                p-4 rounded-2xl font-medium transition-all duration-200
                ${isDisabled 
                  ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105'
                }
              `}
              title="Ask the 8-ball"
            >
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </button>

            <button
              onClick={deleteQuestion}
              disabled={isDisabled}
              className="p-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-200 hover:scale-105"
              title="Clear question"
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>
          </div>
        </div>

        {/* Simplified progress bar */}
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`
              h-full transition-all duration-200 rounded-full
              ${charactersLeft <= 0 ? 'bg-red-400' : 
                charactersLeft <= 30 ? 'bg-yellow-400' : 
                'bg-green-400'}
            `}
            style={{ 
              width: `${Math.max(0, ((QUESTION_MAX_LENGTH - charactersLeft) / QUESTION_MAX_LENGTH) * 100)}%` 
            }}
          />
        </div>
      </div>

      {/* Quick suggestions */}
      {/* <div className="flex flex-wrap gap-2 justify-center">
        {[
          "Will I be successful?",
          "Should I take the risk?",
          "Is it meant to be?",
          "Will I find love?"
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => {
              if (questionRef.current && !isDisabled) {
                questionRef.current.value = suggestion;
                changeQuestion({ target: { value: suggestion } } as any);
              }
            }}
            disabled={isDisabled}
            className="px-3 py-2 text-sm rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 border border-white/10 hover:border-white/20"
          >
            {suggestion}
          </button>
        ))}
      </div> */}

      {/* Keyboard shortcuts hint */}
      <div className="text-center text-xs text-white/40 space-x-4">
        <span>Press <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd> to ask</span>
        <span>Press <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> to clear</span>
      </div>
    </div>
  );
}