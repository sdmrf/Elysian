// Imports
import { Link } from "react-router-dom";
import { SignIn, UserCirclePlus, List } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import Darkmode from "../darkmode/darkmode";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState(true);

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
    <header className={isScrolled ? "header scrolled" : "header"}>
      {/* Logo */}
      <div className="logo">
        <h1>Elysian</h1>
      </div>

      {/* Navbar */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Account */}
      {isLogin ? (
        <div className="profile">
          <Darkmode />
          <Link to="/profile">
            <div className="avatar">
              <img src="/favicon.png" alt="User Avatar" />
            </div>
          </Link>
        </div>
      ) : (
        <div className="buttons">
          <Link to="/login">
            <button type="button" className="btn1">
              <SignIn className="icon" />
              Login
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="btn2">
              <UserCirclePlus className="icon" />
              Register
            </button>
          </Link>
        </div>
      )}
      <List className="toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} />
    </header>
  );
};

export default Header;
