import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import { APIResponse } from "../../lib/types/eightball";

export default function ShareButtons({ hasResponse, currentResponse }: { hasResponse: boolean, currentResponse: APIResponse }) {
  const { copyText, copyIndicated } = useCopyText(currentResponse);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6 transition-opacity" style={{
      opacity: hasResponse ? 1 : 0,
      visibility: hasResponse ? "visible" : "hidden",
      transform: hasResponse ? "scale(1)" : "scale(0.9)",
      transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
      pointerEvents: hasResponse ? "auto" : "none"
    }}>
      <button
        onClick={copyText}
        className={`
          flex items-center gap-2 px-6 py-3 !rounded-2xl font-medium
          transition-all duration-200 hover:scale-105
          ${!hasResponse
            ? 'bg-yellow-400/20 text-yellow/40 border border-yellow-400/30 cursor-not-allowed'
            : copyIndicated
              ? 'bg-green-500/40 text-green-300 border border-green-500/50'
              : 'bg-yellow-400/40 hover:bg-yellow-400/50 text-white border border-yellow-400/50'
          }
        `}
      >
        <FontAwesomeIcon icon={copyIndicated ? faShare : faCopy} />
        {copyIndicated ? "Copied!" : "Copy it!"}
      </button>

      <a
        href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
        target={hasResponse ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`
          flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200
          ${!hasResponse
            ? '!bg-blue-500/20 !text-white/40 border border-blue-500/30 cursor-not-allowed pointer-events-none'
            : '!bg-blue-500/40 hover:!bg-blue-500/50 !text-white border border-blue-500/50 hover:scale-105'
          }
        `}
      >
        <FontAwesomeIcon icon={faXTwitter} />
        Tweet it!
      </a>

      <a
        href={hasResponse ? `/api/image/share-result?question=${currentResponse.question}&response=${currentResponse.response}&personality=${currentResponse.personality}&sig=${currentResponse.shareSig}` : "#"}
        download={`${currentResponse.question}.jpg`}
        target="_self"
        rel="noopener noreferrer"
        className={`
          flex items-center gap-2 px-6 py-3 !rounded-2xl font-medium
          transition-all duration-200 hover:scale-105
          !bg-red-500/40 hover:!bg-red-500/50 !text-white border border-red-500/50
        `}
      >
        <FontAwesomeIcon icon={faCamera} />
        Screenshot it!
      </a>
    </div>
  )
}