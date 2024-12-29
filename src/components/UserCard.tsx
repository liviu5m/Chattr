import React from "react";

export default function UserCard() {
  return (
    <div className={`rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-center gap-5 flex-col bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 py-10">
        <img
          src="/images/noPicture.png"
          className="w-20 h-20 rounded-full"
          alt=""
        />
        <button className="rounded-2xl bg-blue-600 font-bold text-lg px-7 py-4">
          Follow
        </button>
      </div>
      <div className="bg-slate-700/50 py-10 px-5 flex items-center flex-col gap-5 ">
        <h1 className="text-2xl text-center font-bold ">Meghan Carroll</h1>
        <p>underwire lover</p>
        <div className="flex items-center justify-between gap-5">
          <h2>
            <b>128 </b>
            <span>Followers</span>
          </h2>
          <h2>
            <b>0 </b>
            <span>Following</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
