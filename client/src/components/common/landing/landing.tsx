// Imports
import { MagnifyingGlass } from "@phosphor-icons/react";

const LandingX = () => {
  return (
    <div className="landing">
      <main>
      <div className="Backdrop-img">
        <img src="/Images/landingBg.png" />
      </div>
      <div className="leftfade"></div>
      <div className="overlay"></div>
        <div className="content">
          <div className="info">
            <h1>Make Your Interior More Minimalistic & Modern</h1>
            <p>
              Turn your room with panto into a lot more minimalist and modern
              with ease and speed
            </p>
            <div className="search">
              <input type="text" placeholder="Search for furnitures" />
              <div className="icon">
                <MagnifyingGlass className="searchIcon" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <section>

      </section>
    </div>
  );
};

export default LandingX;
