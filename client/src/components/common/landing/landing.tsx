// Imports
import { logos } from "../../../assets/data/logosData";
import Caraousel from "./caraousel/caraousel";
import SwiperLogo from "../wrappers/swiper-wrapper/swiper-logo/swiperLogo";
import Categories from "./categories/categories";
import UserSection from "./sections/usersection";
import Adminsection from "./sections/adminsection";
import Achievements from "./achievements/achievements";
import Admincard from "./admin-apply/applyAdmin";
import Testimonials from "./testimonials/testimonial";

const LandingX = () => {

  return (
    <div className="landing">
      <main>
        <Caraousel />
        <SwiperLogo>
          {logos.map((logo, index) => (
            <img key={index} src={logo.logo} />
          ))}
        </SwiperLogo>
      </main>
      {/* <section>
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
      <section>
        <Testimonials />
      </section> */}
    </div>
  );
};

export default LandingX;
