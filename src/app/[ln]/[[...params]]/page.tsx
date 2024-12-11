"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/common/Layout/Layout";
import Container from "@/components/common/Container";
import TrendingSection from "@/components/NewsFeed/TrendingSection";
import { trendingData } from "@/utils/constant";
import "../../../i18n";
import Image from "next/image";
import Modal from "@/components/common/Modal";

const NewsArticlePage = () => {
  const { ln, params: dynamicParams = [] } = useParams();
  const [newsType, category, city, newsTitle] = dynamicParams;
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const paramStatus = {
    newsType: newsType || "No value",
    category: category || "No value",
    city: city || "No value",
    newsTitle: newsTitle || "No value"
  };

  const [trendingState, setTrendingState] = useState<{
    loading: boolean;
    data: any[];
  }>({
    loading: true,
    data: []
  });

  const fetchTrendingData = (delay: number, data: any[]) => {
    setTimeout(() => {
      setTrendingState({
        loading: false,
        data
      });
    }, delay);
  };

  useEffect(() => {
    fetchTrendingData(2000, trendingData);
  }, []);

  return (
    <Layout>
      <Container>
        <div className="flex gap-8 p-4">
          <div className="w-full mt-2 space-y-4">
            <span className="bg-[#19b99a] px-4 py-2 text-white font-semibold border-solid">BANGALORE</span>
            <h1 className="text-3xl sm:text-5xl font-semibold">Hulu hires Google marketing veteran Kellyc</h1>
            <h2 className="text-[#AEABAB] font-poppins">
              Published 24hrs ago on 1st Oct 2024 by{" "}
              <span className="text-[#19b99a] underline font-semibold font-poppins cursor-pointer" onClick={toggleModal}>
                Nagaraj Yallapur
              </span>{" "}
            </h2>
            <Image src="https://images.unsplash.com/photo-1732466285965-87c9caa258a0" alt="About Us" width={1920} height={1080} />
            <div className="relative h-36 overflow-hidden">
              <p className="font-poppins text-[#AEABAB]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[70px] flex justify-center items-center backdrop-blur-sm bg-gradient-to-t from-white/0 to-white opacity-90">
                <button className="bg-[#19b99a] font-semibold text-white px-6 py-3 rounded-lg">Download Mobile App</button>
              </div>
            </div>

            <h1>Dynamic News Page</h1>
            <p>Language: {ln}</p>
            <p>News Type: {paramStatus.newsType}</p>
            <p>Category: {paramStatus.category}</p>
            <p>City: {paramStatus.city}</p>
            <p>News Title: {paramStatus.newsTitle}</p>
          </div>
          <TrendingSection trendingState={trendingState} />
        </div>
      </Container>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </Layout>
  );
};

export default NewsArticlePage;
