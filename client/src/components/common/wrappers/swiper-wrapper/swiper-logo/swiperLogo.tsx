// Imports
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperLogo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="logoContainer">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={"auto"}
        speed={5000}
        allowTouchMove={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        className="swiperLogo"
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperLogo;
