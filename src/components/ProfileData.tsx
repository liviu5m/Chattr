import { User } from "@prisma/client";
import React from "react";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  }
}

export default function ProfileData({ user }: { user: DbUser }) {
  
  return (
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-400">@{user.username}</p>
      <h2 className="my-3">
        {user.bio}
      </h2>
      <div className="flex items-center gap-5">
        <h1>
          <b>{user._count.following} </b>
          Followers
        </h1>
        <span className="text-3xl">·</span>
        <h1>
          <b>{user._count.follower} </b>
          Following
        </h1>
      </div>
    </div>
  );
}
