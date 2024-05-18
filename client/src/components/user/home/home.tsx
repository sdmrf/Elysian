// Imports
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";
import SwiperSlider2 from "../../common/wrappers/swiper-wrapper/swiper-slider-2/swiperSlider2";
import ContentWrapper from "../../common/wrappers/content-wrapper/contentWrapper";
import Card from "../../common/card/card";

// Demo Data
import { furnitures } from "../../../assets/data/homeData";

const HomeX = () => {
  return (
    <div className="Home">
      <ContentWrapper>
        <main>
          <SwiperSlider>
            {furnitures.map((furniture, index) => (
              <Card key={index} {...furniture} />
            ))}
          </SwiperSlider>
        </main>
      </ContentWrapper>
    </div>
  );
};

export default HomeX;
