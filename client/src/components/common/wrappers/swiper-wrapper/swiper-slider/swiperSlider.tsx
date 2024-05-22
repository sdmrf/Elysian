// Imports
import React from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperSlider = ({ children, slides = 4 }: { children: React.ReactNode; slides: number; }) => {
  return (
    <div className="swiperSlider">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={slides}
        loop={true}
        navigation={{
          nextEl: ".swiperBtnNext",
          prevEl: ".swiperBtnPrev",
        }}
        pagination={{ clickable: true, el: ".swiperPagination" }}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}

        <div className="swiperPagination"></div>
      </Swiper>

      <div className="swiperBtnPrev">
        <ArrowLeft className="icon" weight="bold" />
      </div>
      <div className="swiperBtnNext">
        <ArrowRight className="icon" weight="bold" />
      </div>
    </div>
  );
};

export default SwiperSlider;
