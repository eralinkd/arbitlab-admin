import { Aside, Button, Header } from "../../../components";
import React, { useEffect, useState } from "react";
import {
  getUserById,
  postUserAppointAdminByTg,
  postUserBanUser,
  postUserBanUserStructure,
  postUserRemoveAdmin,
  postUserReplenishBalance,
  postUserTranferBalance,
  postUserWithdrawBalance,
} from "../../../api/api";

import styles from "../../../assets/css/Info.module.css";
import { useParams } from "react-router-dom";
import useStore from "../../../state/store";

function UserInfo() {
  const toastrRef = useStore((state) => state.toastrRef);
  const { paramId } = useParams();

  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [balance, setUserBalance] = useState("");
  const [withdrawalProfit, setWithdrawalProfit] = useState("");
  const [invested, setInvested] = useState("");
  const [teamInvested, setTeamInvested] = useState("");
  const [partners, setPartners] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [wAmount, setWAmount] = useState("");
  const [tAmount, setTAmount] = useState("");
  const [tTarget, setTTarget] = useState("");
  const [rAmount, setRAmount] = useState("");

  useEffect(() => {
    getUserById(paramId).then((data) => {
      setUser(data);
      setUserId(data.id);
      setUserName(data.name);
      setUserBalance(data.balance);
      setWithdrawalProfit(data.withdrawalProfit);
      setInvested(data.invested);
      setTeamInvested(data.teamInvested);
      setPartners(data.partners);

      setRefresh(false);
    });
  }, [paramId, refresh]);

  const banUser = (userId, banned) => {
    postUserBanUser(userId, !banned).then(() => {
      const message = banned
        ? "Пользователь разбанен!"
        : "Пользователь забанен!";
      toastrRef.current.notify(message, "info");
      setRefresh(true);
    });
  };

  const banStructure = (userId, banned) => {
    postUserBanUserStructure(userId, !banned).then(() => {
      const message = banned ? "Структура разбанена!" : "Структура забанена!";
      toastrRef.current.notify(message, "info");
      setRefresh(true);
    });
  };

  const removeAdmin = (userId, admin) => {
    if (admin) {
      postUserRemoveAdmin(userId).then(() => {
        toastrRef.current.notify("Администратор удален!", "info");
        setRefresh(true);
      });
    } else {
      postUserAppointAdminByTg(userId).then(() => {
        toastrRef.current.notify("Администратор добавлен!", "info");
        setRefresh(true);
      });
    }
  };

  const withdrawBalance = (amount, userId) => {
    postUserWithdrawBalance(userId, amount).then(() => {
      toastrRef.current.notify("Баланс снят!", "info");
      setRefresh(true);
    });
  };

  const transferBalance = (amount, target, userId) => {
    postUserTranferBalance(userId, amount, target).then(() => {
      toastrRef.current.notify("Баланс переведен!", "info");
      setRefresh(true);
    });
  };

  const replenishBalance = (amount, userId) => {
    postUserReplenishBalance(userId, amount).then(() => {
      toastrRef.current.notify("Баланс пополнен!", "info");
      setRefresh(true);
    });
  };

  return (
    <>
      <Header></Header>
      <Aside active={"users"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>
          {"Информация о пользователе: " + user?.name}
        </h1>

        <div className={styles.container}>
          <div className={styles.item}>
            <p>ID:</p>
            <input
              type="text"
              placeholder="ID"
              value={userId || ""}
              readOnly
            ></input>
          </div>

          <div className={styles.item}>
            <p>Имя:</p>
            <input
              type="text"
              placeholder="Имя"
              value={userName || ""}
              readOnly
            ></input>
          </div>

          <div className={styles.item}>
            <p>Баланс:</p>
            <input
              type="text"
              placeholder="Баланс"
              value={balance || ""}
              readOnly
            ></input>
          </div>

          <div className={styles.item}>
            <p>Инвестировано:</p>
            <input
              type="text"
              placeholder="Инвестировано"
              value={invested || ""}
              readOnly
            ></input>
          </div>

          <div className={styles.item}>
            <p>Выведено:</p>
            <input
              type="text"
              placeholder="Выведено"
              value={withdrawalProfit || ""}
              readOnly
            ></input>
          </div>

          <div className={styles.item}>
            <p>Оборот команды:</p>
            <input
              type="text"
              placeholder="Оборот команды"
              value={teamInvested || ""}
              readOnly
            ></input>
          </div>

          <div className={styles.item}>
            <p>Партнеры:</p>
            <textarea
              type="text"
              placeholder="Партнеры"
              value={partners?.length > 0 ? partners.join("\n") : ""}
              readOnly
            ></textarea>
          </div>

          <div className={styles.searchContainer}>
            <p>Сумма:</p>
            <input
              type="text"
              placeholder="Сумма"
              value={wAmount}
              onChange={(e) => setWAmount(e.target.value)}
            ></input>
            <Button
              role="main"
              text="Вывести"
              onClick={() => withdrawBalance(wAmount, userId)}
            />
          </div>

          <div className={styles.searchContainer}>
            <div className={`${styles.transfer} flex column`}>
              <div>
                <p>Сумма:</p>
                <input
                  type="text"
                  placeholder="Сумма"
                  value={tAmount}
                  onChange={(e) => setTAmount(e.target.value)}
                ></input>
              </div>
              <div>
                <p>Кому:</p>
                <input
                  type="text"
                  placeholder="ID"
                  value={tTarget}
                  onChange={(e) => setTTarget(e.target.value)}
                ></input>
              </div>
            </div>
            <Button
              role="main"
              text="Перевести"
              onClick={() => transferBalance(wAmount, tTarget, userId)}
            />
          </div>

          <div className={`${styles.searchContainer} ${styles.last}`}>
            <p>Сумма:</p>
            <input
              type="text"
              placeholder="Сумма"
              value={rAmount}
              onChange={(e) => setRAmount(e.target.value)}
            ></input>
            <Button
              role="main"
              text="Внести"
              onClick={() => replenishBalance(rAmount, userId)}
            />
          </div>

          <div className={`${styles.buttonsContainer}`}>
            <Button
              onClick={() => {
                removeAdmin(userId, user.admin);
              }}
              text={!user.admin ? "Сделать админом" : "Удалить админа"}
              role={!user.admin ? "main" : "warning"}
            />

            <Button
              onClick={() => {
                banUser(userId, user.banned);
              }}
              text={user.banned ? "Разбанить" : "Забанить"}
              role={"warning"}
            />

            <Button
              onClick={() => {
                banStructure(userId, true);
              }}
              text={"Забанить структуру"}
              role={"warning"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
