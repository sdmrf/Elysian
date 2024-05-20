// Imports
import Card from "../../common/card/card";
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";

// Demo Data
import { furnitures } from "../../../assets/data/homeData";

const TrendingProducts = () => {
  return (
    <div className="trendingProducts">
      {/* <div className="trendingHeading">
        <h1>Trending Products</h1>
        <p>Find the best products from our collection</p>
      </div> */}
      <SwiperSlider>
        {furnitures.map((furniture, index) => (
          <Card key={index} {...furniture} />
        ))}
      </SwiperSlider>
    </div>
  );
};

export default TrendingProducts;
