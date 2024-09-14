import { Aside, Button, Header } from "../../../components";
import React, { useState } from "react";

import { postPromocode } from "../../../api/api";
import styles from "../../../assets/css/Add.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../../state/store";

function LigamentsAdd() {
  const navigate = useNavigate();
  const toastrRef = useStore((state) => state.toastrRef);
  const setShowToastr = useStore((state) => state.setShowToastr);

  const [activationCount, setActivationCount] = useState("");
  const [percent, setPercent] = useState("");

  const addPromocode = () => {
    if (!activationCount || !percent) {
      toastrRef.current.notify("Все поля обязательны!", "warn");
      return;
    }
    const params = {
      activationCount: +activationCount,
      percent: +percent,
    };
    postPromocode(params).then(() => {
      setShowToastr({ message: "Промокод добавлен!", type: "success" });
      navigate("/promocodes");
    });
  };

  return (
    <>
      <Header></Header>
      <Aside active={"promocodes"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Добавить промокод</h1>

        <div className={styles.container}>
          <div className={styles.item}>
            <p>Количество активаций:</p>
            <input
              type="text"
              placeholder="Количество активаций"
              value={activationCount || ""}
              onChange={(e) => setActivationCount(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Процент:</p>
            <input
              type="text"
              placeholder="Процент"
              value={percent || ""}
              onChange={(e) => setPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => addPromocode()}
              text={"Сохранить"}
              role={"main"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LigamentsAdd;
