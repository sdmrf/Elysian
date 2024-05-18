// Imports
import { MagnifyingGlass } from "@phosphor-icons/react";

const LandingX = () => {
  return (
    <div className="landing">
      <main>
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
          <div className="bottom"></div>
        </div>
      </main>
    </div>
  );
};

export default LandingX;
