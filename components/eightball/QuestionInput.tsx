"use client";

import { useRef, useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import useEightBallShake from "../hooks/ShakeEightBall";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CloseIcon } from "../icons/FontAwesome";
import { cn } from "../../lib/utils/cn";

export default function QuestionInput() {
  const questionRef = useRef<HTMLInputElement>(null);
  const [charactersLeft, setCharactersLeft] = useState(100);
  const { shakeEightBall } = useEightBallShake();
  const { setQuestion, ballCurrentState } = useEightBall();

  const deleteQuestion = () => {
    if (questionRef.current) questionRef.current.value = "";
    setQuestion("");
    setCharactersLeft(100);
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const charsLeft = 100 - input.length;
    setQuestion(input);
    setCharactersLeft(charsLeft);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      questionRef.current?.blur();
      shakeEightBall();
    } else if (e.key === "Delete") {
      deleteQuestion();
    }
  };

  const getCharacterCountColor = () => {
    if (charactersLeft <= 0) return "text-red-400";
    if (charactersLeft <= 30) return "text-red-300";
    return "text-white";
  };

  return (
    <div className='flex flex-row gap-1 mt-2.5'>
      <div className="flex">
        <Input
          ref={questionRef}
          type='text'
          placeholder='Ask a question...'
          size="xl"
          className='w-[65vw] lg:w-[35rem] !rounded-r-none'
          onKeyDown={handleKeyDown}
          onChange={changeQuestion}
          disabled={ballCurrentState === "shaking"}
        />
        <span className={cn(
          "rounded-md backdrop-blur-md bg-white/30 dark:bg-black/30 dark:border-slate-800 rounded-l-none p-3 w-15 text-center text-2xl",
          getCharacterCountColor()
        )}>
          {charactersLeft}
        </span>
      </div>

      <Button
        variant='red'
        rounded="lg"
        onClick={deleteQuestion}
        disabled={ballCurrentState === "shaking"}
        title='Clear question'
      >
        <CloseIcon />
      </Button>
    </div>
  );
}