import { Link } from "react-router-dom";
import { SignIn, UserCirclePlus } from "@phosphor-icons/react";
import { List } from "@phosphor-icons/react";
// Components
import Navbar from "../navbar/navbar";
import { useState } from "react";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <h1>Elysian</h1>
      </div>

      {/* Navbar */}

      <Navbar isMenuOpen={isMenuOpen}/>

      {/* Account */}
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
      <List className="toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} />
    </header>
  );
};

export default Header;
