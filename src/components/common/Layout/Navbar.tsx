"use client";
import React, { useState, useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { GrAndroid } from "react-icons/gr";
import { AiOutlineYoutube } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa";
import LanguageSelection from "../LanguageSelection";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Navbar({ setIsSideBarOpen }: { setIsSideBarOpen: (value: boolean) => void }) {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full h-24 bg-black flex items-center z-50 shadow-lg transition-all duration-700 ${isSticky ? "sticky top-0" : ""}`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
        <div className="sm:flex hidden gap-6">
          <FaFacebookF className="text-white text-3xl cursor-pointer" />
          <FaXTwitter className="text-white text-3xl cursor-pointer" />
          <AiOutlineYoutube className="text-white text-3xl cursor-pointer" />
        </div>
        <div className="sm:hidden">
          <BiMenuAltLeft className="text-white text-3xl cursor-pointer" onClick={() => setIsSideBarOpen(true)} />
        </div>
        <h1 className="hidden md:block text-4xl text-[#19b99a] font-semibold cursor-pointer" onClick={() => router.push("/")}>
          Public Next
        </h1>
        <div className="block md:hidden">
          <Image src="/assets/png/logo.png" alt="Public Next" width={60} height={100} onClick={() => router.push("/")} />
        </div>
        <div className="sm:flex hidden gap-6">
          <GrAndroid className="text-white text-3xl cursor-pointer" />
          <FaApple className="text-white text-3xl cursor-pointer" />
          <LanguageSelection />
        </div>
        <div className="sm:hidden flex items-center gap-2">
          <GrAndroid className="text-white text-xl sm:text-3xl cursor-pointer" />
          <FaApple className="text-white text-xl sm:text-3xl cursor-pointer" />
          <LanguageSelection isSmall={true} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
