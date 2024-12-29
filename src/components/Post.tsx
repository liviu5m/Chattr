import { faComment, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

export default function Post() {
  return (
    <div className="rounded-lg px-8 py-4  bg-blue-500/50 md:max-w-screen-lg">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-5">
          <div>
            <Image
              src={"/images/noPicture.png"}
              alt=""
              width={50}
              height={50}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">Liviu</h2>
            <p className="text-gray-400 font-medium">7 minutes ago</p>
          </div>
        </div>
        <div className="text-xl cursor-pointer">
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <div>
        <p className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto quod
          non ab assumenda temporibus cumque, omnis voluptatem magnam eos
          perspiciatis, quis mollitia similique sapiente expedita odio aperiam
          veritatis deleniti.
        </p>
        <Image src={"/images/noPicture.png"} alt="" width={600} height={300}/>
      </div>
      <div className="border-t border-gray-400 mt-5 py-3 flex gap-3">
        <div className="text-white flex items-center gap-3 text-xl font-bold px-4 py-3 rounded-lg hover:bg-red-500/50 w-fit cursor-pointer">
          <FontAwesomeIcon icon={faHeart} />
          <span>1</span>
        </div>
        <div className="text-white flex items-center gap-3 text-xl font-bold px-4 py-3 rounded-lg hover:bg-sky-400/50 w-fit cursor-pointer">
          <FontAwesomeIcon icon={faComment} />
          <span>1</span>
        </div>
      </div>
    </div>
  );
}
