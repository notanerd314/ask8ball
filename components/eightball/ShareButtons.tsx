import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import { APIResponse } from "../../lib/types/eightball";

export default function ShareButtons({ hasResponse, currentResponse }: { hasResponse: boolean, currentResponse: APIResponse }) {
  const { copyText, copyIndicated } = useCopyText();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      <button
        onClick={copyText}
        disabled={!hasResponse}
        className={`
          flex items-center gap-2 px-6 py-3 !rounded-2xl font-medium
          transition-all duration-200 hover:scale-105
          ${!hasResponse
            ? 'bg-yellow-400/20 text-yellow/40 border border-yellow-400/10 cursor-not-allowed'
            : copyIndicated
              ? 'bg-green-500/40 text-green-300 border border-green-500/30'
              : 'bg-yellow-400/40 hover:bg-yellow-400/50 text-white border border-yellow-400/20'
          }
        `}
      >
        <FontAwesomeIcon icon={copyIndicated ? faShare : faCopy} />
        {copyIndicated ? "Copied!" : hasResponse ? "Copy Result" : "Ask the Ball first!"}
      </button>

      <a
        href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
        target={hasResponse ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`
          flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200
          ${!hasResponse
            ? '!bg-blue-500/20 !text-white/40 border border-blue-500/20 cursor-not-allowed pointer-events-none'
            : '!bg-blue-500/40 hover:!bg-blue-500/50 !text-white border border-blue-500/30 hover:scale-105'
          }
        `}
      >
        <FontAwesomeIcon icon={faXTwitter} />
        Tweet it!
      </a>
    </div>
  )
}