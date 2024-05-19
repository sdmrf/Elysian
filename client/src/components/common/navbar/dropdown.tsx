import { useEffect } from "react";
import ReactDOM from "react-dom";

const Dropdown = ({
  isVisible,
  toggleVisibility,
}: {
  isVisible: boolean;
  toggleVisibility: (isVisible: boolean) => void;
}) => {
  const portalRoot = document.getElementById("portal-root") as Element;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdownElement = document.querySelector(".container");
      const furnitureElement = document.querySelector(".furniture");
      if (
        isVisible &&
        dropdownElement &&
        !dropdownElement.contains(event.target as Node) &&
        furnitureElement &&
        !furnitureElement.contains(event.target as Node)
      ) {
        toggleVisibility(!isVisible);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible, toggleVisibility]);

  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <section className="Dropdown">
      <div className="container">
        <div className="links">
          <h1>Furnishing</h1>
          <ul>
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Dining Room</li>
            <li>Outdoor</li>
            <li>Office</li>
          </ul>
        </div>
        <div className="line" />
        <div className="links">
          <h1>Moduler</h1>
          <ul>
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Dining Room</li>
            <li>Outdoor</li>
            <li>Office</li>
          </ul>
        </div>
        <div className="line" />
        <div className="links">
          <h1>Sofas</h1>
          <ul>
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Dining Room</li>
            <li>Outdoor</li>
            <li>Office</li>
          </ul>
        </div>
        <div className="line" />
        <div className="links">
          <h1>Decor</h1>
          <ul>
            <li>Living Room</li>
            <li>Bedroom</li>
            <li>Dining Room</li>
            <li>Outdoor</li>
            <li>Office</li>
          </ul>
        </div>
      </div>
    </section>,
    portalRoot
  );
};

export default Dropdown;
