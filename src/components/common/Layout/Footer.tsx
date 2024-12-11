import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { HeaderData } from "@/utils/constant";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function Footer({ sectionRefs, setActiveTab }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      setActiveTab(id);
      const element = sectionRefs.current[id];
      if (element) {
        const offset = 170;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="bg-[#000000DB] py-12 px-4">
        <Image src={"/assets/png/logo.png"} width={100} height={100} className="mx-auto" alt="Logo" />
        <div className="flex flex-wrap gap-6 sm:gap-10 justify-center mt-8">
          <FaInstagram className="text-white text-3xl cursor-pointer" />
          <FaTwitter className="text-white text-3xl cursor-pointer" />
          <FaBehance className="text-white text-3xl cursor-pointer" />
          <FaDribbble className="text-white text-3xl cursor-pointer" />
          <FaInstagram className="text-white text-3xl cursor-pointer" />
          <FaTwitter className="text-white text-3xl cursor-pointer" />
          <FaBehance className="text-white text-3xl cursor-pointer" />
          <FaDribbble className="text-white text-3xl cursor-pointer" />
        </div>
        <div className="flex flex-wrap mt-6 justify-center">
          {HeaderData.map((data) => {
            const activeSection = data.section.toLowerCase();
            return (
              <div
                key={data.id}
                className="px-4 py-2 font-semibold cursor-pointer text-white text-center"
                onClick={() => {
                  if (data.href) {
                    router.push(data.href);
                  } else {
                    scrollToSection(activeSection);
                  }
                }}
              >
                {t(data.title)}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Image src={"/assets/png/play-store.png"} width={200} height={200} alt="visa" />
          <Image src={"/assets/png/ios.png"} width={200} height={200} alt="mastercard" />
        </div>
      </div>
      <div className="bg-black text-white py-6 text-center text-xs sm:text-base">
        Copyright 2024,All Rights Reserved. <span className="text-[#19B99A]">Next Mind Studio</span>{" "}
      </div>
    </div>
  );
}

export default Footer;
