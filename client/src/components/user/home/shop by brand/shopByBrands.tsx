// Imports
import ContentWrapper from "../../../common/wrappers/content-wrapper/contentWrapper";

// Demo Data
import { brands } from "../../../../assets/data/brandsData";
import { ArrowRight } from "@phosphor-icons/react";

const ShopByBrands = () => {
  return (
    <ContentWrapper>
      <div className="shopByBrands">
        <h1>Shop By Brands</h1>
        <div className="brandsContent">
          {brands.map((brand) => (
            <div className="brandCard" key={brand.id}>
              <div className="brandContent">
                <div className="top">
                <div className="brandImg">
                  <img src={brand.image} alt={brand.name} />
                </div>
                <h1 className="brandName">{brand.name}</h1>
                </div>
                <p>{`Explore ${brand.name} to get best furnitures !`}</p>
                <a>
                  Explore
                  <ArrowRight />
                </a>
              </div>
              <div className="furnitureImg">
                <img src={brand.furnitureImg} alt="furniture" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ShopByBrands;
