"use client";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbLanguageHiragana } from "react-icons/tb";
import { getLanguage } from "../helper/config";
import { useStateProvider } from "@/context/StateProvicer";
import { useTranslation } from "react-i18next";

const languages: any = [
  { code: "en", name: "English" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "hi", name: "हिंदी" }
];

interface LanguageSelectionProps {
  isSmall?: boolean;
}

const LanguageSelection = ({ isSmall }: LanguageSelectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguage() || "en");
  const { i18n } = useTranslation();
  const { setChangeLanguage } = useStateProvider();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    setChangeLanguage((prevState) => !prevState);
    i18n.changeLanguage(langCode);
    setSelectedLanguage(langCode);
  };

  const currentLanguage = languages.find((lang: any) => lang.code === selectedLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between ${isSmall ? "w-10 h-10 p-2" : "w-36 p-2 bg-[#333333]"}  text-white rounded-md shadow-sm`}
      >
        <TbLanguageHiragana className={`${isSmall ? "text-3xl" : "text-xl"}`} />
        {!isSmall && <span>{currentLanguage?.name}</span>}
        {!isSmall && (isOpen ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />)}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${isSmall ? "right-2 w-24" : "left-0 w-full"} mt-2 bg-[#333333] text-white rounded-md shadow-lg z-50`}
        >
          <ul className="max-h-60 overflow-y-auto">
            {languages.map((language: any) => (
              <li
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="flex items-center  p-2 cursor-pointer bg-[#333333] hover:bg-gray-700"
              >
                <span className="ml-2">{language.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelection;
