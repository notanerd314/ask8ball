"use client"
 
import { useState } from "react";
import Modal from "../common/Modal";
import { useEightBall } from "../eightball/context/EightBallContext";

function ShareDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {
    question,
    answer,
    currentPersonality
  } = useEightBall();
  const [imageUrl, setImageUrl] = useState<string>("");

  function onOpen() {
    setImageUrl(`/api/image?question=${encodeURIComponent(question)}&response=${encodeURIComponent(answer)}&background=${encodeURIComponent(currentPersonality.theme.cssBackground)}`);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onOpen={onOpen}>
      <h1>Share Image</h1>
      <br />
      {imageUrl && 
        <>
          <img src={imageUrl} className="w-full rounded-2xl" />
          <br />
          <a href={imageUrl} download={`eightball-${Date.now()}.png`} className="buttonBlue !p-3 rounded-lg !text-white">
            Download Image
          </a>
        </>
      }
    </Modal>
  );
}

export default ShareDialog;