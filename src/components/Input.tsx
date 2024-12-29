import {
  faSearch,
  faX,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Input({
  val,
  label,
  setVal,
  icon,
}: {
  val: string;
  label: string;
  setVal: (val: string) => void;
  icon: IconDefinition;
}) {
  const [focus, setFocus] = useState(false);
  
  return (
    <div className={`px-5 py-3 rounded-2xl bg-blue-500 shadow-none flex items-center gap-5 text-lg h-16 relative`}>
      <div className="text-gray-200">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="flex flex-col w-full">
        <label
          htmlFor="input"
          className={`${!focus ? "translate-y-3 text-lg" : "text-sm translate-y-1"} cursor-text text-gray-200 h-6`}
        >
          {label}
        </label>
        <input
          type="text"
          className={`${!focus && ""} h-8 transparent-input w-full text-white px-0`}
          id="input"
          onFocus={() => setFocus(true)}
          onBlur={() => {
            if(val == "") setFocus(false)
          }}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      {focus && (
        <div className="absolute right-5">
          <div
            className="flex items-center justify-center rounded-full w-8 h-8 bg-blue-400 cursor-pointer opacity-75"
            onClick={() => {
              setFocus(false);
              setVal("");
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
      )}
    </div>
  );
}
