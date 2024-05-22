import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import ContentWrapper from "../../wrappers/content-wrapper/contentWrapper";
import SwiperSlider from "../../wrappers/swiper-wrapper/swiper-slider/swiperSlider";
import { testimonials } from "../../../../assets/data/testimonial";
import SingleTestimonial from "./singleTestimonial";
const Testimonials = () => {

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const isMediumScreen = useMediaQuery({ maxWidth: 1024 });
  const isLargeScreen = useMediaQuery({ minWidth: 1025 });
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    if (isSmallScreen) {
      setSlidesToShow(1);
    } else if (isMediumScreen) {
      setSlidesToShow(2);
    } else if (isLargeScreen) {
      setSlidesToShow(3);
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  return (
    <ContentWrapper>
      <div className="testimonial">
        <div className="heading">
          <span>Testimonials</span>
          <h2>Our Clients Review</h2>
          <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            dignissimos quae ab id dicta earum nam, doloremque ipsum ea commodi
          </p>
        </div>
        <SwiperSlider slides={slidesToShow}>
          {testimonials.map((testimonial, index) => (
            <SingleTestimonial key={index} {...testimonial} />
          ))}
        </SwiperSlider>
      </div>
    </ContentWrapper>
  );
};

export default Testimonials;
