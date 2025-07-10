"use client"

import { useState } from "react";
import Modal from "../common/Modal";
import { useEightBall } from "../eightball/context/EightBallContext";

/** 
 * Dialog for sharing eight ball results as text
 * @param isOpen - Whether the dialog is currently open
 * @param setIsOpen - Function to control dialog open state
 * @returns JSX element with copy dialog functionality
 */
export default function CopyDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {
    currentResponse
  } = useEightBall();

  const [isCopied, setIsCopied] = useState(false);

  const isEmpty = !currentResponse.question.trim() || currentResponse.question === "[No question]";

  const textToCopy = (isEmpty
    ? `🎱 I asked the ${currentResponse.personality} Magic 8 Ball NOTHING.\n\n` +
    `It still replied:\n"${currentResponse.response}"`
    : `🎱 I asked the ${currentResponse.personality} Magic 8 Ball:\n` +
    `"${currentResponse.question}"\n\n` +
    `It replied:\n"${currentResponse.response}"`
  ) + `\n\n ✨ Try your luck: https://example.com`

  function copyText() {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Copy Result</h1>
      <br />
      {currentResponse.response ?
        <>
          <textarea readOnly className="w-full rounded-2xl aspect-[2/1] border border-slate-800 resize-none !text-2xl" value={textToCopy} />
          <br />
          <button onClick={copyText} className="buttonBlue !p-3 rounded-lg !text-white">
            {isCopied ? "Copied!" : "Copy it!"}
          </button>
        </>
        :
        <div className="aspect-[2/1] bg-black/60 border border-white/10 rounded-2xl w-full flex items-center justify-center">
          <p className="text-white/50 text-center">
            Try asking the Magic 8 Ball a question first!
          </p>
        </div>
      }
    </Modal>
  );
}