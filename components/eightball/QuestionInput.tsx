"use client"
  ;
import { useRef, useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import useEightBallShake from "../hooks/ShakeEightBall";

import { CloseIcon } from "../utils/FontAwesome";

export default function QuestionInput() {
  const questionRef = useRef<HTMLInputElement>(null);
  const [charactersLeft, setCharactersLeft] = useState(100);
  const [charactersLeftColor, setCharactersLeftColor] = useState("text-white");
  const { shakeEightBall } = useEightBallShake();
  const { setQuestion, ballCurrentState } = useEightBall();

  const deleteQuestion = () => {
    if (questionRef.current) questionRef.current.value = "";
    setQuestion("");
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const charsLeft = 100 - input.length;

    setQuestion(input);
    setCharactersLeft(charsLeft);

    if (charsLeft <= 0) {
      setCharactersLeftColor("text-red-400");
    } else if (charsLeft <= 30) {
      setCharactersLeftColor("text-red-300");
    } else {
      setCharactersLeftColor("text-white");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") shakeEightBall();
    else if (e.key === "Delete") deleteQuestion();
  };

  return (
    <div className='flex flex-row gap-1 mt-2.5'>
      <div className="flex">
        <input
          ref={questionRef}
          type='text'
          placeholder='Ask a question...'
          className='!text-3xl w-[65vw] lg:w-[35rem] !rounded-r-none'
          onKeyDown={handleKeyDown}
          onChange={(e) => changeQuestion(e)}
          disabled={ballCurrentState === "shaking"}
        />
        <span className={"text-2xl rounded-md backdrop-blur-md bg-white/30 dark:bg-black/30 dark:border-slate-800 rounded-l-none p-3 " + charactersLeftColor}>
          {charactersLeft}
        </span>
      </div>

      <button
        className='!text-3xl buttonRed'
        onClick={deleteQuestion}
        disabled={ballCurrentState === "shaking"}
        title='Clear question'
      >
        <CloseIcon />
      </button>
    </div>
  );
};