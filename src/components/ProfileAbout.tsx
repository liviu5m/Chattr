import {
  faAt,
  faBuilding,
  faCalendar,
  faEnvelope,
  faGlobe,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import React from "react";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

export default function ProfileAbout({ user }: { user: DbUser }) {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faAt} />
          <span>Username</span>
        </div>
        <div>{user.username}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email</span>
        </div>
        <div>{user.email}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faUser} />
          <span>Name</span>
        </div>
        <div>{user.name}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faCalendar} />
          <span>Birth Date</span>
        </div>
        <div>{user.birthDate ? user.birthDate : "Not Set"}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faUser} />
          <span>Gender</span>
        </div>
        <div>{user.gender ? user.gender : "Not Set"}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faUser} />
          <span>Bio</span>
        </div>
        <div>{user.bio ? user.bio : "Not Set"}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faPhone} />
          <span>Phone Number</span>
        </div>
        <div>{user.phone ? user.phone : "Not Set"}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faGlobe} />
          <span>Website</span>
        </div>
        <div>{user.website ? user.website : "Not Set"}</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faBuilding} />
          <span>Address</span>
        </div>
        <div>{user.address ? user.address : "Not Set"}</div>
      </div>
    </div>
  );
}
