import Welcome from "@/components/Welcome";
import WelcomeNavbar from "@/components/WelcomeNavbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="w-[700px] mx-auto">
        <WelcomeNavbar />
        <Welcome />
      </div>
    </div>
  );
}
