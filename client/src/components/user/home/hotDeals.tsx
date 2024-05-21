// Imports
import ContentWrapper from "../../common/wrappers/content-wrapper/contentWrapper";
import { ArrowRight } from "@phosphor-icons/react";

const HotDeals = () => {
  const hotDealsContent = (
    <div className="hotDealsContent">
      <h1>Deals of the Month</h1>
      <p>
        Discover our exclusive "Deal of the Month" and enjoy fantastic savings
        on the hottest products! Each month, we handpick an outstanding item
        from our collection, offering it to you at an unbeatable price. Whether
        it's the latest tech gadget, a must-have fashion accessory.
      </p>
      <div className="timeRemaining">
        <div className="timeRemainingItem">
          <h3>12</h3>
          <p>Days</p>
        </div>
        <div className="timeRemainingItem">
          <h3>08</h3>
          <p>Hours</p>
        </div>
        <div className="timeRemainingItem">
          <h3>34</h3>
          <p>Minutes</p>
        </div>
        <div className="timeRemainingItem">
          <h3>55</h3>
          <p>Seconds</p>
        </div>
      </div>
      <button className="AllProductsBtn">
        View All Products
        <ArrowRight size={18} />
      </button>
    </div>
  );

  return (
    <ContentWrapper>
      <div className="hotDeals">
        {hotDealsContent}
        <div className="hotDealsImage">
          <img src={"/furnitures/F-bg-1.jpg"} alt="" />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default HotDeals;
