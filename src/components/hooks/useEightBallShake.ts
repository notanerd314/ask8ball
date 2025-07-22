import { useState } from "react";

import { useEightBall } from "../eightball/EightBallContext";
import { QUESTION_MAX_LENGTH } from "@/helpers/constants";
import { EightBallState, APIResponse } from "@/helpers/types";

/** 
 * Hook that handles the eight ball shake animation and API call
 * @returns Object containing shakeEightBall function
 */
export default function useEightBallShake() {
  const {
    setCurrentBallState,
    currentPersonality,
    setCurrentResponse,
    question,
    setDiceStyle
  } = useEightBall();

  const shakeEightBall = async () => {
    // if (question.length > QUESTION_MAX_LENGTH) {
    //   return;
    // }

    setDiceStyle({
      opacity: 0,
      transition: "none"
    });
    setCurrentBallState(EightBallState.Shaking);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({
          question: question,
          personality: currentPersonality.linkname,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const answerData = await response.json();

      setCurrentResponse(answerData);

      setTimeout(() => {
        setCurrentBallState(EightBallState.Result);

        setTimeout(() => {
          setDiceStyle({
            transition: `opacity 0.75s ease`,
            opacity: 1,
          });
          console.log("Shown result");
        }, 500);
      }, 2200);

    } catch (error) {
      console.error("Error getting answer:", error);
    }
  };

  return {
    shakeEightBall
  };
}