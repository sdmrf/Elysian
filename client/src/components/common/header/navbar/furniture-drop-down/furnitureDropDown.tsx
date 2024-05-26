// Imports
import { useEffect } from "react";

// Interfaces
interface DropdownSectionProps {
  title: string;
  items: string[];
}

interface FurnitureDropDownProps {
  isVisible: boolean;
  toggleIsVisible: (isVisible: boolean) => void;
}

// Demo Data
const titles = ["Sofas", "Modular", "Decor", "Funishing"];
const items = [
  ["Sofas", "Sectionals", "Sleeper Sofas", "Loveseats", "Chaise Lounges"],
  ["Beds", "Dressers", "Nightstands", "Armoires", "Mattresses"],
  ["Dining Tables", "Dining Chairs", "Barstools", "Buffets", "China Cabinets"],
  ["Desks", "Office Chairs", "Bookcases", "File Cabinets", "Shelving"],
];

const DropdownSection = ({ title, items }: DropdownSectionProps) => (
  <div className="links">
    <div className="linksContent">
      <h1>{title}</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="link">
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="line" />
  </div>
);

const FurnitureDropDown = ({
  isVisible,
  toggleIsVisible,
}: FurnitureDropDownProps) => {
  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(".furnitureDropDown");
      const furnitureElement = document.querySelector(".furniture");
      if (
        isVisible &&
        dropdownElement &&
        !dropdownElement.contains(event.target as Node) &&
        furnitureElement &&
        !furnitureElement.contains(event.target as Node)
      ) {
        toggleIsVisible(!isVisible);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible, toggleIsVisible]);

  // If the dropdown is not visible, return null
  if (!isVisible) {
    return null;
  }

  return (
    <div className="furnitureDropDown">
      <div className="dropDownContainer">
        {titles.map((title, index) => (
          <DropdownSection key={index} title={title} items={items[index]} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureDropDown;
