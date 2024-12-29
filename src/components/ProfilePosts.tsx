import React from "react";
import PostCreate from "./PostCreate";
import Post from "./Post";

export default function ProfilePosts() {
  return (
    <div className="flex flex-col gap-5">
      <PostCreate />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
