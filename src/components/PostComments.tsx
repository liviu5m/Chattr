import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { Comment as CommentType, Post as PostType } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Posts extends PostType {
  logged: boolean;
  _count: {
    Comment: number;
    Like: number;
  };
}

interface Comments extends CommentType {
  _count: {
    Like: number;
  };
}

export default function PostComments({ post }: { post: Posts }) {
  const [comments, setComments] = useState<Comments[]>();
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    axios
      .get("/api/comment", {
        params: {
          postId: post.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveComment = () => {
    axios
      .post("/api/comment", {
        content: commentInput,
        postId: post.id,
      })
      .then((res) => {
        if (comments)
          setComments([...comments, { ...res.data, _count: { Like: 0 } }]);
        else setComments([{ ...res.data, _count: { Like: 0 } }]);
        setCommentInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(comments);
  
  return (
    <div>
      <div
        className={`border-t border-gray-500/50 max-h-[80vh] scroll-remove overflow-scroll mt-3 `}
      >
        {comments?.length == 0 ? (
          <h1 className="text-gray-300 py-2 text-lg border-b border-gray-500/50 mb-4">
            Be the first to comment.
          </h1>
        ) : (
          comments?.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                comments={comments}
                setComments={setComments}
              />
            );
          })
        )}
      </div>
      <div className="flex items-center gap-5 w-full">
        <img
          className="w-10 aspect-square rounded-full"
          src="/images/noPicture.png"
          alt=""
        />
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Write your comment here..."
            className="transparent-input flex-1"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={() => saveComment()}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}
