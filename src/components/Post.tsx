import Loading from "@/lib/Loading";
import { faComment, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post as PostType, User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostUpdate from "./PostUpdate";
import ImageSlider from "./ImageSlider";
import PostComments from "./PostComments";
import { comment } from "postcss";
import { gsap } from "gsap";
import { timeAgo } from "@/lib/functions";
import Loader from "./Loader";
import Link from "next/link";
import SmallLoader from "./SmallLoader";

interface Posts extends PostType {
  logged: boolean;
  _count: {
    Comment: number;
    Like: number;
  };
}

export default function Post({
  posts,
  setPosts,
  post,
  setPostEditId,
}: {
  posts: Posts[];
  setPosts: (posts: Posts[]) => void;
  post: Posts;
  setPostEditId: (e: number) => void;
}) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [imageSlider, setImageSlider] = useState(false);
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (comments) {
      gsap.to(divRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        display: "block",
      });
    } else {
      gsap.to(divRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          if (divRef.current) {
            divRef.current.style.display = "none";
          }
        },
      });
    }
  }, [comments]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user/" + post.userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .put("/api/like", {
        postId: post.id,
        type: "getLike",
      })
      .then((res) => {
        if (res.data) setLike(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const deletePost = () => {
    axios
      .delete("/api/post/" + post.id)
      .then((res) => {
        console.log(res.data);
        toast("Post deleted successfully!");
        setTimeout(() => {
          setIsVisible(false);
        }, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageSlider = () => {
    if (post.url != undefined && post.url?.split("${image}").length > 4)
      setImageSlider(true);
  };

  const likePost = () => {
    setLike(!like);
    setPosts(
      posts.map((p) =>
        p.id === post.id
          ? {
              ...p,
              _count: {
                ...p._count,
                Like: like ? p._count.Like - 1 : p._count.Like + 1,
              },
            }
          : p
      )
    );
    axios
      .put("/api/like", {
        postId: post.id,
        type: "changeLike",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <SmallLoader />
  ) : (
    isVisible && post && (
      <div className="rounded-lg px-8 py-4  bg-blue-500/50 md:max-w-screen-lg">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-5">
            <div>
              <img
                src={user?.profilePhoto || "/images/noPicture.png"}
                alt=""
                width={50}
                height={50}
                className="aspect-square rounded-full"
              />
            </div>
            <div>
              <h2
                onClick={() => {
                  console.log(post.logged);

                  if (post.logged) {
                    localStorage.setItem("page", "profile");
                    window.location.href = "/home";
                  } else window.location.href = "/profile/" + user?.username;
                }}
                className="text-lg border-b cursor-pointer border-blue-500/50 hover:border-b hover:border-blue-500 font-bold duration-0"
              >
                {user?.name}
              </h2>
              <p className="text-gray-400 font-medium">
                {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          {post.logged && (
            <div className="relative">
              <div
                className="p-1"
                onClick={() => setDropdown(!dropdown)}
                onMouseLeave={() => setDropdown(false)}
              >
                <div className="text-xl cursor-pointer">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                {dropdown && (
                  <div className="absolute ">
                    <div className="bottom-0 flex flex-col rounded-2xl bg-slate-800 w-max right-full">
                      <h3
                        className="cursor-pointer py-3 px-5 rounded-t-2xl hover:bg-blue-500"
                        onClick={() => {
                          setDropdown(false);
                          setPostEditId(post.id);
                        }}
                      >
                        Edit Post
                      </h3>
                      <h3
                        className="cursor-pointer py-3 px-5 rounded-b-2xl hover:bg-blue-500"
                        onClick={() => deletePost()}
                      >
                        Delete Post
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="mb-5">{post.content}</p>
          {post.url && (
            <div className="relative" onClick={() => handleImageSlider()}>
              <div
                className={`${
                  post.url.split("${image}").length == 1
                    ? ""
                    : "grid grid-cols-2"
                }`}
              >
                {post.url
                  ?.split("${image}")
                  .slice(0, 4)
                  .map((el, i) => {
                    return (
                      <img
                        className="aspect-square"
                        key={i}
                        src={el}
                        alt=""
                        width={500}
                        height={300}
                      />
                    );
                  })}
              </div>
              {post.url?.split("${image}").length > 4 && (
                <h1 className="font-bold absolute top-1/2 cursor-pointer rounded-full w-32 h-32 hover:bg-blue-500/75 flex items-center justify-center left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
                  +{post.url?.split("${image}").length - 4}
                </h1>
              )}
            </div>
          )}
        </div>
        <div className="border-t border-gray-500/50 mt-5 pt-6 py-3 flex gap-3">
          <div
            onClick={() => likePost()}
            className={`text-white flex items-center gap-3 text-xl font-bold px-4 py-3 rounded-lg ${
              like ? "bg-red-500/50" : "hover:bg-red-500/50"
            } w-fit cursor-pointer`}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>{post._count.Like}</span>
          </div>
          <div
            onClick={() => setComments(!comments)}
            className={`text-white flex items-center gap-3 text-xl font-bold px-4 py-3 rounded-lg ${
              comments ? "bg-sky-400/50 " : "hover:bg-sky-400/50 "
            } w-fit cursor-pointer`}
          >
            <FontAwesomeIcon icon={faComment} />
            <span>{post._count.Comment}</span>
          </div>
        </div>
        {imageSlider && post.url != undefined && (
          <ImageSlider
            slides={post.url.split("${image}")}
            setIsOpenModal={setImageSlider}
          />
        )}
        {comments && (
          <div
            ref={divRef}
            style={{
              opacity: 0,
              transform: "translateY(-20px)",
              visibility: comments ? "visible" : "hidden",
            }}
          >
            <PostComments post={post} />
          </div>
        )}
        <ToastContainer />
      </div>
    )
  );
}
