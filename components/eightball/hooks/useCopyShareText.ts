import { useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import { APIResponse } from "../../../lib/types/api";
import { encodeShareData, createShareSignature } from "../../../lib/utils/share";

export default function useCopyText() {
  const { currentResponse } = useEightBall();
  const [copyIndicated, setCopyIndicated] = useState(false);

  const copyText = async () => {
    if (copyIndicated) return;

    const textToCopy = generateShareText(currentResponse);

    await navigator.clipboard.writeText(textToCopy);

    setCopyIndicated(true);
    setTimeout(() => {
      setCopyIndicated(false);
    }, 3000);
  };

  return { copyText, copyIndicated };
}

export function generateShareText(currentResponse: APIResponse): string {
  const isEmpty = !currentResponse.question.trim() || currentResponse.question === "[No question]";
  let textToCopy;

  if (isEmpty) {
    textToCopy = `🎱 I asked the ${currentResponse.personality} Magic 8 Ball NOTHING.\n\n` +
                 `It still replied: "${currentResponse.response}"`;
  } else {
    textToCopy = `🎱 I asked the ${currentResponse.personality} Magic 8 Ball: ` +
                 `"${currentResponse.question}"\n\n` +
                 `It replied: "${currentResponse.response}"`;
  }

  // Generate secure share link
  const shareData = {
    question: currentResponse.question,
    response: currentResponse.response,
    personality: currentResponse.personality,
    timestamp: Date.now()
  };
  
  const signature = createShareSignature(shareData, process.env.NEXT_PUBLIC_SHARE_SECRET || '');
  const shareToken = encodeShareData(shareData, signature);
  const shareLink = `/api/image/share-result?token=${shareToken}`;

  textToCopy += `\n\n✨ Try your luck: ${window.location.origin}${shareLink}`;
  return textToCopy;
}