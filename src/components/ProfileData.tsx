import React from "react";

export default function ProfileData() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Liviu Motpan</h1>
      <p className="text-gray-400">@cm4fdlvfz001cmz30oe9dqg95</p>
      <h2 className="my-3">
        Bio: Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
        quidem asperiores quos sunt nobis culpa ipsum harum maxime illum ipsam.
      </h2>
      <div className="flex items-center gap-5">
        <h1>
          <b>0 </b>
          Followers
        </h1>
        <span className="text-3xl">·</span>
        <h1>
          <b>0 </b>
          Following
        </h1>
      </div>
    </div>
  );
}
