// Imports
import SwiperCarousel from "../../common/wrappers/swiper-wrapper/swiper-carousel/swiperCarousel";
import SwiperLogo from "../../common/wrappers/swiper-wrapper/swiper-logo/swiperLogo";
import ProductSection from "../../common/product section/productSection";
import PromotionCard from "../../common/promotion card/promotionCard";
import Categories from "../../common/categories/categories";

// Demo Data
import { sofas, chairs } from "../../../assets/data/homeData";
import { logos } from "../../../assets/data/logosData";

// Data
const productCategories = [
  { imgSrc: "/furnitures/F-bg-2.jpg", label: "Living Room" },
  { imgSrc: "/furnitures/F-bg-3.jpg", label: "Bedroom" },
  { imgSrc: "/furnitures/F-bg-4.jpg", label: "Kitchen" },
  { imgSrc: "/furnitures/F-bg-5.jpg", label: "Office" },
  { imgSrc: "/furnitures/F-bg-6.jpg", label: "Outdoor" },
  { imgSrc: "/furnitures/F-bg-7.jpg", label: "Decor" },
  { imgSrc: "/furnitures/F-bg-8.jpg", label: "Lighting" },
  { imgSrc: "/furnitures/F-bg-4.jpg", label: "Kitchen" },
];

const brandCategories = [
  { imgSrc: "/furnitures/F-bg-2.jpg", label: "Godrej" },
  { imgSrc: "/furnitures/F-bg-3.jpg", label: "Livon" },
  { imgSrc: "/furnitures/F-bg-4.jpg", label: "Hometown" },
  { imgSrc: "/furnitures/F-bg-5.jpg", label: "Nilkamal" },
  { imgSrc: "/furnitures/F-bg-6.jpg", label: "Woodenstreat" },
  { imgSrc: "/furnitures/F-bg-7.jpg", label: "Urban Ladder" },
  { imgSrc: "/furnitures/F-bg-8.jpg", label: "Zauri" },
  { imgSrc: "/furnitures/F-bg-4.jpg", label: "Damro" },
];

const HomeX = () => {
  return (
    <div className="home">
      <main>
        <SwiperCarousel>
          {sofas.map((sofa, index) => (
            <img key={index} src={sofa.image} alt={`Sofa ${index}`} />
          ))}
        </SwiperCarousel>
        <SwiperLogo>
          {logos.map((logo, index) => (
            <img key={index} src={logo.logo} alt={`Logo ${index}`} />
          ))}
        </SwiperLogo>
      </main>
      <section>
        <ProductSection
          title="Trending Products"
          products={[...sofas, ...chairs]}
          categories={[
            "All",
            "Sofa",
            "Chair",
            "Table",
            "Bed",
            "Decor",
            "Kitchen",
          ]}
        />
      </section>
      <section>
        <PromotionCard
          title="New Sofa Collection"
          description="Explore our latest sofa collection, featuring innovative designs crafted for both comfort and style. Elevate your living space with our premium selection of sofas, designed to enhance your relaxation and entertainment experience."
          imageSrc="/furnitures/F-bg-1.jpg"
          timeRemaining={[
            { value: 12, label: "Days" },
            { value: 8, label: "Hours" },
            { value: 34, label: "Minutes" },
            { value: 55, label: "Seconds" },
          ]}
          buttonText="Check It Out!"
        />
      </section>
      <section>
        <Categories title="Shop by Category" categories={productCategories} />
      </section>
      <section>
        <ProductSection
          title="Recommended Products"
          products={sofas}
          showCategories={false}
        />
      </section>
      <section>
        <PromotionCard
          title="Hot Deals"
          description="Discover exclusive deals of the month, offering unbeatable savings on a wide range of products. From trending tech gadgets to must-have fashion accessories, seize the opportunity to enjoy remarkable discounts on the hottest items in our collection."
          imageSrc="/furnitures/F-bg-2.jpg"
          timeRemaining={[
            { value: 5, label: "Days" },
            { value: 10, label: "Hours" },
            { value: 45, label: "Minutes" },
            { value: 30, label: "Seconds" },
          ]}
          buttonText="Hurry Now!"
        />
      </section>
      <section>
        <Categories title="Shop by Brand" categories={brandCategories} />
      </section>
      <section>
        <PromotionCard
          title="Best Seller of the Month"
          description="Experience our best-selling product of the month, curated to exceed your expectations. With exceptional quality and unmatched value, our best seller promises to elevate your lifestyle while offering irresistible savings."
          imageSrc="/furnitures/F-bg-3.jpg"
          timeRemaining={[
            { value: 10, label: "Days" },
            { value: 6, label: "Hours" },
            { value: 20, label: "Minutes" },
            { value: 15, label: "Seconds" },
          ]}
          buttonText="Discover More"
        />
      </section>
    </div>
  );
};

export default HomeX;
