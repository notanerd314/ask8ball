"use client";
import { useEffect, useState } from "react";
import { APIResponse } from "../lib/types/eightball";
import Link from "next/link";

export default function PersonalHistoryList() {
  const [history, setHistory] = useState<APIResponse[]>([]);

  useEffect(() => {
    const personalHistory = localStorage.getItem("personalHistory");
    if (personalHistory) {
      setHistory(JSON.parse(personalHistory));
    }
  }, []);

  return (
    <ul className="mt-10 mx-auto max-w-4xl space-y-3 h-screen">
      {history.length !== 0 ? history
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((item, index) => (
          <li
            key={index}
            className="p-6 rounded-2xl bg-black/60 bg-opacity-10 border border-white/20"
          >
            <mark className="text-sm">🎱 {item.personality[0].toUpperCase() + item.personality.slice(1)}</mark>
            <legend className="my-2 text-xl"><strong>{item.question}</strong></legend>
            <p className="text-md mb-2">{item.response}</p>

            <hr className="mt-2 mb-4 border-white/30" />
            <small className="text-white/40">{new Date(item.createdAt).toUTCString()}</small>
          </li>
        )) : (
          <li className="p-6 rounded-2xl bg-black/60 bg-opacity-10 border border-white/20 text-center">
            <p className="text-lg">No responses yet, try <Link href="/play">asking</Link> a question!</p>
          </li>
        )}
    </ul>
  );
}
