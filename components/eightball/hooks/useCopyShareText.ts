import { useState } from "react";
import { useEightBall } from "../context/EightBallContext";

export default function useCopyText() {
  const { currentResponse } = useEightBall();
  const [copyIndicated, setCopyIndicated] = useState(false);

  const copyText = async () => {
    if (copyIndicated) return;

    const isEmpty = !currentResponse.question.trim() || currentResponse.question === "[No question]";
    let textToCopy;

    if (isEmpty) {
      textToCopy = `🎱 I asked the ${currentResponse.personality} Magic 8 Ball NOTHING.\n\n` +
                   `It still replied:\n"${currentResponse.response}"`;
    } else {
      textToCopy = `🎱 I asked the ${currentResponse.personality} Magic 8 Ball:\n` +
                   `"${currentResponse.question}"\n\n` +
                   `It replied:\n"${currentResponse.response}"`;
    }

    textToCopy += `\n\n ✨ Try your luck: https://example.com`;

    await navigator.clipboard.writeText(textToCopy);

    setCopyIndicated(true);
    setTimeout(() => {
      setCopyIndicated(false);
    }, 3000);
  };

  return { copyText, copyIndicated };
}
