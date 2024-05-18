// Imports
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";
import Card from "../../common/card/card";

// Demo Data
import { furnitures } from "../../../assets/data/homeData";

const HomeX = () => {
  return (
    <div className="Home">
      <main>
        <Card {...furnitures[0]} />
      </main>
    </div>
  );
};

export default HomeX;
