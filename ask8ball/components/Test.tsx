"use client";

import { useState } from "react";

function TestAI() {
  const [response, setResponse] = useState("");

  const testAI = async () => {
    const res = await fetch("/api/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: "Will I be rich one day?" }),
    });

    const data = await res.json();
    setResponse(data.response); // assuming your API returns { reply: "..." }
  };

  return (
    <>
      <button onClick={testAI}>test ai</button>
      <p>{response}</p>
    </>
  );
}

export default TestAI;
