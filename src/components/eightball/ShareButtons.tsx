import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import { useEightBall } from "./EightBallContext";
import { EightBallState } from "@/helpers/eightball/types";

export default function ShareButtons() {
  const { currentResponse, currentBallState } = useEightBall();
  const hasResponse = currentBallState !== EightBallState.Shaking;

  const { copyText, copyIndicated } = useCopyText(currentResponse);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 transition-opacity" style={{
      opacity: hasResponse ? 1 : 0,
      visibility: hasResponse ? "visible" : "hidden",
      transform: hasResponse ? "scale(1)" : "scale(0.9)",
      transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
      pointerEvents: hasResponse ? "auto" : "none"
    }}>
      <button
        type="button"
        title="Copy result to clipboard!"
        onClick={copyText}
        className={`
          flex items-center !py-2.5 !px-4 gap-3 !rounded-2xl font-bold text-lg
          transition-all duration-200 hover:scale-105
          ${!hasResponse
            ? 'bg-yellow-400/20 text-yellow/40 border border-yellow-400/30 cursor-not-allowed'
            : copyIndicated
              ? 'bg-green-500/40 text-green-300 border border-green-500/50'
              : 'bg-yellow-400/40 hover:bg-yellow-400/50 text-white border border-yellow-400/50'
          }
        `}
      >
        {copyIndicated ? "Copied!" : "Copy"}
      </button>

      <a
        href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
        target={hasResponse ? "_blank" : "_self"}
        rel="noopener noreferrer"
        title="Share result on Twitter!"
        className={`
          flex items-center gap-3 py-2.5 px-4 rounded-2xl font-bold transition-all duration-200 text-lg
          ${!hasResponse
            ? '!bg-blue-500/20 !text-white/40 border border-blue-500/30 cursor-not-allowed pointer-events-none'
            : '!bg-blue-500/40 hover:!bg-blue-500/50 !text-white border border-blue-500/50 hover:scale-105'
          }
        `}
      >
        Tweet
      </a>
    </div>
  )
}