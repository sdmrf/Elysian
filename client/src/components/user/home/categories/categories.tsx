// Imports
import ContentWrapper from "../../../common/wrappers/content-wrapper/contentWrapper";

// Interfaces
interface Category {
  imgSrc: string;
  label: string;
}

interface CategoriesProps {
  title: string;
  categories: Category[];
}

const Categories = ({ title, categories }: CategoriesProps) => (
  <ContentWrapper>
    <div className="categories">
      <h1>{title}</h1>
      <div className="categoriesContent">
        {categories.map(({ imgSrc, label }, index) => (
          <div className="categoriesItem" key={index}>
            <img src={imgSrc} alt={label} />
            <h2>{label}</h2>
          </div>
        ))}
      </div>
    </div>
  </ContentWrapper>
);

export default Categories;
