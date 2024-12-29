import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function PostCreate() {
  return (
    <div className="w-full rounded-lg bg-blue-500/50 px-8 py-4">
      <div className="flex items-center justify-between gap-2">
        <Image width={50} height={50} src={"/images/noPicture.png"} alt="" />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full border-none bg-transparent outline-none px-5 py-3"
        />
      </div>
      <div className="flex items-center gap-5 mt-4 text-lg font-bold">
        <FontAwesomeIcon icon={faImage} />
        <h2>Image / Video</h2>
      </div>
    </div>
  );
}
