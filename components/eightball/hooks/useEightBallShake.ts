import { useEightBall } from "../context/EightBallContext";
import { useSound } from "use-sound";
import { toast } from "react-toastify";
import { useAsync } from "../../../lib/hooks/useAsync";
import { APIResponse, APIError } from "../../../lib/types/api";

import { shakeSounds, errorSound } from "../../../lib/sounds";
import { getRandomItem } from "../../../lib/rng";
import { getAnswer } from "../../../lib/api";
import { 
  INITIAL_DICE_STYLE, 
  RESULT_DICE_STYLE, 
  SHAKE_DURATION, 
  RESULT_SHOW_DELAY
} from "../../../lib/constants/eightball";

/** 
 * Hook that handles the eight ball shake animation and API call
 * @returns Object containing shakeEightBall function
 */
export default function useEightBallShake() {
  const {
    setCurrentResponse,
    setBallCurrentState,
    question,
    setDiceStyle,
    currentPersonality,
  } = useEightBall();

  const [playShakeSound1] = useSound(shakeSounds[0]);
  const [playShakeSound2] = useSound(shakeSounds[1]);
  const [playErrorSound] = useSound(errorSound);
  
  const { execute: executeAnswer, loading } = useAsync<APIResponse>();

  const shakeEightBall = async () => {
    if (loading) return; // Prevent multiple simultaneous requests
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setDiceStyle(INITIAL_DICE_STYLE);
    setBallCurrentState("shaking");

    await executeAnswer(async (signal) => {
      const answerData = await getAnswer(question, currentPersonality.linkname, signal);

      getRandomItem([playShakeSound1, playShakeSound2])();
      setCurrentResponse(answerData);

      setTimeout(() => {
        setBallCurrentState("result");

        setTimeout(() => {
          setDiceStyle(RESULT_DICE_STYLE);
        }, RESULT_SHOW_DELAY);

      }, SHAKE_DURATION);
      
      return answerData;
    }).catch((error) => {
      console.error("Error getting answer:", error);
      setBallCurrentState("error");
      playErrorSound();
      
      // Handle specific error types
      if (error.code === 'QUESTION_TOO_LONG') {
        toast("Your question is too long.", { type: "error" });
      } else if (error.code === 'PERSONALITY_NOT_FOUND') {
        toast("Personality not found.", { type: "error" });
      } else {
        toast("Something went wrong. Please try again.", { type: "error" });
      }
    });
  };

  return {
    shakeEightBall,
    isLoading: loading
  };
}