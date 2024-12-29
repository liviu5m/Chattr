"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Input from "./Input";
import UserCard from "./UserCard";

export default function Discover() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="font-bold text-4xl mb-5">Discover</h1>
      <Input
        val={search}
        setVal={setSearch}
        label="Search People"
        icon={faSearch}
      />
      <div className="grid grid-cols-2 mt-10 gap-8">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
