// Imports
import { ArrowRight } from "@phosphor-icons/react";
import ContentWrapper from "../../../common/wrappers/content-wrapper/contentWrapper";

const LatestLaunch = () => {
  return (
    <ContentWrapper>
      <div className="latestLaunch">
        <div className="container">
          <div className="content">
            <span>Latest Launch</span>
            <h2>Introducing the All-New Supra Gaming Chair!</h2>
            <p>
              Experience the future of gaming with the Supra Gaming Chair. Stay slaying, improve your gaming perfomance, and enjoy a painless gaming session.
            </p>
            <div className="link">
              <a href="#">Shop Now</a>
              <ArrowRight size={16} />
            </div>
          </div>
          <div className="illustration">
            <img src="/Images/gaming-chair-1.png" alt="GamingChair X" />
          </div>
          <button type="button" className="apply-button">
            Buy Now
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default LatestLaunch;
