import React from "react";
import { Category } from "../../../../types/types";
import { ArrowRight } from "@phosphor-icons/react";

const SingleCategory = ({icon, heading, desc, link, products}: Category) => {
  return (
    <div className="singlecategory">
      <div className="icon">
        {icon}
      </div>
      <h1>{heading}</h1>
      <p>{desc}</p>
      <div className="link">
        <a href={link}>{`${products} available`}</a>
        <ArrowRight className="arrow" />
      </div>
    </div>
  );
};

export default SingleCategory;
