import "./Header.css";

import { Button } from "../../components";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../../assets/img/white-logo.svg";

function Header() {
  return (
    <>
      <header className="UIHeader">
        <Link to="/main">
          <img src={logo} alt="logo" className="logo"></img>
        </Link>
        <div className="buttons">
          <Button
            text="Поддержка"
            role="mainWhite"
            link={"https://t.me/sb_newest"}
          />
        </div>
      </header>
      <div className="UIHeaderPadding"></div>
    </>
  );
}

export default Header;
