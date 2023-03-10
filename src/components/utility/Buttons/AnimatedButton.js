import React from "react";

// Css Styles
import "./AnimatedButton.css";

const AnimatedButton = (props) => {
  return (
    <div className="animated__button">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="animi__button">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="highContrastGraphic"
            />
            <feComposite
              in="SourceGraphic"
              in2="highContrastGraphic"
              operator="atop"
            />
          </filter>
        </defs>
      </svg>

      <button id="animi__button">
        {props.caption ? props.caption : "Shop now "}
        <b>{props.children}</b>
        <span className="bubbles">
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
          <span className="bubble"></span>
        </span>
      </button>
    </div>
  );
};

export default AnimatedButton;
