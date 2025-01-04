import React, { useEffect, useState } from "react";
import PostCreate from "./PostCreate";
import Post from "./Post";
import { Post as PostType } from "@prisma/client";
import axios from "axios";
import Loading from "@/lib/Loading";
import PostUpdate from "./PostUpdate";

interface Posts extends PostType {
  logged: boolean;
  _count: {
    Comment: number;
    Like: number;
  };
}

export default function Feed() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(false);
  const [postEditId, setPostEditId] = useState(-1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/post")
      .then((res) => {
        setPosts(res.data);
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
    <div>
      <h1 className="font-bold text-4xl mb-5">Feed</h1>
      <div className="flex flex-col gap-5">
        <PostCreate posts={posts} setPosts={setPosts} />
        {posts?.map((post, i) => {
          return <Post key={i} post={post} setPosts={setPosts} posts={posts} setPostEditId={setPostEditId} />;
        })}
      </div>
      {postEditId != -1 && (
        <PostUpdate
          setPostEditId={setPostEditId}
          postId={postEditId}
          posts={posts}
          setPosts={setPosts}
        />
      )}
    </div>
  );
}
