"use client";
import Layout from "@/components/common/Layout/Layout";
import Image from "next/image";
import "../i18n";
import TrendingSection from "@/components/NewsFeed/TrendingSection";
import { useEffect, useState } from "react";
import { trendingData } from "@/utils/constant";
import Container from "@/components/common/Container";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
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
        <div className="flex gap-4">
          <div className="flex gap-4 w-full justify-center items-center relative mt-44">
            <Image src="/assets/png/404-2.png" alt="404" width={250} height={100} className="hidden md:block -mt-40" />
            <div className="text-center space-y-7">
              <h1 className="text-6xl font-semibold">Error 404!</h1>
              <p className="font-poppins text-[#AEABAB]">PAGE NOT FOUND</p>
              <button className="bg-[#19b99a] tracking-wider text-white px-6 py-3 rounded-lg" onClick={() => router.push("/")}>
                Back to Home
              </button>
            </div>
            <Image src="/assets/png/404-1.png" alt="404" width={300} height={100} className="hidden md:block -mt-40 -ml-10" />
          </div>
          <TrendingSection trendingState={trendingState} />
        </div>
      </Container>
    </Layout>
  );
}
