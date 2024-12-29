import React from "react";
import ProfileImages from "./ProfileImages";
import ProfileData from "./ProfileData";
import ProfilePages from "./ProfilePages";

export default function Profile() {
  return (
    <div className="px-5 md:px-0">
      <ProfileImages />
      <ProfileData />
      <ProfilePages />
    </div>
  );
}
