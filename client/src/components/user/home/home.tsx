// Imports
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";
import SwiperCarousel from "../../common/wrappers/swiper-wrapper/swiper-carousel/swiperCarousel";
import SwiperLogo from "../../common/wrappers/swiper-wrapper/swiper-logo/swiperLogo";
import ContentWrapper from "../../common/wrappers/content-wrapper/contentWrapper";
import Card from "../../common/card/card";

// Demo Data
import { furnitures } from "../../../assets/data/homeData";
import { logos } from "../../../assets/data/logosData";

const HomeX = () => {
  return (
    <div className="Home">
      <main>
        {/* <SwiperSlider>
            {furnitures.map((furniture, index) => (
              <Card key={index} {...furniture} />
            ))}
          </SwiperSlider> */}
        <SwiperCarousel>
          {furnitures.map((furniture, index) => (
            <img key={index} src={furniture.image} />
          ))}
        </SwiperCarousel>
        <SwiperLogo>
          {logos.map((logo, index) => (
            <img key={index} src={logo.logo} />
          ))}
        </SwiperLogo>
      </main>
    </div>
  );
};

export default HomeX;
