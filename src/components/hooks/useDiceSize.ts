import { useRef, useEffect, useCallback } from "react";

/** 
 * Hook to track and update dice element size with resize handling
 * @param setDiceSize - Function to update dice size state
 * @returns Ref to attach to the dice SVG element
 */
export default function useDiceSize(setDiceSize: (size: { width: number; height: number }) => void) {
  const diceRef = useRef<SVGPathElement>(null);

  const updateSize = useCallback(() => {
    if (!diceRef.current) return;
    
    const rect = diceRef.current.getBoundingClientRect();
    setDiceSize({
      width: rect.width * 0.45,
      height: rect.height * 0.6,
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