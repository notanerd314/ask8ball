import { useEightBall } from "../context/EightBallContext";
import { useSound } from "use-sound";

import { toast } from "react-toastify";

import { shakeSounds, errorSound } from "../../lib/sounds";
import { getRandomItem } from "../../lib/rng";
import { getAnswer } from "../../lib/api";

export default function useEightBallShake() {
  const {
    setAnswer,
    setBallCurrentState,
    question,
    setDiceStyle,
    currentPersonality
  } = useEightBall();

  const [playShakeSound1] = useSound(shakeSounds[0]);
  const [playShakeSound2] = useSound(shakeSounds[1]);
  const [playErrorSound] = useSound(errorSound);

  const shakeEightBall = async () => {
    if (question.length > 100) {
      playErrorSound();
      toast("Your question is too long.", { type: "error" });
      return;
    }

    setDiceStyle({ opacity: "0", transition: "none" });
    setBallCurrentState("shaking");

    const answerData = await getAnswer(question, currentPersonality.linkname);

    setAnswer(answerData.response);

    getRandomItem([playShakeSound1, playShakeSound2])();

    setTimeout(() => {
      setBallCurrentState("result");
      setTimeout(() => {
        setDiceStyle({
          transition: "opacity 0.75s ease",
          opacity: "1",
        });
        console.log("Shown result");
      }, 500);
    }, 2200);
  };

  return {
    shakeEightBall
  };
}