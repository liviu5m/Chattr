"use client";

import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

export default function ProfilePhotos() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="grid grid-cols-3 w-full gap-5">
      <img
        src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        className="w-full h-full object-cover aspect-square"
        onClick={() => setIsOpenModal(true)}
      />
      <img
        src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        className="w-full h-full object-cover aspect-square"
      />
      <img
        src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        className="w-full h-full object-cover aspect-square"
      />
      <img
        src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        className="w-full h-full object-cover aspect-square"
      />
      <img
        src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        className="w-full h-full object-cover aspect-square"
      />
      {isOpenModal && <ImageSlider setIsOpenModal={setIsOpenModal} />}
    </div>
  );
}
