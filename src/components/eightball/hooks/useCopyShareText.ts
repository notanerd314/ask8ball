import { useState } from "react";
import { APIResponse } from "@/helpers/eightball/types";

export default function useCopyText(currentResponse: APIResponse) {
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
  if (!currentResponse.answer) {
    return `🎱 Try this Magic 8 Ball out! https://example.com`;
  }

  const isEmpty = !currentResponse.question.trim() || currentResponse.question === "[No question]";
  let textToCopy;

  if (isEmpty) {
    textToCopy = `🎱 I asked the ${currentResponse.personality} Magic 8 Ball NOTHING.\n\n` +
                 `It still replied: "${currentResponse.answer}"`;
  } else {
    textToCopy = `🎱 I asked the ${currentResponse.personality} Magic 8 Ball: ` +
                 `"${currentResponse.question}"\n\n` +
                 `It replied: "${currentResponse.answer}"`;
  }

  // const shareLink = "/share/" + encodeShareData(currentResponse.question, currentResponse.response, currentResponse.personality, currentResponse.shareSig);

  textToCopy += `\n\n✨ Try your luck: https://example.com`;
  return textToCopy;
}
