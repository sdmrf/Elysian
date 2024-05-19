// Imports
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";
import SwiperCarousel from "../../common/wrappers/swiper-wrapper/swiper-carousel/swiperCarousel";
import ContentWrapper from "../../common/wrappers/content-wrapper/contentWrapper";
import Card from "../../common/card/card";

// Demo Data
import { furnitures } from "../../../assets/data/homeData";

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
        </main>
    </div>
  );
};

export default HomeX;
