// Imports
import {
  YoutubeLogo,
  MetaLogo,
  XLogo,
  InstagramLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

// Components
import ContentWrapper from "../wrappers/content-wrapper/contentWrapper";

// Interfaces
interface FooterContentDataProps {
  title: string;
  items: (string | { icon: any; link: string })[];
}

// Data
const footerContentData = {
  Company: [
    "About Us",
    "Our Designers",
    "Careers",
    "Press",
    "Affiliates",
    "Sitemap",
  ],
  Help: [
    "Contact Us",
    "FAQ",
    "Shipping",
    "Returns",
    "Terms & Conditions",
    "Privacy Policy",
  ],
  Contact: ["codezeniths@gmail.com"],
  Social: [
    { icon: YoutubeLogo, link: "https://www.youtube.com/" },
    { icon: MetaLogo, link: "https://www.meta.com/" },
    { icon: XLogo, link: "https://www.x.com/" },
    { icon: InstagramLogo, link: "https://www.instagram.com/" },
  ],
};

const FooterSection = ({ title, items }: FooterContentDataProps) => (
  <div className="footerSection">
    <h3 className="footerHeading">{title}</h3>
    <div className={`footerLinks ${title === "Social" ? "footerSocial" : ""}`}>
      {items.map((item, index) =>
        typeof item === "string" ? (
          <Link
            to={`/${item.toLowerCase().replace(/ /g, "-")}`}
            key={index}
            className="link"
          >
            {item}
          </Link>
        ) : (
          <Link to={item.link} key={index} className="link socialLink">
            <item.icon />
          </Link>
        )
      )}
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
      <div className="footerWrapper">
        <div className="footerContainer">
          <div className="footerSection">
            <Link to="/" className="link footerLogo">
              <img src="/logo-light.png" alt="Elysian Logo" />
            </Link>
          </div>
          {Object.entries(footerContentData).map(([title, items]) => (
            <FooterSection key={title} title={title} items={items} />
          ))}
        </div>
        <div className="line"></div>
        <div className="footerCopyright">
          <p>&copy; 2024 Elysian. All rights reserved.</p>
        </div>
      </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
