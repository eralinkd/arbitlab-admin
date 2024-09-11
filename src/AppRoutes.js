import { Login, MainPage } from "./views";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import React, { useEffect, useRef } from "react";

import { Toastr } from "./components";
import { setupAxiosInterceptors } from "./api/api";
import useStore from "./state/store";

function AppRoutes() {
  const toastrRef = useRef();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setToastrRef = useStore((state) => state.setToastrRef);

  useEffect(() => {
    setToastrRef(toastrRef);
  }, [setToastrRef]);

  useEffect(() => {
    if (toastrRef) {
      setupAxiosInterceptors(toastrRef);
    }
  }, [toastrRef]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/main" /> : <Login />}
          />
          <Route
            path="/main"
            element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
          />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        <Toastr ref={toastrRef} />
      </div>
    </Router>
  );
}

export default AppRoutes;
