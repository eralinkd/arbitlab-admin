import { Aside, Button, Header } from "../../../components";
import React, { useEffect, useState } from "react";
import { getSubscription, postLigament } from "../../../api/api";

import styles from "../../../assets/css/Add.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../../state/store";

function LigamentsAdd() {
  const navigate = useNavigate();
  const toastrRef = useStore((state) => state.toastrRef);
  const setShowToastr = useStore((state) => state.setShowToastr);

  const [name, setName] = useState("");
  const [distribution, setDistribution] = useState("");
  const [subscriptionLevel, setSubscriptionLevel] = useState("-");
  const [userPercent, setUserPercent] = useState("");
  const [blackPercent, setBlackPercent] = useState("");
  const [globalPercent, setGlobalPercent] = useState("");
  const [minStart, setMinStart] = useState("");
  const [maxStart, setMaxStart] = useState("");
  const [subscriptionLevels, setSubscriptionLevels] = useState([]);

  const addLigament = () => {
    if (
      !name ||
      !distribution ||
      !userPercent ||
      !blackPercent ||
      !globalPercent ||
      !minStart ||
      !maxStart
    ) {
      toastrRef.current.notify("Все поля обязательны!", "warn");
      return;
    }
    const params = {
      name: name,
      distribution: distribution,
      userPercent: +userPercent,
      blackPercent: +blackPercent,
      globalPercent: +globalPercent,
      minStart: +minStart,
      maxStart: +maxStart,
    };

    if (subscriptionLevel !== "-") {
      params.subscriptionLevel = +subscriptionLevel;
    }
    postLigament(params).then(() => {
      setShowToastr({ message: "Связка добавлена!", type: "success" });
      navigate("/ligaments");
    });
  };

  useEffect(() => {
    getSubscription().then((data) => {
      setSubscriptionLevels(getSubscriptionLevels(data));
    });
  }, []);

  const getSubscriptionLevels = (subscriptions) => {
    const levels = subscriptions.map((subscription) => subscription.level);
    return [...new Set(levels)];
  };

  return (
    <>
      <Header></Header>
      <Aside active={"ligaments"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Добавить связку</h1>

        <div className={styles.container}>
          <div className={styles.item}>
            <p>Название:</p>
            <input
              type="text"
              placeholder="Название"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Распределение:</p>
            <input
              type="text"
              placeholder="Распределение"
              value={distribution || ""}
              onChange={(e) => setDistribution(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Уровень подписки:</p>
            <select
              value={subscriptionLevel || "-"}
              onChange={(e) => setSubscriptionLevel(e.target.value)}
            >
              <option value="-">-</option>
              {subscriptionLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.item}>
            <p>Процент пользователя:</p>
            <input
              type="text"
              placeholder="Процент пользователя"
              value={userPercent || ""}
              onChange={(e) => setUserPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Черный процент:</p>
            <input
              type="text"
              placeholder="Черный процент"
              value={blackPercent || ""}
              onChange={(e) => setBlackPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Глобальный процент:</p>
            <input
              type="text"
              placeholder="Глобальный процент"
              value={globalPercent || ""}
              onChange={(e) => setGlobalPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Мин начало:</p>
            <input
              type="text"
              placeholder="Мин начало"
              value={minStart || ""}
              onChange={(e) => setMinStart(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Макс начало:</p>
            <input
              type="text"
              placeholder="Макс начало"
              value={maxStart || ""}
              onChange={(e) => setMaxStart(e.target.value)}
            ></input>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => addLigament()}
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
