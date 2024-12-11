import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translation/en.json";
import knTranslation from "./translation/kn.json";
import hiTranslation from "./translation/hi.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      kn: { translation: knTranslation },
      hi: { translation: hiTranslation }
    },
    lng: (typeof window !== "undefined" && localStorage.getItem("i18nextLng")) || "kn",
    interpolation: {
      escapeValue: false
    },
    fallbackLng: "kn"
  });

i18n.on("languageChanged", (lang) => {
  document.documentElement.lang = lang;
});

export default i18n;
