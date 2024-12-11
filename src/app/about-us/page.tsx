"use client";
import Layout from "@/components/common/Layout/Layout";
import Image from "next/image";
import React from "react";
import "../../i18n";
import Vision from "@/components/AboutUs/Vision";
import WhereWeAre from "@/components/AboutUs/WhereWeAre";
import WhatWeDo from "@/components/AboutUs/WhatWeDo";
import MediaCoverage from "@/components/AboutUs/MediaCoverage";
import Team from "@/components/AboutUs/Team";

function AboutUs() {
  return (
    <Layout>
      <Image src="/assets/png/about-us-bg.png" alt="About Us" width={1920} height={1080} className="p-4 md:p-0" />
      <Vision />
      <WhereWeAre />
      <WhatWeDo />
      <Team />
      <MediaCoverage />
    </Layout>
  );
}

export default AboutUs;
