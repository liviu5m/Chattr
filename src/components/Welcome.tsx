import React from "react";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center flex-col h-[calc(100vh-96px)] gap-10">
      <h1 className="text-5xl text-center">A responsive and accessible full stack social media web app.</h1>
      <button className="bg-blue-500 rounded-lg font-bold px-7 py-4">Get Started</button>
    </div>
  );
}
