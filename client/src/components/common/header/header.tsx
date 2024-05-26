// Imports
import { Link } from "react-router-dom";
import { SignIn, UserCirclePlus, List, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

// Components
import Navbar from "./navbar/navbar";
import Menu from "./menu/menu";
import DarkModeBtn from "../dark-mode-btn/darkModeBtn";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY !== 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menuOpen" : ""}`}>
      <div className="headerContainer">
        <div className="headerLogo">
          <img src="/logo-light.png" alt="Elysian Logo" />
        </div>
        <Navbar />
        {isLogin ? (
          <div className="headerProfile">
            <DarkModeBtn />
            <Link to="/profile">
              <div className="profileAvatar">
                <img src="/favicon.png" alt="User Avatar" />
              </div>
            </Link>
          </div>
        ) : (
          <div className="headerBtns">
            <Link to="/login">
              <button type="button" className="loginBtn">
                <SignIn className="icon" />
                Login
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="signupBtn">
                <UserCirclePlus className="icon" />
                Register
              </button>
            </Link>
          </div>
        )}
        <button
          type="button"
          className="menuBtn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="icon" weight="bold" />
          ) : (
            <List className="icon" weight="bold" />
          )}
        </button>
      </div>
      {isMenuOpen && <Menu />}
    </header>
  );
};

export default Header;
