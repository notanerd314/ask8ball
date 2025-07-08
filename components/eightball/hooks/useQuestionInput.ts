import { useRef, useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import { CHARACTER_LIMITS } from "../../../lib/constants/eightball";

/** Hook for managing question input state and character counting */
export default function useQuestionInput() {
  const questionRef = useRef<HTMLInputElement>(null);
  const [charactersLeft, setCharactersLeft] = useState<number>(CHARACTER_LIMITS.MAX_LENGTH);
  const [charactersLeftColor, setCharactersLeftColor] = useState("text-white");
  const { setQuestion, ballCurrentState } = useEightBall();

  const deleteQuestion = () => {
    if (questionRef.current) questionRef.current.value = "";
    setQuestion("");
    setCharactersLeft(CHARACTER_LIMITS.MAX_LENGTH);
    setCharactersLeftColor("text-white");
  };

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const charsLeft = CHARACTER_LIMITS.MAX_LENGTH - input.length;

    setQuestion(input);
    setCharactersLeft(charsLeft);

    if (charsLeft <= 0) {
      setCharactersLeftColor("text-red-400");
    } else if (charsLeft <= CHARACTER_LIMITS.WARNING_THRESHOLD) {
      setCharactersLeftColor("text-red-300");
    } else {
      setCharactersLeftColor("text-white");
    }
  };

  return {
    questionRef,
    charactersLeft,
    charactersLeftColor,
    deleteQuestion,
    changeQuestion,
    isDisabled: ballCurrentState === "shaking"
  };
}