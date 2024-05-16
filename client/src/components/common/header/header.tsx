// Imports
import "./_styles.scss";
import { Link } from "react-router-dom";

// Components
import Navbar from "../navbar/navbar";

const Header = () => {
  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <h1>Elysian</h1>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Account */}
      <ul className="account">
        <li className="Link">
          <Link to="/login">Login</Link>
        </li>
        <li className="Link">
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
