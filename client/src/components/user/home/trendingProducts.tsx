// Imports
import { useState } from "react";
import Card from "../../common/card/card";
import SwiperSlider from "../../common/wrappers/swiper-wrapper/swiper-slider/swiperSlider";

// Demo Data
import { sofas, chairs } from "../../../assets/data/homeData";

const trendingCategories = ["All", "Sofa", "Chair", "Table", "Bed"];

const TrendingProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSetCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const getFilteredProducts = () => {
    if (selectedCategory === "All") {
      return [...sofas, ...chairs];
    }
    if (selectedCategory === "Sofa") {
      return sofas;
    }
    if (selectedCategory === "Chair") {
      return chairs;
    }
    return [];
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="trendingProducts">
      <div className="trendingHeading">
        <h1>Trending Products</h1>
        <div className="trendingCategories">
          {trendingCategories.map((category, index) => (
            <span
              key={index}
              onClick={() => handleSetCategory(category)}
              className={`trendingCategory ${
                category === selectedCategory && "activeCategory"
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <SwiperSlider>
        {filteredProducts.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </SwiperSlider>
    </div>
  );
};

export default TrendingProducts;
