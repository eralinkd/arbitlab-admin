import { Aside, Button, Header } from "../../../components";
import React, { useEffect, useState } from "react";
import {
  deleteLigament,
  getLigament,
  getSubscription,
  putLigament,
} from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../../assets/css/Info.module.css";
import useStore from "../../../state/store";

function LigamentsInfo() {
  const toastrRef = useStore((state) => state.toastrRef);
  const navigate = useNavigate();
  const { paramId } = useParams();

  const setShowToastr = useStore((state) => state.setShowToastr);

  const [ligament, setLigament] = useState({});
  const [name, setName] = useState("");
  const [distribution, setDistribution] = useState("");
  const [subscriptionLevel, setSubscriptionLevel] = useState("-");
  const [userPercent, setUserPercent] = useState("");
  const [blackPercent, setBlackPercent] = useState("");
  const [globalPercent, setGlobalPercent] = useState("");
  const [minStart, setMinStart] = useState("");
  const [maxStart, setMaxStart] = useState("");
  const [subscriptionLevels, setSubscriptionLevels] = useState([]);

  useEffect(() => {
    getLigament(paramId).then((data) => {
      setLigament(data);
      setName(data.name);
      setDistribution(data.distribution);
      setSubscriptionLevel(data.subscriptionLevel);
      setUserPercent(data.userPercent);
      setBlackPercent(data.blackPercent);
      setGlobalPercent(data.globalPercent);
      setMinStart(data.minStart);
      setMaxStart(data.maxStart);
    });
  }, [paramId]);

  const deleteHandler = () => {
    deleteLigament(paramId).then(() => {
      setShowToastr({ message: "Подписка удалена!", type: "info" });
      navigate("/ligaments");
    });
  };

  const updateLigament = () => {
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
    putLigament(paramId, params).then(() => {
      toastrRef.current.notify("Связка обновлена!", "success");
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
        <h1 className={styles.greeting}>
          {"Информация о связке: " + ligament?.name}
        </h1>

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
              onClick={() => updateLigament()}
              text={"Сохранить"}
              role={"main"}
            />

            <Button
              onClick={() => {
                deleteHandler();
              }}
              text={"Удалить"}
              role={"warning"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LigamentsInfo;
