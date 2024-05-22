import { ArrowRight } from "@phosphor-icons/react";
import ContentWrapper from "../../wrappers/content-wrapper/contentWrapper";

const Admincard = () => {
  return (
    <ContentWrapper>
      <div className="admincard">
        <div className="container">
          <div className="content">
            <span>Apply</span>
            <h2>Join Us Today & Become an Integral Part of Elysian !</h2>
            <p>
              Empowering Recruiters with Exceptional Talent Discovery, Elevating
              Your Team with Every Strategic Hire.
            </p>
            <div className="link">
              <a href="">Know More</a>
              <ArrowRight />
            </div>
          </div>
          <div className="illustration">
            <img src="/Images/shape-06.png" alt="" />
          </div>
            <button type="button">
              Apply Now
              <ArrowRight />
            </button>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Admincard;
