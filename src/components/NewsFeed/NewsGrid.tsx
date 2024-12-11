"use client";
import React, { useState } from "react";
import Image from "next/image";
import Title from "../common/Title";
import Skeleton from "../common/Skeleton";
import { useTranslation } from "react-i18next";

interface NewsItem {
  id: number;
  image: string;
  time: string;
  title: string;
}

interface NewsGridProps {
  newsData: NewsItem[];
  visibleCount: number;
  handleShowMore: () => void;
  buttonLabel?: string;
  imageWidth?: number;
  imageHeight?: number;
  sectionTitleName?: string;
  isLoading: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({
  newsData,
  visibleCount,
  handleShowMore,
  buttonLabel = "MORE NEWS",
  imageWidth = 500,
  imageHeight = 100,
  sectionTitleName,
  isLoading
}) => {
  const { t } = useTranslation();
  const dataList = isLoading ? Array.from({ length: 6 }, (_, i) => i) : newsData.slice(0, visibleCount);
  return (
    <div>
      {sectionTitleName && <Title title={sectionTitleName} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 sm:mt-12">
        {dataList.map((data: any, index: number) => {
          if (isLoading) {
            return <Skeleton key={`skeleton-${index}`} />;
          } else {
            return (
              <div key={data.id} className="space-y-2">
                <Image src={data.image} alt={data.title} width={imageWidth} height={imageHeight} />
                <p className="text-[#AEABAB]">{data.time}</p>
                <p className="font-semibold text-xl">{data.title}</p>
              </div>
            );
          }
        })}
        {!isLoading && visibleCount < newsData.length && (
          <div className="mt-8 text-center col-span-1 sm:col-span-2 md:col-span-3">
            <button onClick={handleShowMore} className="border-solid border-[1px] border-black py-2 px-4 max-w-xl w-full">
              {t("moreNews")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsGrid;
