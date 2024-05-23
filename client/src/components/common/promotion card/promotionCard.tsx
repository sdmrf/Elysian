// Imports
import ContentWrapper from "../wrappers/content-wrapper/contentWrapper";
import { ArrowRight } from "@phosphor-icons/react";

// Interfaces
interface TimeRemaining {
  value: number;
  label: string;
}

interface PromotionCardProps {
  title: string;
  description: string;
  imageSrc: string;
  timeRemaining: TimeRemaining[];
  buttonText: string;
}

const PromotionCard = ({
  title,
  description,
  imageSrc,
  timeRemaining,
  buttonText,
}: PromotionCardProps) => {
  const renderTimeRemaining = () => (
    <div className="timeRemaining">
      {timeRemaining.map((time, index) => (
        <div className="timeRemainingItem" key={index}>
          <h3>{time.value}</h3>
          <p>{time.label}</p>
        </div>
      ))}
    </div>
  );

  return (
    <ContentWrapper>
      <div className="promotionCard">
        <div className="promotionCardContent">
          <h1>{title}</h1>
          <p>{description}</p>
          {renderTimeRemaining()}
          <button className="allProductsBtn">
            {buttonText} <ArrowRight size={18} />
          </button>
        </div>
        <div className="promotionCardImage">
          <img src={imageSrc} alt={title} />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default PromotionCard;
