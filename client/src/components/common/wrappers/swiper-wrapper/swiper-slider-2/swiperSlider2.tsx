// Imports
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Initialize Swiper core modules
SwiperCore.use([Navigation, Pagination]);

const SwiperSlider2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={5}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={true}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      {/* Add navigation buttons */}
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </Swiper>
  );
};

export default SwiperSlider2;
