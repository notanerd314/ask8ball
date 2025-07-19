import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare, faCamera } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import { APIResponse } from "../../lib/types/eightball";

export default function ShareButtons({ hasResponse, currentResponse }: { hasResponse: boolean, currentResponse: APIResponse }) {
  const { copyText, copyIndicated } = useCopyText(currentResponse);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mb-8 transition-all duration-500" style={{
      opacity: hasResponse ? 1 : 0,
      visibility: hasResponse ? "visible" : "hidden",
      transform: hasResponse ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
      pointerEvents: hasResponse ? "auto" : "none"
    }}>
      <button
        onClick={copyText}
        className={`
          flex items-center gap-3 !px-8 !py-4 !rounded-3xl !font-black !text-xl
          transition-all duration-300
          ${!hasResponse
            ? '!bg-yellow-400/20 !text-yellow-400/40 !border-4 !border-yellow-400/30 cursor-not-allowed'
            : copyIndicated
              ? '!bg-green-500 !text-white !border-4 !border-green-600'
              : '!bg-gradient-to-r !from-yellow-400 !to-orange-500 !text-white !border-4 !border-yellow-600'
          }
        `}
      >
        <FontAwesomeIcon icon={copyIndicated ? faShare : faCopy} />
        {copyIndicated ? "COPIED! ✨" : "COPY IT! 📋"}
      </button>

      <a
        href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
        target={hasResponse ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={`
          flex items-center gap-3 !px-8 !py-4 !rounded-3xl !font-black !text-xl transition-all duration-300
          ${!hasResponse
            ? '!bg-blue-500/20 !text-white/40 !border-4 !border-blue-500/30 cursor-not-allowed pointer-events-none'
            : '!bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !border-4 !border-blue-600'
          }
        `}
      >
        <FontAwesomeIcon icon={faXTwitter} />
        TWEET IT! 🐦
      </a>

      <a
        href={hasResponse ? `/api/image/share-result?question=${currentResponse.question}&response=${currentResponse.response}&personality=${currentResponse.personality}&sig=${currentResponse.shareSig}` : "#"}
        download={`${currentResponse.question}.jpg`}
        target="_self"
        rel="noopener noreferrer"
        className={`
          flex items-center gap-3 !px-8 !py-4 !rounded-3xl !font-black !text-xl
          transition-all duration-300
          !bg-gradient-to-r !from-pink-500 !to-red-500 !text-white !border-4 !border-pink-600
        `}
      >
        <FontAwesomeIcon icon={faCamera} />
        SCREENSHOT IT! 📸
      </a>
    </div>
  )
}