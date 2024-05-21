import SingleCategory from "./singlecategory";
import { categories } from "../../../assets/data/categoryData";
import ContentWrapper from "../wrappers/content-wrapper/contentWrapper";
const Categories = () => {
  return (
    <ContentWrapper>
      <div className="categories">
        <div className="heading">
          <span>Explore</span>
          <h1>Explore with Categories !</h1>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
            dignissimos quae ab id dicta earum nam, doloremque ipsum ea commodi
          </p>
        </div>
        <div className="categoryItems">
          {categories.map((category, index) => (
            <SingleCategory key={index} {...category} />
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Categories;
