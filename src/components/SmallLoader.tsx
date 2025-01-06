import React from "react";

export default function SmallLoader() {
  return (
    <div className="bg-slate-800 z-50">
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
