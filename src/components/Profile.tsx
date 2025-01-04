import React, { useEffect, useState } from "react";
import ProfileImages from "./ProfileImages";
import ProfileData from "./ProfileData";
import ProfilePages from "./ProfilePages";
import { User } from "@prisma/client";
import axios from "axios";
import Loading from "@/lib/Loading";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  }
}

export default function Profile() {
  const [user, setUser] = useState<DbUser>();
  const [loading, setLoading] = useState(false);
  console.log("fdsfads");
  
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user", {
        params: {
          type: "registeredUser",
        },
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
  
  return loading? (
    <Loading />
  ) : (
    user != undefined && (
      <div className="px-5 md:px-0">
        <ProfileImages user={user} />
        <ProfileData user={user} />
        <ProfilePages user={user} />
      </div>
    )
  );
}
