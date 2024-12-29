import { SignUp } from "@clerk/nextjs";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <SignUp />
      <div className="absolute top-5 left-5">
        <Link href={"/"} className="text-sm flex gap-3 items-center w-fit">
          <FontAwesomeIcon icon={faArrowLeft} className="w-5" />
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
}
