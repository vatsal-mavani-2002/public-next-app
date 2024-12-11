import React from "react";
import Container from "../common/Container";
import Image from "next/image";

function WhereWeAre() {
  const whareWeAre = [
    {
      title: "User Reach",
      value: "2,00,00,000",
      imgUrl: "/assets/png/user-reach.png"
    },
    {
      title: "Video Consumed",
      value: "3,00,00,000 Min",
      imgUrl: "/assets/png/video-consumed.png"
    },
    {
      title: "MAU",
      value: "40%",
      imgUrl: "/assets/png/mau.png"
    }
  ];

  return (
    <div className="py-10 sm:py-20 space-y-8 px-4 bg-[#f4f4f4]">
      <Container>
        <h1 className="text-3xl font-semibold mb-8">Where We Are</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {whareWeAre.map((item, index) => (
            <div key={index} className="bg-white p-4 font-poppins flex gap-6 w-full">
              <Image src={item.imgUrl} alt={item.title} width={100} height={100} />
              <div className="flex flex-col justify-center gap-3">
                <div className="font-poppins text-xl font-semibold">{item.title}</div>
                <div className="font-poppins text-2xl">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default WhereWeAre;
