// Imports
import { useState } from "react";
import Card from "../card/card";
import SwiperSlider from "../wrappers/swiper-wrapper/swiper-slider/swiperSlider";

// Interfaces
interface IProductSection {
  title: string;
  products: any[];
  categories?: string[];
  showCategories?: boolean;
}

const ProductSection = ({
  title,
  products,
  categories = [],
  showCategories = true,
}: IProductSection) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSetCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const getFilteredProducts = () => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="productSection">
      <div className="productHeading">
        <h1>{title}</h1>
        {showCategories && (
          <div className="productCategories">
            {categories.map((category, index) => (
              <span
                key={index}
                onClick={() => handleSetCategory(category)}
                className={`productCategory ${
                  category === selectedCategory && "activeCategory"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      <SwiperSlider slides={4}>
        {filteredProducts.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </SwiperSlider>
    </div>
  );
};

export default ProductSection;
