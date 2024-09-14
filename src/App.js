import "./reset.css";
import "./global.css";

import React, { useEffect } from "react";

import AppRoutes from "./AppRoutes";
import { getAllLigaments } from "./api/api";
import useStore from "./state/store";

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setwelcomeData = useStore((state) => state.setwelcomeData);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    getAllLigaments().then((data) => {
      if (!data || data.status === 500) {
        setIsLoggedIn(false);
        localStorage.removeItem("jwtToken");
        return;
      }

      setIsLoggedIn(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return <AppRoutes />;
}

export default App;
