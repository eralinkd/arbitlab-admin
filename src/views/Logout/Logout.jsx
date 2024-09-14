import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";
import useStore from "../../state/store";

function Logout() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwtToken");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return <></>;
}

export default Logout;
