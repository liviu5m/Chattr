import React from "react";

export default function Loader() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-slate-800 z-50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
