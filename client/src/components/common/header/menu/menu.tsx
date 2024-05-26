// Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaretUp, CaretDown, SignIn, UserCirclePlus } from "@phosphor-icons/react";

// Components
import DarkModeBtn from "../../dark-mode-btn/darkModeBtn";

// Demo Data
const furnitureOptions = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Outdoor",
  "Office",
];

const Menu = () => {
  const [isFurnitureDropdown, setIsFurnitureDropdown] =
    useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleFurnitureClick = () => {
    setIsFurnitureDropdown(!isFurnitureDropdown);
  };

  return (
    <div className="menu">
      <div className="menuContainer">
        <ul>
          <li className="menuFurniture link" onClick={handleFurnitureClick}>
            <div className="menuFurnitureHeading">
              Furniture
              {isFurnitureDropdown ? (
                <CaretUp className="icon" />
              ) : (
                <CaretDown className="icon" />
              )}
            </div>
            {isFurnitureDropdown && (
              <div className="menuFurnitureDropDown">
                <ul>
                  {furnitureOptions.map((option, index) => (
                    <li key={index} className="link">{option}</li>
                  ))}
                </ul>
              </div>
            )}
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
        {isLogin ? (
          <div className="menuProfile">
            <Link to="/profile" className="Avatar">
                <img src="/favicon.png" alt="User Avatar" />
            </Link>
            <DarkModeBtn />
          </div>
        ) : (
          <div className="menuBtns">
            <Link to="/login">
              <button type="button" className="loginBtn">
                <SignIn className="icon" />
                Login
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="registerBtn">
                <UserCirclePlus className="icon" />
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
