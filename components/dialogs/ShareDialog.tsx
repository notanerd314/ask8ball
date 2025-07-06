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
      {shareImageLink && 
        <>
          <img src={shareImageLink} className="w-full rounded-2xl" />
          <br />
          <a href={shareImageLink} download={`eightball-${Date.now()}.png`} className="buttonBlue !p-3 rounded-lg !text-white">
            Download Image
          </a>
        </>
      }
    </Modal>
  );
}

export default ShareDialog;