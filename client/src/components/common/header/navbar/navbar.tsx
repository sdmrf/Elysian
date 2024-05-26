// Imports
import { Link } from "react-router-dom";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { useState } from "react";

// Components
import FurnitureDropDown from "./furniture-drop-down/furnitureDropDown";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav>
      <ul className="navItems">
        <li className="furniture navItem link" onClick={toggleDropdown}>
          Furniture
          {isDropdownOpen ? (
            <CaretUp className="icon" />
          ) : (
            <CaretDown className="icon" />
          )}
        </li>
        <li className="navItem link">
          <Link to="/shop" className="link">
            Shop
          </Link>
        </li>
        <li className="navItem link">
          <Link to="/about" className="link">
            About Us
          </Link>
        </li>
        <li className="navItem link">
          <Link to="/contact" className="link">
            Contact
          </Link>
        </li>
      </ul>
      {isDropdownOpen && (
        <FurnitureDropDown
          isVisible={isDropdownOpen}
          toggleIsVisible={setIsDropdownOpen}
        />
      )}
    </nav>
  );
};

export default Navbar;
