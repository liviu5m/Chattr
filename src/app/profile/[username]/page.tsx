"use client";

import React, { use, useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import Loading from "@/lib/Loading";
import ProfileImages from "@/components/ProfileImages";
import ProfileData from "@/components/ProfileData";
import ProfilePages from "@/components/ProfilePages";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

export default function Profile({ params }: { params: Promise<{ username: string }> }) {
  const [user, setUser] = useState<DbUser>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("");
  const unwrappedParams = use(params);

  useEffect(() => {
    localStorage.setItem("page", page);
    if (page != "") window.location.pathname = "/home";
  }, [page]);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user/" + unwrappedParams.username, {
        params: {
          type: "username"
        }
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    user != undefined && (
      <div className="h-screen overflow-scroll scroll-remove">
        <Sidebar page={page} setPage={setPage} />
        <div className="justify-center w-[900px] mx-auto flex h-screen max-w-screen-sm md:max-w-screen-lg">
          <div className="w-full md:w-[65%] my-10 mx-auto">
            <div className="px-5 md:px-0">
              <ProfileImages user={user} />
              <ProfileData user={user} />
              <ProfilePages user={user} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
