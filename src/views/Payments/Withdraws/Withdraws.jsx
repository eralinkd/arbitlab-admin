import { Aside, Button, Header } from "../../../components";
import React, { useEffect, useState } from "react";
import {
  getAllWithdraws,
  getAllWithdrawsByUserId,
  putPaymentConfirm,
  putWithdrawCancel,
} from "../../../api/api";

import styles from "../../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../../state/store";

function Withdraws() {
  const navigate = useNavigate();
  const [withdraws, setWithdraws] = useState([]);
  const [userId, setUserId] = useState("");
  const toastrRef = useStore((state) => state.toastrRef);
  const [showToastr, setShowToastr] = [
    useStore((state) => state.showToastr),
    useStore((state) => state.setShowToastr),
  ];

  useEffect(() => {
    if (showToastr.type) {
      toastrRef.current.notify(showToastr.message, showToastr.type);
      setShowToastr({});
    }
  });

  useEffect(() => {
    getAllWithdraws().then((data) => {
      setWithdraws(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchById = (id) => {
    if (!id) {
      getAllWithdraws().then((data) => {
        setWithdraws(data);
      });
      return;
    }
    getAllWithdrawsByUserId(id).then((data) => {
      setWithdraws(data);
    });
  };

  const confirmReplenishment = (id) => {
    putPaymentConfirm(id).then(() => {
      getAllWithdraws().then((data) => {
        setWithdraws(data);
      });
    });
  };

  const cancelWithdraw = (id) => {
    putWithdrawCancel(id).then(() => {
      getAllWithdraws().then((data) => {
        setWithdraws(data);
      });
    });
  };

  return (
    <>
      <Header></Header>
      <Aside active={"withdraws"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Выводы</h1>

        <div className={styles.searchContainer}>
          <p>ID пользователя:</p>
          <input
            type="text"
            placeholder="ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          ></input>
          <Button role="main" text="Найти" onClick={() => searchById(userId)} />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Количество</th>
              <th>Получатель</th>
              <th>Источник</th>
              <th>Метод</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {withdraws.map((item) => (
              <tr key={item.paymentId}>
                <td>{item.paymentId || "-"}</td>
                <td>{item.amount || "-"}</td>
                <td
                  className={styles.link}
                  onClick={() => navigate(`/users/info/${item.targetId}`)}
                >
                  <span className={`underline`}>{item.targetId || "-"}</span>
                </td>
                <td>{item.source || "-"}</td>
                <td>{item.paymentType || "-"}</td>
                <td>
                  {item.confirmed ? (
                    "✅"
                  ) : item.cancelled ? (
                    "❌"
                  ) : (
                    <div className={styles.status}>
                      <Button
                        role={"main"}
                        text="Подтвердить"
                        onClick={() => confirmReplenishment(item.paymentId)}
                      ></Button>

                      <Button
                        role={"warning"}
                        text="отменить"
                        onClick={() => cancelWithdraw(item.paymentId)}
                      ></Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Withdraws;
