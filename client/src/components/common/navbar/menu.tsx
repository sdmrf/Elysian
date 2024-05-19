import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { CaretDown, SignIn, UserCirclePlus } from "@phosphor-icons/react";

const Menu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) => {
  
  const [isDropdown, setIsDropdown] = useState(false);

    useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const menuElement = document.querySelector(".Menu");
      const toggleElement = document.querySelector(".toggle");
      if (
        isMenuOpen &&
        menuElement &&
        !menuElement.contains(event.target as Node) &&
        toggleElement &&
        !toggleElement.contains(event.target as Node)
      ) {
        setIsMenuOpen(!isMenuOpen);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  if (!isMenuOpen) {
    return null;
  }

  const portalRoot = document.getElementById("portal-root") as Element;

  return ReactDOM.createPortal(
    <section className="Menu">
      <div className="container">
        <ul>
          <li className="furniture" onClick={() => setIsDropdown(!isDropdown)} >
            Furniture
            <CaretDown />
            {isDropdown && 
                <div className="dropdown-menu">
                  <ul>
                    <li>Living Room</li>
                    <li>Bedroom</li>
                    <li>Dining Room</li>
                    <li>Outdoor</li>
                    <li>Office</li>
                  </ul>
                </div>
            }
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
    </section>,
    portalRoot
  );
};

export default Menu;
