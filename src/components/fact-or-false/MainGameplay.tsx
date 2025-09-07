"use client";

import { useFactOrFalse } from "./FactOrFalseContext";
import style from "./MainGameplay.module.css";

export default function MainGameplay() {
  const { fact, gameState, checkAnswer, switchToNextFact } = useFactOrFalse();

  return (
    <main className={style.container}>
      <h2 className="font-bold text-5xl text-center text-shadow-xl text-shadow-black">{fact?.statement || gameState === "loading" && "Loading fact..."}</h2>

      {/* <div className="mx-auto space-x-1.5 mt-5" hidden={gameState !== "playing"}>
        <button className="px-3 py-2 bg-green-500 text-2xl rounded-xl text-white cursor-pointer" onClick={() => checkAnswer(true)}>Fact</button>
        <button className="px-3 py-2 bg-red-500 text-2xl rounded-xl text-white cursor-pointer" onClick={() => checkAnswer(false)}>False</button>
      </div>

      <div className="mx-auto mt-5" hidden={gameState !== "correct"}>
        <h2 className="font-bold text-5xl text-center">Correct!</h2>
      </div>
      <div className="mx-auto mt-5" hidden={gameState !== "wrong"}>
        <h2 className="font-bold text-5xl text-center">Wrong!</h2>
      </div>
      <button hidden={gameState !== "correct" && gameState !== "wrong"} className="mx-auto mt-5 px-3 py-2 bg-blue-500 text-2xl rounded-xl text-white cursor-pointer" onClick={switchToNextFact}>Next</button> */}
    </main>
  );
}