import { useEightBall } from "../context/EightBallContext";
import { useSound } from "use-sound";
import { toast } from "react-toastify";

import { shakeSounds, errorSound } from "../../../lib/sounds";
import { getRandomItem } from "../../../lib/rng";
import { getAnswer } from "../../../lib/api";
import {
  INITIAL_DICE_STYLE,
  RESULT_DICE_STYLE,
  SHAKE_DURATION,
  RESULT_SHOW_DELAY,
  QUESTION_MAX_LENGTH
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

  // const addToPersonalHistory = (answerData: APIResponse) => {
  //   let personalHistory = localStorage.getItem("personalHistory");

  //   if (!personalHistory) {
  //     localStorage.setItem("personalHistory", JSON.stringify([]));
  //   }

  //   personalHistory = localStorage.getItem("personalHistory");
  //   const history = JSON.parse(personalHistory!);

  //   if (history.length >= 50) {
  //     history.shift();
  //   }

  //   history.push(answerData);
  //   localStorage.setItem("personalHistory", JSON.stringify(history));
  // };

  const shakeEightBall = async () => {
    if (question.length > QUESTION_MAX_LENGTH) {
      playErrorSound();
      toast("Your question is too long.", { type: "error" });
      return;
    }

    setDiceStyle(INITIAL_DICE_STYLE);
    setBallCurrentState("shaking");

    try {
      const answerData = await getAnswer(question, currentPersonality.linkname);

      getRandomItem([playShakeSound1, playShakeSound2])();
      setCurrentResponse(answerData);
      // addToPersonalHistory(answerData);

      setTimeout(() => {
        setBallCurrentState("result");
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
          setDiceStyle(RESULT_DICE_STYLE);
          console.log("Shown result");
        }, RESULT_SHOW_DELAY);
      }, SHAKE_DURATION);

    } catch (error) {
      console.error("Error getting answer:", error);
      setBallCurrentState("error");
      toast("Something went wrong. Please try again.", { type: "error" });
    }
  };

  return {
    shakeEightBall
  };
}