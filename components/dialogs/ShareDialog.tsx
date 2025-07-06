"use client"
 
import { useState } from "react";
import Modal from "../common/Modal";
import { useEightBall } from "../eightball/context/EightBallContext";

function ShareDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {
    shareImageLink
  } = useEightBall();
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Share Image</h1>
      <br />
      {shareImageLink ?
        <>
          <img src={shareImageLink} className="w-full rounded-2xl" />
          <br />
          <a href={shareImageLink} download={`eightball-${Date.now()}.png`} className="buttonBlue !p-3 rounded-lg !text-white">
            Download Image
          </a>
        </>
        :
        <div className="aspect-[5/6] bg-black/60 border border-white/10 rounded-2xl w-full flex items-center justify-center">
          <p className="text-white/50 text-center">
            Try asking the Magic 8 Ball a question first!
          </p>
        </div>
      }
    </Modal>
  );
}

export default ShareDialog;