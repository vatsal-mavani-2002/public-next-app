import React from "react";
import { useTranslation } from "react-i18next";

function Title({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <div className="relative border-solid border-[1.5px] flex justify-center my-8">
      <span className="absolute -bottom-5 bg-[#19b99a] px-4 py-2 text-white font-semibold border-solid border-white border-l-4 border-r-4">
        {t(title)}
      </span>
    </div>
  );
}

export default Title;
