// Imports
import { MagnifyingGlass } from "@phosphor-icons/react";
import { logos } from "../../../assets/data/logosData";
import SwiperLogo from "../wrappers/swiper-wrapper/swiper-logo/swiperLogo";
import Categories from "./categories";
import UserSection from "./usersection";
import Adminsection from "./adminsection";
import Achievements from "./achievements";
import Admincard from "./admincard";

const LandingX = () => {

  const Top = (
    <div className="hero">
      <div className="Backdrop-img">
        <img src="/Images/landingBg.png" />
      </div>
      <div className="leftfade"></div>
      <div className="overlay"></div>
      <div className="content">
        <div className="info">
          <h1>Make Your Interior More Minimalistic & Modern</h1>
          <p>
            Turn your room with panto into a lot more minimalist and modern with
            ease and speed
          </p>
          <div className="search">
            <input type="text" placeholder="Search for furnitures" />
            <div className="icon">
              <MagnifyingGlass className="searchIcon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
  return (
    <div className="landing">
      <main>
        {Top}
        <SwiperLogo>
          {logos.map((logo, index) => (
            <img key={index} src={logo.logo} />
          ))}
        </SwiperLogo>
      </main>
      <section>
        <Categories />
      </section>
      <section>
        <UserSection />
      </section>
      <section>
        <Adminsection />
      </section>
      <section>
        <Achievements />
      </section>
      <section>
        <Admincard />
      </section>
    </div>
  );
};

export default LandingX;
