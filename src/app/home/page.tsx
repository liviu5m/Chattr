"use client";

import Discover from "@/components/Discover";
import Feed from "@/components/Feed";
import Profile from "@/components/Profile";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState("feed");

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage) {
      setPage(savedPage);
      localStorage.removeItem("page");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);
  console.log(page);

  return (
    <div className="h-screen overflow-scroll scroll-remove">
      <div className="justify-center w-[900px] mx-auto flex h-screen max-w-screen-sm md:max-w-screen-lg">
        <Sidebar page={page} setPage={setPage} />
        <div className="w-full md:w-[65%] my-10 mx-auto">
          {page == "feed" && <Feed />}
          {page == "discover" && <Discover />}
          {page == "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}
