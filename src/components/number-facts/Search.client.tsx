"use client";
import { useRef } from "react";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  const search = () => {
    if (inputRef.current) {
      window.location.href = `/number-facts#fact-${inputRef.current.value}`
    }
  }
  
  return (
    <div className="flex w-full items-center gap-2 text-2xl">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search numbers..."
        title="Search numbers..."
        className="w-full py-3 px-4 bg-gray-200/90 border-3 border-blue-500 rounded-lg"
      />
      
      <button
        type="button"
        onClick={search}
        className="text-2xl bg-blue-500 py-3 px-4 rounded-lg text-white"
      >
        Find
      </button>
    </div>
  )
}