import { toast } from "react-toastify";
import { useEightBall } from "../context/EightBallContext";

export default function useCopyText() {
  const {
    currentResponse
  } = useEightBall();

  const copyText = async () => {
    const isEmpty = !currentResponse.question.trim() || currentResponse.question === "[No question]";

    const textToCopy = (isEmpty
      ? `🎱 I asked the ${currentResponse.personality} Magic 8 Ball NOTHING.\n\n` +
      `It still replied:\n"${currentResponse.response}"`
      : `🎱 I asked the ${currentResponse.personality} Magic 8 Ball:\n` +
      `"${currentResponse.question}"\n\n` +
      `It replied:\n"${currentResponse.response}"`
    ) + `\n\n ✨ Try your luck: https://example.com`

    await navigator.clipboard.writeText(textToCopy);
    toast("Copied to clipboard!", { type: "success" });
  };

  return { copyText };
}