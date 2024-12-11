"use client";
import { HeaderData } from "@/utils/constant";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaBehance, FaChevronDown, FaChevronUp, FaDribbble, FaInstagram, FaTwitter } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

function Sidebar({ isSidebarOpen, setIsSideBarOpen, sectionRefs }: { isSidebarOpen: boolean; setIsSideBarOpen: any; sectionRefs: any }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<any>({ id: null, isOpen: false });
  const [activeTab, setActiveTab] = useState<any>();
  const pathname = usePathname();
  const router = useRouter();

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
    <div
      className={`min-w-[320px] block sm:hidden fixed h-screen bg-black top-0 z-50 transition-all duration-300 ${
        isSidebarOpen ? "left-0" : "-left-[320px]"
      } `}
    >
      <div className="flex justify-between items-center p-6">
        <Image src="/assets/png/logo.png" alt="Logo" className="cursor-pointer" width={60} height={60} />
        <IoMdClose className="text-white text-3xl" onClick={() => setIsSideBarOpen(false)} />
      </div>
      <div className="text-white text-xl mt-2 h-[65vh] overflow-y-scroll">
        {HeaderData.map((data, index) => {
          const activeSection = data.section.toLowerCase();
          return (
            <div key={data.id}>
              <div
                className={`flex justify-between items-center px-6 border-b-[1px] border-gray-500 py-3 font-poppins ${
                  index === 0 ? "border-t-[1px]" : ""
                } ${(data.id === isDropdownOpen.id && isDropdownOpen.isOpen) || activeTab === activeSection ? "bg-[#383838]" : ""}`}
                onClick={() => {
                  if (data.submenu) {
                    setIsDropdownOpen({ id: data.id, isOpen: data.id === isDropdownOpen.id ? !isDropdownOpen.isOpen : true });
                  }
                  scrollToSection(activeSection);
                  if (!data.submenu) {
                    setIsSideBarOpen(false);
                  }
                }}
              >
                {data.section}
                {data.submenu ? (
                  <FaChevronDown
                    className={`text-white text-2xl transform transition-all duration-300 ${
                      data.id === isDropdownOpen.id && isDropdownOpen.isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                ) : (
                  <></>
                )}
              </div>
              {data.submenu && data.id === isDropdownOpen.id && isDropdownOpen.isOpen && (
                <div className="pl-12 border-gray-500 border-b-[1px] bg-[#2e2e2e]">
                  {data.submenu.map((subItem) => (
                    <div key={subItem.id} className="py-3 font-poppins">
                      {subItem.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-white fixed p-6 w-[320px] space-y-6 bg-black">
        <div className="text-center text-2xl">Connect with us</div>
        <div className="flex mx-auto max-w-[250px] w-full justify-between mb-4">
          <FaInstagram className="cursor-pointer text-3xl" />
          <FaTwitter className="cursor-pointer text-3xl" />
          <FaBehance className="cursor-pointer text-3xl" />
          <FaDribbble className="cursor-pointer text-3xl" />
          <FaInstagram className="cursor-pointer text-3xl" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
