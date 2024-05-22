import React from "react";
import ContentWrapper from "../../wrappers/content-wrapper/contentWrapper";
const Usersection = () => {
  return (
    <div className="usersection">
      <ContentWrapper>
        <div className="container">
          <div className="img">
            <img src="/furnitures/F-bg-8.jpg" alt="usersection" />
          </div>
          <div className="content">
            <span>New</span>
            <h2>We Provide You The Best Experience !</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              tincidunt, urna nec volutpat rutrum, sem turpis eleifend elit, nec
              suscipit nunc justo et est.
            </p>
            <div className="features">
              <div className="feature">
                <div className="left">01</div>
                <div className="right">
                  <h4>Visualize Furniture in Your Space With AR</h4>
                  <p>Visualize Furniture in Your Space With Augmented Reality.</p>
                </div>
              </div>
              <div className="feature">
                <div className="left">02</div>
                <div className="right">
                  <h4>Personalized Furniture Recommendations</h4>
                  <p>Get Personalized recommendations based on your search history and preferences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Usersection;
