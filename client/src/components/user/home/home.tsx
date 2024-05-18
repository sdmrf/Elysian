// Imports
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";
import Card from "../../common/card/card";

// Demo Data

const furnitures = [
  {
    name: "Sakarias Armchair",
    price: "$392",
    image: "url_to_sakarias_armchair_image",
    rating: 5,
  },
  {
    name: "Baltsar Chair",
    price: "$299",
    image: "url_to_baltsar_chair_image",
    rating: 4,
  },
  {
    name: "Anjay Chair",
    price: "$519",
    image: "url_to_anjay_chair_image",
    rating: 5,
  },
  {
    name: "Nyantuy Chair",
    price: "$921",
    image: "url_to_nyantuy_chair_image",
    rating: 4,
  },
];

const HomeX = () => {
  return (
    <div className="Home">
      <main>
        <SwiperSlider>
          {furnitures.map((furniture, index) => (
            <Card key={index} {...furniture} />
          ))}
        </SwiperSlider>
      </main>
    </div>
  );
};

export default HomeX;
