import React from "react";
import Title from "../common/Title";
import MiniSkeleton from "../common/MiniSkeleton";
import Image from "next/image";

interface TrendingState {
  loading: boolean;
  data: { id: string; image: string; title: string; time: string }[];
}

function TrendingSection({ trendingState }: { trendingState: TrendingState }) {
  return (
    <div className="hidden lg:block w-[450px]">
      <div className="sticky top-40">
        <Title title="trending" />
        <div className="space-y-6">
          {trendingState.loading
            ? Array(6)
                .fill(null)
                .map((_, index) => <MiniSkeleton key={index} />)
            : trendingState.data.map((data) => (
                <div key={data.id} className="flex gap-3 w-full">
                  <Image src={data.image} alt={data.title} width={80} height={80} />
                  <div className="space-y-2 pb-2">
                    <p className="text-[#AEABAB] text-xs">{data.time}</p>
                    <p className="font-semibold text-base leading-5">{data.title}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingSection;
