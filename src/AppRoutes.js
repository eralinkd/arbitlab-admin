import {
  LigamentColls,
  Ligaments,
  LigamentsAdd,
  LigamentsInfo,
  Login,
  Logout,
  MainPage,
  Promocodes,
  PromocodesAdd,
  Replenishments,
  Subscriptions,
  SubscriptionsAdd,
  SubscriptionsInfo,
  Transfers,
  Users,
  UsersInfo,
  Withdraws,
} from "./views";
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
          <Route path="/logout" element={<Logout />} />
          {/* <Route
            path="/main"
            element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/main"
            element={<MainPage />}
          />

          <Route
            path="/transfers"
            element={isLoggedIn ? <Transfers /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={isLoggedIn ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/withdraws"
            element={isLoggedIn ? <Withdraws /> : <Navigate to="/login" />}
          />
          <Route
            path="/replenishments"
            element={isLoggedIn ? <Replenishments /> : <Navigate to="/login" />}
          />
          <Route
            path="/ligamentColls"
            element={isLoggedIn ? <LigamentColls /> : <Navigate to="/login" />}
          />
          <Route
            path="/ligaments"
            element={isLoggedIn ? <Ligaments /> : <Navigate to="/login" />}
          />
          <Route
            path="/subscriptions"
            element={isLoggedIn ? <Subscriptions /> : <Navigate to="/login" />}
          />
          <Route
            path="/promocodes"
            element={isLoggedIn ? <Promocodes /> : <Navigate to="/login" />}
          />

          <Route
            path="/subscriptions/add/"
            element={<SubscriptionsAdd />}
          ></Route>
          <Route
            path="/subscriptions/info/:paramLevel"
            element={<SubscriptionsInfo />}
          ></Route>
          <Route path="/ligaments/add/" element={<LigamentsAdd />}></Route>
          <Route
            path="/ligaments/info/:paramId"
            element={<LigamentsInfo />}
          ></Route>
          <Route path="/promocodes/add/" element={<PromocodesAdd />}></Route>
          <Route
            path="/users/info/:paramId"
            element={<UsersInfo />}
          ></Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        <Toastr ref={toastrRef} />
      </div>
    </Router>
  );
}

export default AppRoutes;
