// Imports
import "./_styles.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="navItems">
        <li className="Link">
          <Link to="/furniture">Furniture</Link>
        </li>
        <li className="Link">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="Link">
          <Link to="/about">About Us</Link>
        </li>
        <li className="Link">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
