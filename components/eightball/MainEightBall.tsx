import { EightBallProvider } from "../context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import Magic8Ball from "./Magic8Ball";
import * as motion from "motion/react-client";

import { PersonalityConfig } from "../../lib/prompts";

export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
    return (
        <EightBallProvider personalityData={personalityData}>
            <motion.div 
                className="relative flex flex-col items-center w-full min-h-[90vh] lg:min-h-[94vh] overflow-hidden gap-0 pt-20 lg:pt-25 pb-8 rounded-b-[50px] mb-10 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
                        animate={{
                            x: [0, -25, 0],
                            y: [0, 15, 0],
                            scale: [1, 0.8, 1],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-60 h-60 bg-indigo-500/5 rounded-full blur-2xl"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                <PersonalityInfo />
                
                <div className="flex-1 flex items-center justify-center w-full">
                    <Magic8Ball />
                </div>
                
                <motion.p 
                    className='text-sm text-center text-gray-300 max-w-md px-4 leading-relaxed'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    ⚠️ The responses are AI-generated for entertainment purposes only. 
                    <br />
                    <span className="text-gray-400">Do not take this seriously or make important decisions based on these answers.</span>
                </motion.p>
            </motion.div>
        </EightBallProvider>
    );
}