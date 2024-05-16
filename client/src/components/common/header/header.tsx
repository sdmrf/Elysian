import { Link } from "react-router-dom";

// Components
import Navbar from "../navbar/navbar";
import ContentWrapper from "../content-wrapper/contentwrapper";
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
        <li className="link">
          <Link to="/login" className="link">
            Login
          </Link>
        </li>
        <li className="link">
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
