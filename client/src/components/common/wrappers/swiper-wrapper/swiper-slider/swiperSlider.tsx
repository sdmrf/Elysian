// Imports
import React from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperSlider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={4}
      navigation={{
        enabled: true,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <div className="swiper-button-prev">
        <ArrowLeft className="icon" />
      </div>
      <div className="swiper-button-next">
        <ArrowRight className="icon" />
      </div>
      <div className="swiper-custom-pagination"></div>
    </Swiper>
  );
};

export default SwiperSlider;
