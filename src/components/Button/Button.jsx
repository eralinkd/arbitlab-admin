import "./Button.css";

import React from "react";

function Button({ onClick, text, role, propClass, link }) {
  const classes = {
    main: "UIMainButton",
    warning: "UIMainButtonWarning",
    mainWhite: "UIMainButtonWhite",
    white: "UIButtonWhite",
  };
  const styleClass = classes[role] || "UIMainButton";
  
  return (
    <a href={link || "#"} className={`UIButton ${styleClass} ${propClass}`} onClick={onClick}>
      {text}
    </a>
  );
}

export default Button;
