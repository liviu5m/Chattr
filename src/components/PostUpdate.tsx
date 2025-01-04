import { faImage, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Post as PostType } from "@prisma/client";
import Loading from "@/lib/Loading";
import Loader from "./Loader";

interface Posts extends PostType {
  logged: boolean;
  _count: {
    Comment: number;
    Like: number;
  };
}

export default function PostUpdate({
  setPostEditId,
  posts,
  setPosts,
  postId,
}: {
  setPostEditId: (e: number) => void;
  postId: number;
  posts: Posts[];
  setPosts: (posts: Posts[]) => void;
}) {
  const [data, setData] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/post/" + postId)
      .then((res) => {
        console.log(res.data);
        setContent(res.data.content);
        if (res.data.url != "") setData(res.data.url.split("${image}"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];

          try {
            const response = await axios.post("/api/cloudinary", {
              file: `data:image/jpeg;base64,${base64String}`,
            });
            setData([...data, response.data.secure_url]);
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
          }
        }
      };

      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
      };
    } catch (error) {
      console.error("Error preparing file for upload:", error);
    }
  };

  const savePost = () => {
    if (content.trim() == "" && data.length == 0) {
      alert("Content cannot be empty");
      return;
    }
    axios
      .put("/api/post/" + postId, {
        content,
        url: data.join("${image}"),
      })
      .then((res) => {
        console.log(res.data);

        setPosts(
          posts
            ? [
                {
                  ...res.data,
                  _count: {
                    Comment: 0,
                    Like: 0,
                  },
                  logged: true,
                },
                ...posts,
              ]
            : [
                {
                  ...res.data,
                  _count: {
                    Comment: 0,
                    Like: 0,
                  },
                  logged: true,
                },
              ]
        );
        console.log(posts, res.data);
        setPostEditId(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data, data.length);

  return loading ? (
    <Loader />
  ) : (
    <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-full h-full">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="flex items-center justify-center h-full">
        <div className="w-[600px] relative z-40">
          <div className="relative bg-blue-500 rounded-t-2xl py-4 font-bold">
            <h1 className="text-center">Update Post</h1>
            <div
              className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer"
              onClick={() => setPostEditId(-1)}
            >
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
          <div
            className={`w-full rounded-lg bg-slate-800 ${
              data.length == 0 && "rounded-b-2xl"
            } px-8 py-4`}
          >
            <div className="flex items-center justify-between gap-2">
              <Image
                width={50}
                height={50}
                src={"/images/noPicture.png"}
                alt=""
              />
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full border-none bg-transparent transparent-input outline-none px-5 py-3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                className="px-5 rounded-lg bg-blue-500 text-white py-3"
                onClick={() => savePost()}
              >
                Save
              </button>
            </div>
            <label
              htmlFor="data"
              className="cursor-pointer flex items-center gap-5 mt-4 text-lg font-bold"
            >
              <FontAwesomeIcon icon={faImage} />
              <h2>Image / Video</h2>
              <input
                type="file"
                className="hidden"
                id="data"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
              />
            </label>
          </div>
          {data.length > 0 && (
            <div className="border-t-2 border-blue-500 bg-slate-800 rounded-b-2xl">
              <div className="p-2 grid grid-cols-2 gap-5 max-h-[60vh] overflow-scroll scroll-remove">
                {data.map((item, i) => {
                  return (
                    <div key={i} className="relative gap-2 aspect-square ">
                      <img src={item} className="object-cover" alt="" />
                      <div className="absolute top-2 right-2">
                        <div
                          className="bg-[#f6649d] w-8 cursor-pointer h-8 flex items-center justify-center rounded-lg"
                          onClick={() => {
                            setData(data.filter((_, index) => index !== i));
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
