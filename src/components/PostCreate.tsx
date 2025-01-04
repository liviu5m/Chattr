import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import CreateModel from "./CreateModel";
import { Post as PostType } from "@prisma/client";

interface Posts extends PostType {
  logged: boolean;
  _count: {
    Comment: number;
    Like: number;
  };
}

export default function PostCreate({
  posts,
  setPosts,
}: {
  posts: Posts[];
  setPosts: (posts: Posts[]) => void;
}) {
  const [createModel, setCreateModel] = useState(false);
  return (
    <>
      <div
        className="w-full rounded-lg bg-blue-500/50 px-8 py-4 cursor-pointer"
        onClick={() => setCreateModel(true)}
      >
        <div className="flex items-center justify-between gap-2">
          <Image width={50} height={50} src={"/images/noPicture.png"} alt="" />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full border-none bg-transparent outline-none px-5 py-3"
            disabled={createModel ? true : false}
          />
        </div>
        <div className="flex items-center gap-5 mt-4 text-lg font-bold">
          <FontAwesomeIcon icon={faImage} />
          <h2>Image / Video</h2>
        </div>
      </div>
      {createModel && (
        <CreateModel
          posts={posts}
          setPosts={setPosts}
          setCreateModel={setCreateModel}
        />
      )}
    </>
  );
}
