import { User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

export default function UserCard({
  user,
  users,
  setUsers,
}: {
  user: DbUser;
  users: DbUser[];
  setUsers: (e: DbUser[]) => void;
}) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/follower/" + user.id)
      .then((res) => {
        if (res.data) setFollowing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const follow = () => {
    setFollowing(!following);
    setUsers(
      users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              _count: {
                ...u._count,
                following: !following
                  ? u._count.follower + 1
                  : u._count.follower,
              },
            }
          : u
      )
    );
    axios
      .put("/api/follower", {
        followingId: user.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-center gap-5 flex-col bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 py-10">
        <img
          src={user.profilePhoto ? user.profilePhoto : "/images/noPicture.png"}
          className="w-20 h-20 rounded-full"
          alt=""
        />
        <button
          className={`${
            following ? "bg-transparent bg-white text-black" : "bg-blue-600"
          } rounded-2xl font-bold text-lg px-7 py-4`}
          onClick={() => follow()}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
      <div className="bg-slate-700/50 py-10 px-5 flex items-center flex-col gap-5 h-52">
        <Link href={"/profile/"+user.username} className="text-2xl hover:border-b hover:border-blue-500 border-b border-slate-700/50 text-center font-bold">{user.name}</Link>
        <p>{user.bio}</p>
        <div className="flex items-center justify-between gap-5">
          <h2>
            <b>{user._count.following} </b>
            <span>Followers</span>
          </h2>
          <h2>
            <b>{user._count.follower} </b>
            <span>Following</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
