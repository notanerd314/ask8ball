"use client";

import { useRef, useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import useEightBallShake from "../hooks/ShakeEightBall";
import * as motion from "motion/react-client";

import { CloseIcon } from "../utils/FontAwesome";

export default function QuestionInput() {
  const questionRef = useRef<HTMLInputElement>(null);
  const [charactersLeft, setCharactersLeft] = useState(100);
  const [charactersLeftColor, setCharactersLeftColor] = useState("text-white/80");
  const [isFocused, setIsFocused] = useState(false);
  const { shakeEightBall } = useEightBallShake();
  const { setQuestion, ballCurrentState, question } = useEightBall();

  const deleteQuestion = () => {
    if (questionRef.current) questionRef.current.value = "";
    setQuestion("");
    setCharactersLeft(100);
    setCharactersLeftColor("text-white/80");
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const charsLeft = 100 - input.length;

    setQuestion(input);
    setCharactersLeft(charsLeft);

    if (charsLeft <= 0) {
      setCharactersLeftColor("text-red-400");
    } else if (charsLeft <= 20) {
      setCharactersLeftColor("text-orange-400");
    } else if (charsLeft <= 40) {
      setCharactersLeftColor("text-yellow-400");
    } else {
      setCharactersLeftColor("text-white/80");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") shakeEightBall();
    else if (e.key === "Delete") deleteQuestion();
  };

  const isDisabled = ballCurrentState === "shaking";

  return (
    <motion.div 
      className='flex flex-col items-center gap-4 mt-6 w-full max-w-2xl px-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex flex-row gap-2 w-full">
        <motion.div 
          className="flex flex-1 relative"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <input
            ref={questionRef}
            type='text'
            placeholder='Ask your question...'
            className={`
              !text-2xl lg:!text-3xl w-full !rounded-r-none !border-2 !border-white/20
              transition-all duration-300 ease-in-out
              ${isFocused ? '!border-purple-400 !bg-white/40' : '!bg-white/30'}
              ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:!bg-white/35'}
              placeholder:text-white/60
            `}
            onKeyDown={handleKeyDown}
            onChange={(e) => changeQuestion(e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isDisabled}
            maxLength={100}
          />
          <motion.span 
            className={`
              text-xl lg:text-2xl rounded-md backdrop-blur-md bg-white/20 border-2 border-white/20 border-l-0
              rounded-l-none p-3 px-4 flex items-center justify-center min-w-[60px]
              transition-all duration-300 ease-in-out
              ${charactersLeftColor}
              ${isFocused ? 'border-purple-400 bg-white/30' : ''}
            `}
            animate={{ 
              scale: charactersLeft <= 20 ? [1, 1.1, 1] : 1,
              color: charactersLeft <= 0 ? "#ef4444" : undefined
            }}
            transition={{ 
              scale: { duration: 0.5, repeat: charactersLeft <= 20 ? Infinity : 0 },
              color: { duration: 0.3 }
            }}
          >
            {charactersLeft}
          </motion.span>
        </motion.div>

        <motion.button
          className={`
            !text-2xl lg:!text-3xl buttonRed !px-4 !py-3 min-w-[60px]
            transition-all duration-200 ease-in-out
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          `}
          onClick={deleteQuestion}
          disabled={isDisabled}
          title='Clear question'
          whileHover={!isDisabled ? { scale: 1.05 } : {}}
          whileTap={!isDisabled ? { scale: 0.95 } : {}}
        >
          <CloseIcon />
        </motion.button>
      </div>

      {/* Question preview */}
      {question && question.length > 0 && (
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white/80 text-lg italic">
            "{question}"
          </p>
        </motion.div>
      )}

      {/* Helpful hints */}
      <motion.div
        className="text-center text-white/60 text-sm max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className="mb-2">💡 <strong>Pro tip:</strong> Ask yes/no questions for the best results!</p>
        <p className="text-xs">Press Enter to shake • Delete key to clear</p>
      </motion.div>
    </motion.div>
  );
}