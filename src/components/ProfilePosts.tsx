import React, { useEffect, useState } from "react";
import PostCreate from "./PostCreate";
import Post from "./Post";
import axios from "axios";
import { Post as PostType } from "@prisma/client";
import Loader from "./Loader";
import PostUpdate from "./PostUpdate";
import { User } from "@prisma/client";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

interface Posts extends PostType {
  logged: boolean;
  _count: {
    Comment: number;
    Like: number;
  };
}

export default function ProfilePosts({
  user,
  loggedUser,
}: {
  user: DbUser;
  loggedUser?: boolean;
}) {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(false);
  const [postEditId, setPostEditId] = useState(-1);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/post", {
        params: {
          type: "userId",
          userId: loggedUser ? -1 : user.id,
        },
      })
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
    <Loader />
  ) : (
    <div className="flex flex-col gap-5">
      {loggedUser && <PostCreate posts={posts} setPosts={setPosts} />}
      {posts?.map((post, i) => {
        return (
          <Post
            key={i}
            post={post}
            setPosts={setPosts}
            posts={posts}
            setPostEditId={setPostEditId}
          />
        );
      })}
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
