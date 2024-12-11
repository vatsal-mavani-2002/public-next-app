"use client";
import React, { useRef, useState, useEffect } from "react";
import Layout from "../common/Layout/Layout";
import NewsGrid from "./NewsGrid";
import { businessData, cinemaData, crimeData, homeData, politicsData, sportsData, trendingData } from "@/utils/constant";
import TrendingSection from "./TrendingSection";
import Container from "../common/Container";
// import VideoPlayer from "../common/VideoPlayer";

const sections = [
  { id: "home", sectionTitleName: undefined, sectionKey: "home" },
  { id: "politics", sectionTitleName: "politics", sectionKey: "politics" },
  { id: "cinema", sectionTitleName: "cinema", sectionKey: "cinema" },
  { id: "sports", sectionTitleName: "sports", sectionKey: "sports" },
  { id: "crime", sectionTitleName: "crime", sectionKey: "crime" },
  { id: "business", sectionTitleName: "business", sectionKey: "business" }
];

function NewsFeed() {
  const [isMobile, setIsMobile] = useState(false);
  const [sectionStates, setSectionStates] = useState<{
    [key: string]: { loading: boolean; visibleCount: number; data: any[] };
  }>({
    home: { loading: true, visibleCount: 6, data: [] },
    trending: { loading: true, visibleCount: 6, data: [] },
    politics: { loading: true, visibleCount: 6, data: [] },
    cinema: { loading: true, visibleCount: 6, data: [] },
    sports: { loading: true, visibleCount: 6, data: [] },
    crime: { loading: true, visibleCount: 6, data: [] },
    business: { loading: true, visibleCount: 6, data: [] }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [trendingState, setTrendingState] = useState<{
    loading: boolean;
    data: any[];
  }>({
    loading: true,
    data: []
  });

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const fetchTrendingData = (delay: number, data: any[]) => {
    setTimeout(() => {
      setTrendingState({
        loading: false,
        data
      });
    }, delay);
  };

  const handleShowMore = (sectionKey: string) => {
    setSectionStates((prevStates) => ({
      ...prevStates,
      [sectionKey]: {
        ...prevStates[sectionKey],
        visibleCount: prevStates[sectionKey].visibleCount + 6
      }
    }));
  };

  useEffect(() => {
    const fetchData = (sectionKey: string, delay: number, data: any[]) => {
      setTimeout(() => {
        setSectionStates((prevStates) => ({
          ...prevStates,
          [sectionKey]: {
            ...prevStates[sectionKey],
            loading: false,
            data
          }
        }));
      }, delay);
    };

    fetchData("home", 1000, homeData);
    fetchData("politics", 1500, politicsData);
    fetchData("cinema", 2000, cinemaData);
    fetchData("sports", 2500, sportsData);
    fetchData("crime", 3000, crimeData);
    fetchData("business", 3500, businessData);
    fetchData("trending", 1200, trendingData);
    fetchTrendingData(2000, trendingData);
  }, []);

  const trendingSection = { id: "trending", sectionTitleName: "trending", sectionKey: "trending" };
  const finalData = isMobile ? [sections[0], trendingSection, ...sections.slice(1)] : sections;

  return (
    <Layout sectionRefs={sectionRefs}>
      <Container>
        {/* <VideoPlayer /> */}
        <div className="w-full relative flex gap-8 px-4">
          <div className="w-full space-y-20">
            {finalData.map((section) => {
              const { sectionKey, sectionTitleName } = section;
              const sectionState = sectionStates[sectionKey];

              return (
                <div
                  key={section.id}
                  id={sectionKey}
                  ref={(el) => {
                    sectionRefs.current[sectionKey] = el;
                  }}
                >
                  <NewsGrid
                    newsData={sectionState.data}
                    visibleCount={sectionState.visibleCount}
                    handleShowMore={() => handleShowMore(sectionKey)}
                    sectionTitleName={sectionTitleName}
                    isLoading={sectionState.loading}
                  />
                </div>
              );
            })}
          </div>

          <TrendingSection trendingState={trendingState} />
        </div>
      </Container>
    </Layout>
  );
}

export default NewsFeed;
