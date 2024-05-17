import { Link } from "react-router-dom";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import Dropdown from "./dropdown";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav>
      <ul className="navItems">
        <li className="furniture">
            Furniture
            <CaretDown onClick={() => setIsDropdownOpen(!isDropdownOpen)}/>
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
      {isDropdownOpen && <Dropdown />}
    </nav>
  );
};

export default Navbar;
