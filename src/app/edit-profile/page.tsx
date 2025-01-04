"use client";

import Input from "@/components/Input";
import Loading from "@/lib/Loading";
import {
  faBuilding,
  faBullhorn,
  faCalendar,
  faEnvelope,
  faGlobe,
  faPhone,
  faSignature,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user", {
        params: {
          type: "registeredUser",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsername(res.data.username || "");
        setName(res.data.name || "");
        setBirthDate(res.data.birthdate || "");
        setGender(res.data.gender || "");
        setBio(res.data.bio || "");
        setAddress(res.data.address || "");
        setWebsite(res.data.website || "");
        setPhone(res.data.phone || "");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put("/api/user", {
        username,
        name,
        birthDate,
        gender,
        bio,
        phone,
        website,
        address,
        type: "userData",
      })
      .then((res) => {
        localStorage.setItem("page", "profile");
        router.push("/home");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? <Loading /> : (
    <div className="w-[600px] mx-auto py-10">
      <h1 className="font-bold text-3xl mb-5">Edit Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
        <Input
          icon={faUser}
          label="Username"
          setVal={setUsername}
          val={username}
          id="username"
        />
        <Input
          icon={faSignature}
          label="Name"
          setVal={setName}
          val={name}
          id="name"
        />
        <Input
          icon={faVenusMars}
          label="Gender"
          setVal={setGender}
          val={gender}
          id="gender"
        />
        <Input
          icon={faBullhorn}
          label="Bio"
          setVal={setBio}
          val={bio}
          id="bio"
        />
        <Input
          icon={faPhone}
          label="Phone"
          setVal={setPhone}
          val={phone}
          id="phone"
        />
        <Input
          icon={faGlobe}
          label="Website"
          setVal={setWebsite}
          val={website}
          id="website"
        />
        <Input
          icon={faBuilding}
          label="Address"
          setVal={setAddress}
          val={address}
          id="address"
        />
        <Input
          icon={faCalendar}
          label="Birth Date"
          setVal={setBirthDate}
          val={birthDate}
          id="birthDate"
        />
        <div>
          <button className="px-5 py-5 rounded-2xl font-bold text-lg bg-sky-500 w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
