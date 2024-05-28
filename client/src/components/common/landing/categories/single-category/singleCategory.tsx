// Imports
import { Category } from "../../../../../types/types";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

const SingleCategory = ({ icon, heading, desc, link, products }: Category) => {
  return (
    <div className="singleCategory">
      <div className="categoryIcon">{icon}</div>
      <div className="categoryHeading">{heading}</div>
      <div className="categoryDesc">{desc}</div>
      <div className="categoryLink">
        <Link to={link} className="link">{`${products} available`}</Link>
        <ArrowRight className="arrow" />
      </div>
    </div>
  );
};

export default SingleCategory;
