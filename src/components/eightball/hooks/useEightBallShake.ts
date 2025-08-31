
import { useEightBall } from "../EightBallContext.client";
import { APIResponse, EightBallState, AnswerPrompt } from "@/utils/eightball/types";

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
  } = useEightBall();

  const shakeSounds = new Array(5).fill(null); // slots for 5 sounds (1–5)

  const playRandomShakeSound = () => {
    const index = Math.floor(Math.random() * shakeSounds.length);

    // Lazy-load if not loaded yet
    if (!shakeSounds[index]) {
      const audio = new Audio(`/eightball/Shaking${index + 1}.mp3`);
      audio.preload = "auto";
      shakeSounds[index] = audio;
    }

    // Reuse & play
    const sound = shakeSounds[index];
    sound.currentTime = 0;
    sound.play();
  };

  const shakeEightBall = async () => {
    setCurrentBallState(EightBallState.Shaking);

    try {
      const response = await fetch("/eightball/api/ask", {
        method: "POST",
        body: JSON.stringify({
          question: question,
          personality: currentPersonality.linkname,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      // ❗ Check for non-2xx responses
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      let answerData: APIResponse;

      try {
        answerData = await response.json();
      } catch (jsonError) {
        throw new Error("Failed to parse API response.");
      }

      setCurrentResponse(answerData);
      playRandomShakeSound();

      setTimeout(() => {
        setCurrentBallState(EightBallState.Result);
      }, 2200);

    } catch (error) {
      console.error("Error during eight ball shake:", error);

      // Show fallback response to user
      setCurrentResponse({
        question: question,
        answer: "An error occurred. Please try again later.",
        answerType: AnswerPrompt.NoAnswer,
        personality: currentPersonality.linkname
      });

      setCurrentBallState(EightBallState.Result);
    }
  };

  return { shakeEightBall };
}