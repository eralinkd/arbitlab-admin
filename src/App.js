import "./reset.css";
import "./global.css";

import React, { useEffect } from "react";

import AppRoutes from "./AppRoutes";
import { getSubscription } from "./api/api";
import useStore from "./state/store";

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    getSubscription().then((data) => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      if (!data) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
    });
  }, [isLoggedIn]);

  return <AppRoutes />;
}

export default App;
