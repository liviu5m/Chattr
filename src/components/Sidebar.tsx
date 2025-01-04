"use client";

import { SignOutButton } from "@clerk/nextjs";
import {
  faArrowRightFromBracket,
  faArrowsLeftRightToLine,
  faArrowUpFromBracket,
  faBell,
  faExpand,
  faPager,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Sidebar({
  page,
  setPage,
}: {
  page: string;
  setPage: (page: string) => void;
}) {
  return (
    <div className="left-0 fixed bottom-0 xl:left-[15%] 2xl:left-[20%] lg:left-[10%] md:left-[5%] md:w-fit md:top-0 md:bottom-auto w-full bg-slate-900/90 py-5 md:py-0 z-50">
      <div className="w-full flex justify-center gap-[10px] md:justify-between md:h-screen md:flex-col ">
        <div>
          <h1 className="text-blue-500 text-3xl my-10 font-bold px-5 md:block hidden">
            Chattr
          </h1>
          <ul className="flex md:flex-col gap-5">
            <li>
              <button
                className={`flex items-center gap-4 hover:bg-blue-500 px-5 py-3 rounded-lg ${
                  page == "feed" ? "bg-blue-500" : ""
                }`}
                onClick={() => setPage("feed")}
              >
                <FontAwesomeIcon icon={faExpand} className="w-6" />
                <span className="font-bold hidden md:block">Feed</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-4 hover:bg-blue-500 px-5 py-3 rounded-lg ${
                  page == "discover" ? "bg-blue-500" : ""
                }`}
                onClick={() => setPage("discover")}
              >
                <FontAwesomeIcon icon={faSearch} className="w-6" />
                <span className="font-bold hidden md:block">Discover</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-4 hover:bg-blue-500 px-5 py-3 rounded-lg ${
                  page == "profile" ? "bg-blue-500" : ""
                }`}
                onClick={() => setPage("profile")}
              >
                <FontAwesomeIcon icon={faUser} className="w-6" />
                <span className="font-bold hidden md:block">My Profile</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="mb-10">
          <SignOutButton>
            <button
              className={`flex items-center gap-4 hover:bg-blue-500 px-5 py-3 rounded-lg`}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-6" />
              <span className="font-bold hidden md:block">Log Out</span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
