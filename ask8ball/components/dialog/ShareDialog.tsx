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
  const { answer }: { answer: string } = useGlobal();
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

        context!.font = '16px Arial';
        context!.fillStyle = 'white';
        context!.textAlign = 'center';
        context!.textBaseline = 'middle';

        let textList: string[] = [];
        let tempTextList: string[] = [];

        // Split the answer into lines based on width > 100
        Array.from(answer).forEach((char, index, arr) => {
          tempTextList.push(char);
          const textWidth = context!.measureText(tempTextList.join('')).width;

          if (textWidth > 100) {
            // Remove the last char that caused overflow, push previous line
            tempTextList.pop();
            textList.push(tempTextList.join(''));
            // Start new line with current char
            tempTextList = [char];
          }

          // On last char, push whatever is left
          if (index === arr.length - 1 && tempTextList.length > 0) {
            textList.push(tempTextList.join(''));
          }
        });

        const lineHeight = 20; // Adjust as needed for spacing

        // Total height of all lines combined
        const totalTextHeight = textList.length * lineHeight;

        // Starting Y so block is vertically centered
        const startY = (canvas.height / 2) - (totalTextHeight / 2) + (lineHeight / 2);

        // Draw each line centered horizontally and vertically spaced
        textList.forEach((text, index) => {
          context!.fillText(text, canvas.width / 2, startY + index * lineHeight);
        });
      };

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