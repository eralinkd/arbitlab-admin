import { Aside, Header } from "../../components";

import React from "react";
import styles from "./MainPage.module.css";
import useStore from "../../state/store";

function MainPage() {
  const welcomeData = useStore((state) => state.welcomeData);

  return (
    <>
      <Header></Header>
      <Aside></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Здарова, {welcomeData}</h1>
      </div>
    </>
  );
}

export default MainPage;
