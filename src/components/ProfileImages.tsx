import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProfileImages() {
  return (
    <div>
      <div className="w-full rounded-xl bg-gray-500 h-60 relative">
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <FontAwesomeIcon icon={faImage} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-48 h-48 rounded-full bg-blue-700 -translate-y-1/2 relative">
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </div>
        <button className="px-7 py-4 rounded-3xl border-2 border-blue-500 text-blue-500 -mt-10 hover:bg-blue-500 hover:text-white">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
