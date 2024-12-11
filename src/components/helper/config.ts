export const getLanguage = () => {
  return typeof window !== "undefined" && localStorage.getItem("i18nextLng")?.slice(0, 2);
};
