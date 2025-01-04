import React, { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import { User } from "@prisma/client";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  }
}

export default function ProfilePages({ user }: { user: DbUser }) {

  const [page, setPage] = useState("posts");

  return (
    <div className="mt-5">
      <ul className="w-fit flex items-center gap-5 border-b-2 border-gray-500 mb-5 font-medium">
        <li className={`py-4 border-b-2 cursor-pointer ${page == "posts" ? " border-white" : "border-gray-800"}`} onClick={() => setPage("posts")}>Posts</li>
        <li className={`py-4 border-b-2 cursor-pointer ${page == "photos" ? " border-white" : "border-gray-800"}`} onClick={() => setPage("photos")}>Photos</li>
        <li className={`py-4 border-b-2 cursor-pointer ${page == "about" ? " border-white" : "border-gray-800"}`} onClick={() => setPage("about")}>About</li>
      </ul>
      {page == "posts" && <ProfilePosts />}
      {page == "photos" && <ProfilePhotos />}
      {page == "about" && <ProfileAbout user={user} />}
    </div>
  );
}
