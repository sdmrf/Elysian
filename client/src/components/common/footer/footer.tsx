import ContentWrapper from "../wrappers/content-wrapper/contentWrapper";
import { YoutubeLogo, MetaLogo, XLogo, InstagramLogo } from "@phosphor-icons/react";
const Footer = () => {
  return (
    <footer>
      <ContentWrapper>
        <div className="container">
          <div className="top">
            <div className="left">
              <div className="logo">
                <img src="/favicon.png" alt="" />
              </div>
              <span className="desc">
                Elysian is the ultimate destination to discover the finest in
                furniture, offering an extensive range of stylish and affordable pieces to suit any
                home décor.
              </span>
              <div className="contacts">
                <h4>Follow Us</h4>
                <div className="icons">
                  <a href="">
                    {" "}
                    <YoutubeLogo />{" "}
                  </a>
                  <a href="">
                    {" "}
                    <MetaLogo />{" "}
                  </a>
                  <a href="">
                    {" "}
                    <XLogo />{" "}
                  </a>
                  <a href="">
                  <InstagramLogo /> {" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="links">
                <h4>Services</h4>
                <ul>
                  <li>Branding</li>
                  <li>Campaigns</li>
                  <li>Marketing</li>
                  <li>Ecommerce</li>
                </ul>
              </div>
              <div className="links">
                <h4>Furnitures</h4>
                <ul>
                  <a>Furnishing </a>
                  <a>Modular </a>
                  <a>Sofas</a>
                  <a>Decor</a>
                </ul>
              </div>
              <div className="links">
                <h4>Contribute</h4>
                <span>Write Article</span>
              </div>
            </div>
          </div>
          <div className="line" />
          <div className="bottom">
            <h4>Copyright © 2024 Elysian. All rights reserved</h4>
          </div>
        </div>
      </ContentWrapper>
      </footer>
  );
};

export default Footer;
