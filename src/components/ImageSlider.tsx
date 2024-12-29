import {
  faArrowLeft,
  faArrowRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function ImageSlider({
  setIsOpenModal,
}: {
  setIsOpenModal: (isOpen: boolean) => void;
}) {
  const [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  let slides = [
    "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
    "https://wallpapercave.com/wp/wp3386769.jpg",
    "https://wallpaperaccess.com/full/809523.jpg",
    "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  ];

  return (
    <div className="absolute z-10 w-screen h-screen top-0 left-0 backdrop-blur-sm">
      <div className="flex items-center justify-center h-full">
        <div
          className="absolute top-3 right-3 rounded-full w-10 h-10 cursor-pointer bg-gray-500 opacity-50 text-lg flex items-center justify-center z-20"
          onClick={() => setIsOpenModal(false)}
        >
          <FontAwesomeIcon icon={faX} />
        </div>

        <div className="overflow-hidden w-1/2 h-1/2">
          <div
            className={`flex transition ease-out duration-40`}
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((s,i) => {
              return <img src={s} key={i} />;
            })}
          </div>

          <div className="absolute top-0 left-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
            <button onClick={previousSlide}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button onClick={nextSlide}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
