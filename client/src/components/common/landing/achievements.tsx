import ContentWrapper from "../wrappers/content-wrapper/contentWrapper";

const Achievements = () => {
  return (
    <ContentWrapper>
      <div className="achievements">
        <img src="/Images/achievement.png" alt="" className="illustrationX" />
        <img src="/Images/shape-05.png" alt="" className="illustrationY" />
        <div className="container">
          <div className="heading">
            <span>Achievements</span>
            <h2>Trusted by global Investors</h2>
            <p>
              A Glimpse into Elysian's Achievements – Thousands Thriving,
              Countless Collaborations, and a Growing Community of Job Seekers
              and Companies.
            </p>
          </div>
          <div className="stats">
            <div className="stat">
              <h2>500K</h2>
              <p>World Wide Users</p>
            </div>
            <div className="stat">
              <h2>1M+</h2>
              <p>Downloads</p>
            </div>
            <div className="stat">
              <h2>241</h2>
              <p>Winning Award</p>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Achievements;
