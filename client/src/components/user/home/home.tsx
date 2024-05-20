// Imports
import SwiperCarousel from "../../common/wrappers/swiper-wrapper/swiper-carousel/swiperCarousel";
import SwiperLogo from "../../common/wrappers/swiper-wrapper/swiper-logo/swiperLogo";

// Components
import TrendingProducts from "./trendingProducts";

// Demo Data
import { sofas } from "../../../assets/data/homeData";
import { logos } from "../../../assets/data/logosData";

const HomeX = () => {
  return (
    <div className="Home">
      <main>
        <SwiperCarousel>
          {sofas.map((sofa, index) => (
            <img key={index} src={sofa.image} />
          ))}
        </SwiperCarousel>
        <SwiperLogo>
          {logos.map((logo, index) => (
            <img key={index} src={logo.logo} />
          ))}
        </SwiperLogo>
      </main>
      <section>
        <TrendingProducts />
      </section>
    </div>
  );
};

export default HomeX;
