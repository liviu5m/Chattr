import React from "react";

export default function Loader() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-slate-800 z-30">
      <div className="w-full h-full flex items-center justify-center">
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </div>
  );
}
