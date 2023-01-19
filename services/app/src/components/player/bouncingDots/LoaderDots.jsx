import React from "react";
import "../bouncingDots/styles.css";

const BouncingDotsLoader = (props) => {
  return (
    <>
      <div className="bouncing-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
