import React from "react";

const Darkmode = () => {
  return (
<div className="container">
  <div className="daynight">
    <label htmlFor="checkbox">
      <input type="checkbox" id="checkbox" />
      <div className="toggle">
        <div className="cloud"></div>
        <div className="star"></div>
        <div className="sea"></div>
        <div className="mountains"></div>
      </div>
    </label>
  </div>
</div>
  );
};

export default Darkmode;
