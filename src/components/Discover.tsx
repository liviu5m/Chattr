"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Input from "./Input";
import UserCard from "./UserCard";
import { User } from "@prisma/client";
import axios from "axios";

interface DbUser extends User {
  _count: {
    follower: number;
    following: number;
  };
}

export default function Discover() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<DbUser[]>();
  
  useEffect(() => {
    axios.get("/api/user", {
      params: {
        type: "allUser",
        search
      },
    })
    .then(res => {
      setUsers(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [search]);

  return (
    <div>
      <h1 className="font-bold text-4xl mb-5">Discover</h1>
      <Input
        val={search}
        setVal={setSearch}
        label="Search People"
        icon={faSearch}
        id="search"
      />
      <div className="grid grid-cols-2 mt-10 gap-8">
        {users?.length == 0 && <h1 className="text-center mt-20 text-2xl font-bold">No Users</h1>}
        {users?.map((user, i) => {
          return (
            <UserCard key={i} user={user} users={users} setUsers={setUsers} />
          );
        })}
      </div>
    </div>
  );
}
