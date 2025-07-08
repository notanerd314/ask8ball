import { useRef, useEffect, useCallback } from "react";
import { DiceSize } from "../../../lib/types/eightball";
import { DICE_SIZE_MULTIPLIER } from "../../../lib/constants/eightball";

/** Hook to track and update dice element size with resize handling */
export default function useDiceSize(setDiceSize: (size: DiceSize) => void) {
  const diceRef = useRef<SVGPathElement>(null);

  const updateSize = useCallback(() => {
    if (!diceRef.current) return;
    
    const rect = diceRef.current.getBoundingClientRect();
    setDiceSize({
      width: rect.width * DICE_SIZE_MULTIPLIER,
      height: rect.height * DICE_SIZE_MULTIPLIER,
    });
  }, [setDiceSize]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 100);
    };

    window.addEventListener("resize", handleResize);
    updateSize(); // Initial size

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateSize]);

  return diceRef;
}