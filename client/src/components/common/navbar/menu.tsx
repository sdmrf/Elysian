import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaretDown, SignIn, UserCirclePlus } from "@phosphor-icons/react";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section className="Menu">
      <div className="container">
        <ul>
          <li className="furniture" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Furniture
            <CaretDown />
          </li>
          <li className="link">
            <Link to="/shop" className="link">
              Shop
            </Link>
          </li>
          <li className="link">
            <Link to="/about" className="link">
              About Us
            </Link>
          </li>
          <li className="link">
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
        </ul>
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
      </div>
    </section>
  );
};

export default Menu;
