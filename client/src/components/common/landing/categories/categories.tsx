// Imports
import SingleCategory from "./single-category/singleCategory";
import ContentWrapper from "../../wrappers/content-wrapper/contentWrapper";

// Data
import { categories } from "../../../../assets/data/categoryData";

const Categories = () => {
  return (
    <ContentWrapper>
    <div className="landingCategories">
      <div className="categoryHeading">
        <div className="explore">Explore</div>
        <div className="exploreTitle">Explore by Categories!</div>
        <div className="exploreDescp">
          Explore the categories and find the best products for you and your
          loved ones.
        </div>
      </div>
      <div className="categoryItems">
        {categories.map((category, index) => {
          return <SingleCategory key={index} {...category} />;
        })}
      </div>
    </div>
    </ContentWrapper>
  );
};

export default Categories;
