import { ArrowRight } from "@phosphor-icons/react";
import ContentWrapper from "../wrappers/content-wrapper/contentWrapper";

const Adminsection = () => {
  return (
    <div className="adminsection">
      <ContentWrapper>
        <div className="container">
          <div className="content">
            <span>Admin</span>
            <h2>Become a part of the elysian firm !</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              tincidunt, urna nec volutpat rutrum, sem turpis eleifend elit, nec
              suscipit nunc justo et est. Sed nec mi nec odio tincidunt
              fermentum.
            </p>
            <div className="link">
              <a href="#">Know More</a>
              <ArrowRight />
            </div>
          </div>
          <div className="img">
            <img src="/furnitures/F-bg-3.jpg" alt="adminsection" />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Adminsection;
