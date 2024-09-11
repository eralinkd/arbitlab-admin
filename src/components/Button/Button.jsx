import "./Button.css";

import React from "react";

function Button({ onClick, text }) {
  return (
    <div className="UIbutton" onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
