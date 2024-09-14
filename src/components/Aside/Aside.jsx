import "./Aside.css";

import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import useStore from "../../state/store";

function Aside({ active }) {
  const welcomeData = useStore((state) => state.welcomeData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <aside className="UIAside">
        <ul className={`nav-additional`}>
          <li className={active === "transfers" ? "active" : ""}>
            <Link to="/transfers">Переводы</Link>
          </li>
          <li className={active === "users" ? "active" : ""}>
            <Link to="/users">Пользователи</Link>
          </li>
          <li className={active === "withdraws" ? "active" : ""}>
            <Link to="/withdraws">Выводы</Link>
          </li>
          <li className={active === "replenishments" ? "active" : ""}>
            <Link to="/replenishments">Пополнения</Link>
          </li>
          <li className={active === "ligamentColls" ? "active" : ""}>
            <Link to="/ligamentColls">Круги связок</Link>
          </li>
          <li className={active === "ligaments" ? "active" : ""}>
            <Link to="/ligaments">Связки</Link>
          </li>
          <li className={active === "subscriptions" ? "active" : ""}>
            <Link to="/subscriptions">Подписки</Link>
          </li>
          <li className={active === "promocodes" ? "active" : ""}>
            <Link to="/promocodes">Промокоды</Link>
          </li>
          
        </ul>

        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">A</div>
          <div className="info">
            {/* <p className="company">{welcomeData.company}</p> */}
            <p className="email">{welcomeData}</p>
          </div>
        </div>

        {dropdownOpen && (
          <div className="dropdown" ref={dropdownRef}>
            <div className="profile">
              <div className="avatar">A</div>
              <div className="info">
                {/* <p className="company">{welcomeData.company}</p> */}
                <p className="email">{welcomeData}</p>
              </div>
            </div>

            <div className="logout">
              <Link to="/logout">Выход</Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default Aside;
