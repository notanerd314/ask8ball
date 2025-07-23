import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import { useEightBall } from "./EightBallContext";
import { EightBallState } from "@/helpers/types";

export default function ShareButtons() {
  const { currentResponse, currentBallState } = useEightBall();
  const hasResponse = currentBallState !== EightBallState.Shaking;

  const { copyText, copyIndicated } = useCopyText(currentResponse);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 transition-opacity sr" style={{
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
          flex items-center !py-3.5 !px-4 gap-2 !rounded-2xl font-medium
          transition-all duration-200 hover:scale-105
          ${!hasResponse
            ? 'bg-yellow-400/20 text-yellow/40 border border-yellow-400/30 cursor-not-allowed'
            : copyIndicated
              ? 'bg-green-500/40 text-green-300 border border-green-500/50'
              : 'bg-yellow-400/40 hover:bg-yellow-400/50 text-white border border-yellow-400/50'
          }
        `}
      >
        <FontAwesomeIcon icon={copyIndicated ? faCheck : faCopy} size="xl" />
      </button>

      <a
        href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
        target={hasResponse ? "_blank" : "_self"}
        rel="noopener noreferrer"
        title="Share result on Twitter!"
        className={`
          flex items-center gap-2 py-3.5 px-4 rounded-2xl font-medium transition-all duration-200
          ${!hasResponse
            ? '!bg-blue-500/20 !text-white/40 border border-blue-500/30 cursor-not-allowed pointer-events-none'
            : '!bg-blue-500/40 hover:!bg-blue-500/50 !text-white border border-blue-500/50 hover:scale-105'
          }
        `}
      >
        <FontAwesomeIcon icon={faXTwitter} size="xl" />
      </a>

      <a
        href={hasResponse ? `/api/image/share-result?question=${currentResponse.question}&response=${currentResponse.answer}&personality=${currentResponse.personality}` : "#"}
        download={`${currentResponse.question}.jpg`}
        target="_self"
        rel="noopener noreferrer"
        title="Download result as image!"
        className={`
          flex items-center gap-2 py-3.5 px-4 !rounded-2xl font-medium
          transition-all duration-200 hover:scale-105
          !bg-red-500/40 hover:!bg-red-500/50 !text-white border border-red-500/50
        `}
      >
        <FontAwesomeIcon icon={faCamera} size="xl" />
      </a>
    </div>
  )
}