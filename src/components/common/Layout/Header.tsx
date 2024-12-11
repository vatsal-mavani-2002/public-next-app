"use client";
import { HeaderData } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useStateProvider } from "@/context/StateProvicer";

function Header({ sectionRefs, activeTab, setActiveTab }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  // const { changeLanguage } = useStateProvider();
  // const [clientDetails, setClientDetails] = useState<any>(null);
  // const [categories, setCategories] = useState<any[]>([]);
  // console.log("categories::: ", categories);

  const fetchUserIp = async () => {
    try {
      const response = await fetch(`https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IP_TOKEN}`);
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP info:", error);
    }
  };

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      setActiveTab(id);
      const element = sectionRefs.current[id];
      if (element) {
        const offset = 200;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }
  };

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch(`http://dgo.electreps.com:8080/web/fetch/categories.json`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         client_details: clientDetails
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  //         "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  //         "Access-Control-Allow-Credentials": "true"
  //       }
  //     });
  //     const data = await response.json();
  //     console.log("data::: ", data);

  //     setCategories(data);
  //   } catch (error) {
  //     console.log("error::: ", error);
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, [clientDetails]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      if (pathname === "/") {
        setLastScrollY(currentScrollY);
        const sectionOffsets: any =
          Object.keys(sectionRefs?.current).map((key) => {
            const section = sectionRefs.current[key];
            if (!section) return null;
            return {
              id: key,
              offsetTop: section.offsetTop,
              offsetHeight: section.offsetHeight
            };
          }) || [];
        for (let i = 0; i < sectionOffsets.length; i++) {
          const section = sectionOffsets[i] || [];
          if (currentScrollY >= section.offsetTop - 100 && currentScrollY < section.offsetTop + section.offsetHeight) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, sectionRefs]);

  // useEffect(() => {
  //   const fetchClientDetails = async () => {
  //     const langCode = localStorage.getItem("i18nextLng") || "en";
  //     const platform = window.navigator.platform;
  //     const userAgent = window.navigator.userAgent;
  //     const browser = userAgent.includes("Chrome") ? "Chrome" : userAgent.includes("Firefox") ? "Firefox" : "Other";
  //     const os = window.navigator.userAgent.includes("Win")
  //       ? "Windows"
  //       : window.navigator.userAgent.includes("Mac")
  //       ? "MacOS"
  //       : window.navigator.userAgent.includes("Linux")
  //       ? "Linux"
  //       : "Unknown";
  //     const res = `${window.innerWidth}x${window.innerHeight}`;

  //     setClientDetails({
  //       platform,
  //       device_type: window.innerWidth > 768 ? "desktop" : "mobile",
  //       uid: Date.now(),
  //       ip: await fetchUserIp(),
  //       lang_code: langCode,
  //       user_agent: userAgent,
  //       res,
  //       os,
  //       browser
  //     });
  //   };

  //   fetchClientDetails();
  // }, [changeLanguage]);

  return (
    <div
      className={`hidden md:flex justify-center items-center gap-2 w-full transition-all duration-500 z-40 ${
        isSticky ? "sticky top-0 bg-white" : `fixed  ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"} bg-white shadow-md`
      }`}
    >
      <div className="max-w-7xl w-full flex items-center mx-auto px-4">
        <div className="flex justify-center items-center w-full h-14 gap-2">
          {HeaderData.map((data) => {
            const activeSection = data.section.toLowerCase();
            return (
              <div
                key={data.id}
                className={`px-4 gap-2 relative font-semibold cursor-pointer h-full flex items-center my-auto transition-all duration-500 ${
                  activeTab === activeSection ? "border-b-[5px] border-[#19b99a] border-solid" : ""
                }`}
                onClick={() => {
                  if (data.href) {
                    router.push(data.href);
                  } else {
                    scrollToSection(activeSection);
                  }
                }}
                onMouseEnter={() => data.submenu && setIsDropdownOpen(data.id)}
                onMouseLeave={() => data.submenu && setIsDropdownOpen(null)}
              >
                {t(data.title)}
                {data.submenu && <FaChevronDown className="text-xs" />}
                {data.submenu && isDropdownOpen === data.id && (
                  <div
                    className="absolute top-[57px] w-40 bg-white rounded-lg shadow-lg group-hover:opacity-100 transition-opacity duration-300 border border-1 max-h-[300px] overflow-y-auto scrollbar-container"
                    onMouseEnter={() => setIsDropdownOpen(data.id)}
                    onMouseLeave={() => setIsDropdownOpen(null)}
                  >
                    <ul className="py-2">
                      {data.submenu.map((subItem) => (
                        <li key={subItem.id} className="block px-4 py-2 hover:bg-gray-100 font-poppins">
                          {subItem.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Header;
