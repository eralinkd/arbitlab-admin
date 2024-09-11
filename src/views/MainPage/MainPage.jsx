import React, { useEffect } from "react";

import { getSubscription } from "../../api/api";
import styles from "./MainPage.module.css";

function MainPage() {

    useEffect(() => {
        getSubscription().then((data) => {
            console.log(data);
        });
    }, []);
    
  return (
    <div className="MainPage">
      <h1>Main Page</h1>
    </div>
  );
}

export default MainPage;
