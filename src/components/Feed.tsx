import React from "react";
import PostCreate from "./PostCreate";
import Post from "./Post";

export default function Feed() {
  return (
    <div>
      <h1 className="font-bold text-4xl mb-5">Discover</h1>
      <div className="flex flex-col gap-5">
        <PostCreate />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
