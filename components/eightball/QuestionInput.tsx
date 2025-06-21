"use client"
;
import { useRef } from "react";
import { useEightBall } from "../context/EightBallContext";
import useEightBallShake from "../hooks/ShakeEightBall";

import { CloseIcon } from "../utils/FontAwesome";

export default function QuestionInput() {
  const questionRef = useRef<HTMLInputElement>(null);
  const { shakeEightBall } = useEightBallShake();
  const { setQuestion, ballCurrentState } = useEightBall();

  const deleteQuestion = () => {
    if (questionRef.current) questionRef.current.value = "";
    setQuestion("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") shakeEightBall();
    else if (e.key === "Delete") deleteQuestion();
  };

  return (
    <div className='flex flex-row gap-1 mt-2.5'>
      <input
        ref={questionRef}
        type='text'
        placeholder='Ask a question...'
        className='!text-3xl w-[65vw] lg:w-[35rem]'
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={ballCurrentState === "shaking"}
      />
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