import { UserButton } from "@clerk/nextjs";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { log } from "util";
import { serialize } from "v8";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

export default function ProfileImages({ user }: { user: DbUser }) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(user.profilePhoto);
  const [coverUrl, setCoverUrl] = useState(user.coverPhoto);
  const [loggedUser, setLoggedUser] = useState(false);
  const [following, setFollowing] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    console.log(type);

    const file = e.target.files[0];

    const previewUrl = URL.createObjectURL(file);
    if (type == "profilePhoto") setImageUrl(previewUrl);
    else setCoverUrl(previewUrl);

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
            axios
              .put("/api/user", {
                type,
                url: response.data.secure_url,
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
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

  useEffect(() => {
    axios
      .get("/api/user/" + user.id, {
        params: {
          type: "loggedUser",
        },
      })
      .then((res) => {
        if (res.data) setLoggedUser(true);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/api/follower/" + user.id)
      .then((res) => {
        if (res.data) setFollowing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const follow = () => {
    setFollowing(!following);
    axios
      .put("/api/follower", {
        followingId: user.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        className={`w-full rounded-xl h-60 relative bg-cover ${
          user.coverPhoto != "noPicture.png" ? "aaa" : "bg-gray-500"
        }`}
        style={{
          backgroundImage: `url(${coverUrl})`,
        }}
      >
        {loggedUser && (
          <label htmlFor="coverImage">
            <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <FontAwesomeIcon icon={faImage} />
            </div>
            <input
              type="file"
              id="coverImage"
              onChange={(e) => handleFileChange(e, "coverPhoto")}
              className="hidden"
              accept="image/*"
            />
          </label>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div
          className="w-48 h-48 rounded-full -translate-y-1/2 relative bg-cover z-20"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          {loggedUser && (
            <label htmlFor="profileImage">
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
                <FontAwesomeIcon icon={faCamera} />
              </div>
              <input
                type="file"
                id="profileImage"
                onChange={(e) => handleFileChange(e, "profilePhoto")}
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
        </div>
        {loggedUser ? (
          <a
            href="/edit-profile"
            className="px-7 py-4 rounded-3xl font-bold border-2 border-blue-500 text-blue-500 -mt-10 hover:bg-blue-500 hover:text-white"
          >
            Edit Profile
          </a>
        ) : (
          <h1
            onClick={() => follow()}
            className={`px-7 cursor-pointer py-4 font-bold rounded-3xl border-2 border-blue-500 text-blue-500 -mt-10 hover:text-white ${
              following ? "bg-blue-500 text-white" : "hover:bg-blue-500"
            }`}
          >
            {following ? "Following" : "Follow"}
          </h1>
        )}
      </div>
    </div>
  );
}
