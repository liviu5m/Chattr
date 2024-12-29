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
import React from "react";

export default function ProfileAbout() {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faAt} />
          <span>Username</span>
        </div>
        <div>cm4fdlvfz001cmz30oe9dqg95</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email</span>
        </div>
        <div>motpanliviuwork@gmail.com</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faUser} />
          <span>Name</span>
        </div>
        <div>cm4fdlvfz001cmz30oe9dqg95</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faCalendar} />
          <span>Birth Date</span>
        </div>
        <div>February 6, 1999</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faUser} />
          <span>Gender</span>
        </div>
        <div>Not set</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faUser} />
          <span>Bio</span>
        </div>
        <div>Not set</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faPhone} />
          <span>Phone Number</span>
        </div>
        <div>Not Set</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faGlobe} />
          <span>Website</span>
        </div>
        <div>Not Set</div>
      </div>
      <div className="w-full rounded-2xl border border-cyan-600 flex items-center gap-3 overflow-hidden font-medium">
        <div className="bg-cyan-600 px-5 py-3 flex items-center gap-3 text-lg">
          <FontAwesomeIcon icon={faBuilding} />
          <span>Address</span>
        </div>
        <div>Not Set</div>
      </div>
    </div>
  );
}
