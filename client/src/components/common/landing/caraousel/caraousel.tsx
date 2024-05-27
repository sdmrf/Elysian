// Imports
import { MagnifyingGlass } from "@phosphor-icons/react";

const Caraousel = () => {
  return (
    <div className="carousel">
      <div className="carouselContent">
        <div className="contentInfo">
          <h1>Make Your Interior More Minimalistic & Modern</h1>
          <p>
            Turn your room with panto into a lot more minimalist and modern with
            ease and speed.
          </p>
        </div>
        <div className="contentSearchBar">
          <input type="text" placeholder="Search for furnitures..." />
          <div className="searchIcon">
            <MagnifyingGlass className="icon" />
          </div>
        </div>
      </div>
      <div className="fadeEnd"></div>
    </div>
  );
};

export default Caraousel;
