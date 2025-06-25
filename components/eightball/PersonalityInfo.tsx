"use client";

import { useEightBall } from "../context/EightBallContext";
import * as motion from "motion/react-client";

export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall();

  return (
    <motion.div 
      className='absolute top-6 left-6 right-6 lg:right-auto lg:max-w-md p-6 leading-relaxed text-center lg:text-left bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10'
      initial={{ opacity: 0, x: -50, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className='!text-4xl lg:!text-5xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-2'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {currentPersonality.name}
      </motion.h1>
      <motion.p 
        className='text-white/90 text-lg font-medium'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {currentPersonality.long_name}
      </motion.p>
      <motion.div
        className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <p className="text-white/80 text-sm">
          {currentPersonality.description}
        </p>
      </motion.div>
    </motion.div>
  );
}