import React from "react";
import Container from "../common/Container";
import Image from "next/image";

const mediaCoverage = [
  "/assets/png/business-standard.png",
  "/assets/png/money-control.png",
  "/assets/png/ceylonx.png",
  "/assets/png/cyberx.png",
  "/assets/png/business-standard.png"
];

function MediaCoverage() {
  return (
    <Container>
      <div className="py-10 sm:py-20 space-y-8 px-4">
        <h1 className="text-3xl font-semibold text-center">Media Coverage</h1>
        <p className="max-w-3xl w-full mx-auto text-center font-poppins ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
        </p>
      </div>
      <div className="flex md:justify-between flex-wrap gap-8 justify-center pb-8">
        {mediaCoverage.map((item, index) => {
          return <Image src={item} alt="Media Coverage" width={200} height={200} key={index} />;
        })}
      </div>
    </Container>
  );
}

export default MediaCoverage;
