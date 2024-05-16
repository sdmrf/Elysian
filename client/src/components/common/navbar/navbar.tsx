import { Link } from "react-router-dom";
import { CaretDown } from "@phosphor-icons/react";

const Navbar = () => {
  return (
    <nav>
      <ul className="navItems">
        <li className="link">
          <Link to="/furniture" className="link furniture">
            Furniture
            <CaretDown />
          </Link>
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
    </nav>
  );
};

export default Navbar;
