"use client";

import useEightBallShake from "./hooks/useEightBallShake";
import useQuestionInput from "./hooks/useQuestionInput";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const INPUT_STYLES = "!text-2xl w-[65vw] lg:w-[35rem] !rounded-r-none";
const COUNTER_STYLES = "rounded-md backdrop-blur-md bg-black/50 rounded-l-none p-3 w-15 text-center text-2xl";

/** 
 * Input component for asking questions to the eight ball
 * @returns JSX element with question input and character counter
 */
export default function QuestionInput() {
  const { shakeEightBall } = useEightBallShake();
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
    } else if (e.key === "Delete") {
      deleteQuestion();
    }
  };

  return (
    <div className='flex flex-row gap-1 mt-2.5'>
      <div className="flex">
        <input
          ref={questionRef}
          type='text'
          placeholder='Ask a question...'
          className={INPUT_STYLES}
          onKeyDown={handleKeyDown}
          onChange={changeQuestion}
          disabled={isDisabled}
        />
        <span className={`${COUNTER_STYLES} ${charactersLeftColor}`}>
          {charactersLeft}
        </span>
      </div>

      <button
        className='buttonRed !rounded-lg'
        onClick={deleteQuestion}
        disabled={isDisabled}
        title='Clear question'
      >
        <FontAwesomeIcon icon={faXmark} color="white" size="xl" />
      </button>
    </div>
  );
}