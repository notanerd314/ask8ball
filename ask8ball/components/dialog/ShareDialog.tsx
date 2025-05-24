import { useState, useRef } from 'react';
import { useGlobal } from '../GlobalContext';
import { TwitterIcon } from '../FontAwesome';
import Modal from '../default/Modal';
import '../../styles/globals.css'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ShareDialog({ isOpen, onClose }: ModalProps) {
  const { answer } = useGlobal();
  const { question } = useGlobal();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createImage = () => {
    console.log("Drawing canvas...");

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context?.clearRect(0, 0, canvas.width, canvas.height);

      const eightBallImg = new Image();
      eightBallImg.src = '/images/eightball.png';

      eightBallImg.onload = () => {
        context?.drawImage(eightBallImg, 0, 0, canvas.width, canvas.height);

        // context?.font = '24px Arial'; 
        context?.fillText("weiuhdweudihewiudiuewhdewhdiuhewdi", canvas.width / 2, canvas.height / 2, canvas.width);
      }

      console.log("Drawing canvas done");
    } else {
      throw new Error("Canvas not found");
    }
  }

  return (
    <Modal isOpen={isOpen} onOpen={createImage} onClose={onClose}>
      <h1>Share Result</h1>
      <p>Question: {question}</p>
      <p>Answer: {answer}</p>
      <button className='buttonBlack'>
        <TwitterIcon /> Share on X
      </button>
      <canvas width={500} height={500} ref={canvasRef}></canvas>
    </Modal>
  )
}

export default ShareDialog