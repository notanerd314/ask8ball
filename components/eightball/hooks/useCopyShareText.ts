import { useState } from "react";
import { useEightBall } from "../context/EightBallContext";
import { APIResponse } from "../../../lib/types/eightball";
import { encodeShareData } from "../../../lib/cryptography";

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

  // const shareLink = "/share/" + encodeShareData(currentResponse.question, currentResponse.response, currentResponse.personality, currentResponse.shareSig);

  textToCopy += `\n\n✨ Try your luck: https://example.com`;
  return textToCopy;
}
