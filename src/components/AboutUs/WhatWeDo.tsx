import React from "react";
import Container from "../common/Container";
import Image from "next/image";

function WhatWeDo() {
  return (
    <Container>
      <div className="py-10 sm:py-20 space-y-8">
        <h1 className="text-3xl font-semibold mb-8 px-4">What We Do</h1>
        <div className="flex items-center flex-col md:flex-row gap-12 px-4">
          <div className="w-full md:w-[50%]">
            <Image src="/assets/png/wwd-1.png" alt="What We Do" width={600} height={400} />
          </div>
          <div className="w-full md:w-[50%]">
            <h2 className="text-2xl font-semibold font-poppins mb-8">Authentic Local News</h2>
            <p className="font-poppins">
              Our trained local reporting network shares news which no others platform does it locally. 70% of the news in video and it looks like
              local TV in hand. News goes through the vetting process at source and during curation to establish authenticity. We cover everything
              local!
            </p>
          </div>
        </div>
        <div className="flex items-center flex-col-reverse md:flex-row gap-12 px-4">
          <div className="w-full md:w-[50%]">
            <h2 className="text-2xl font-semibold font-poppins mb-8">Promote Your Local Bussiness</h2>
            <p className="font-poppins">
              Neighbourhood with thousands of small and medium businesses has enough jobs and offers to share. Platform enables local businesses to
              share jobs and offers in video format.
            </p>
          </div>
          <div className="w-full md:w-[50%]">
            <Image src="/assets/png/wwd-2.png" alt="What We Do" width={600} height={400} />
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-12 px-4">
          <div className="w-full md:w-[50%]">
            <Image src="/assets/png/wwd-3.png" alt="What We Do" width={600} height={400} />
          </div>
          <div className="w-full md:w-[50%]">
            <h2 className="text-2xl font-semibold font-poppins mb-8">Make Local Leaders From Nowhere</h2>
            <p className="font-poppins">
              There is no dearth of opinionated people in an area. There is no dearth of aspiring leaders in an area. They need a platform to reach
              local masses. PublicNext provides a platform for anyone to express their opinion, discuss and dissent on the authentic local editorial
              content. And get recognized! This will also be the platform for local bodies to reach masses in an area.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default WhatWeDo;
