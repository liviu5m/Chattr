"use client";

import React, { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import axios from "axios";
import Loader from "./Loader";
import { User } from "@prisma/client";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

export default function ProfilePhotos({
  user,
}: {
  user?: DbUser
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/post", {
        params: {
          type: "userId",
          userId: user?.id
        },
      })
      .then((res) => {
        setImages(
          res.data
            .flatMap((el: { url: string }) => el.url.split("${image}"))
            .filter((el: string) => el != "")
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loader />
  ) : images?.length == 0 || images == undefined ? (
    <h1>No Images</h1>
  ) : (
    <div className="grid grid-cols-3 w-full gap-5">
      {images?.map((image, i) => {
        return (
          <img
            src={image}
            alt=""
            key={i}
            className="w-full h-full object-cover aspect-square cursor-pointer"
            onClick={() => setIsOpenModal(true)}
          />
        );
      })}
      {isOpenModal && (
        <ImageSlider slides={images} setIsOpenModal={setIsOpenModal} />
      )}
    </div>
  );
}
