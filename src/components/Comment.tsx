import { faEdit, faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Comment as CommentType, User } from "@prisma/client";
import axios from "axios";
import { timeAgo } from "@/lib/functions";
import Loader from "./Loader";
import SmallLoader from "./SmallLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Comments extends CommentType {
  _count: {
    Like: number;
  };
}

export default function Comment({
  comment,
  comments,
  setComments,
}: {
  comment: Comments;
  comments: Comments[];
  setComments: (e: Comments[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [like, setLike] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user/" + comment.userId)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    setLoading(true);
    axios
      .put("/api/like", {
        commentId: comment.id,
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

  const likeComment = () => {
    setLike(!like);
    setComments(
      comments.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              _count: {
                Like: like ? c._count.Like - 1 : c._count.Like + 1,
              },
            }
          : c
      )
    );

    axios
      .put("/api/like", {
        commentId: comment.id,
        type: "changeLike",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = () => {
    setComments(comments.filter((c) => c.id != comment.id));
    axios
      .delete("/api/comment/" + comment.id)
      .then((res) => {
        console.log(res.data);
        toast("Comment deleted successfully!");
        setTimeout(() => {
          setIsVisible(false);
        }, 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateComment = (e: any) => {
    e.preventDefault();
    setEdit(false);
    setComments(
      comments.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              content: e.target.content.value,
            }
          : c
      )
    );
    axios
      .put("/api/comment/" + comment.id, {
        content: e.target.content.value,
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
    isVisible && (
      <div>
        <div className="flex gap-3 py-5">
          <div>
            <img
              className="w-10 aspect-square rounded-full"
              src={
                user?.profilePhoto ? user.profilePhoto : "/images/noPicture.png"
              }
              alt=""
            />
          </div>
          <div>
            <div>
              <h1 className=" font-bold text-white">{user?.name}</h1>
              <h3 className="text-gray-400 text-sm">@{user?.username}</h3>
            </div>
            <div className="border border-gray-400/50 rounded-3xl my-3 px-5 py-3">
              {!edit ? (
                <h2>{comment.content}</h2>
              ) : (
                <form
                  className="rounded-2xl flex items-center overflow-hidden border mb-2 border-gray-400/50"
                  onSubmit={(e) => updateComment(e)}
                >
                  <input
                    type="text"
                    name="content"
                    className="transparent-input px-4 py-3"
                    defaultValue={comment.content}
                  />
                  <button className="bg-sky-500/50 p-3 ">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </form>
              )}
              <h5 className="text-gray-400 text-sm">
                {timeAgo(comment.createdAt)}
              </h5>
            </div>
            <div className="flex gap-3">
              <div
                onClick={() => likeComment()}
                className={`text-white flex items-center gap-3 text font-bold px-3 py-1 rounded-lg ${
                  like ? "bg-red-500/50" : "hover:bg-red-500/50"
                } w-fit cursor-pointer`}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>{comment._count.Like}</span>
              </div>
              <div
                className="pt-2 px-2"
                onClick={() => {
                  setDropdown(!dropdown);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
              >
                <div className="text-xl cursor-pointer flex items-center justify-center z-30">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                {dropdown && (
                  <div className="absolute">
                    <div className="flex flex-col rounded-2xl bg-slate-800 w-max">
                      <h3
                        className="cursor-pointer py-3 px-5 rounded-t-2xl hover:bg-blue-500"
                        onClick={() => {
                          setEdit(true);
                          setDropdown(false);
                        }}
                      >
                        Edit Comment
                      </h3>
                      <h3
                        className="cursor-pointer py-3 px-5 rounded-b-2xl hover:bg-blue-500"
                        onClick={() => deleteComment()}
                      >
                        Delete Comment
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
}
