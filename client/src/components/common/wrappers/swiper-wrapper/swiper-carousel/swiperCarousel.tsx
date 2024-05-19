// Imports
import React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const SwiperCarousel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Swiper
      modules={[
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Autoplay,
        EffectCoverflow,
      ]}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      autoplay={{ delay: 5000 }}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 25,
        depth: 150,
        modifier: 2.5,
        slideShadows: true,
      }}
      pagination={{ el: ".swiperPagination", clickable: true }}
      navigation={{
        nextEl: ".swiperBtnNext",
        prevEl: ".swiperBtnPrev",
      }}
      className="swiperCarousel"
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <div className="sliderController">
        <div className="swiperBtnPrev">
          <CaretLeft className="icon" weight="bold" />
        </div>
        <div className="swiperBtnNext">
          <CaretRight className="icon" weight="bold" />
        </div>
        <div className="swiperPagination"></div>
      </div>
    </Swiper>
  );
};

export default SwiperCarousel;
