import { Aside, Button, Header } from "../../components";
import React, { useEffect, useState } from "react";
import { getAllTransfers, getAllTransfersByUserId, putTransferCancel } from "../../api/api";

import styles from "../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

function Transfers() {
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);
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
    getAllTransfers().then((data) => {
      setTransfers(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchById = (id) => {
    if (!id) {
      getAllTransfers().then((data) => {
        setTransfers(data);
      });
      return
    }
    getAllTransfersByUserId(id).then((data) => {
      setTransfers(data);
    });
  };

  const cancelTransfer = (id) => {
    putTransferCancel(id).then(() => {
      getAllTransfers().then((data) => {
        setTransfers(data);
      });
    })
  };

  return (
    <>
      <Header></Header>
      <Aside active={"transfers"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Переводы</h1>

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
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer) => (
              <tr key={transfer.paymentId}>
                <td>{transfer.paymentId || "-"}</td>
                <td>{transfer.amount || "-"}</td>
                <td
                  className={styles.link}
                  onClick={() => navigate(`/users/info/${transfer.targetId}`)}
                >
                  <span className={`underline`}>
                    {transfer.targetId || "-"}
                  </span>
                </td>
                <td
                  className={styles.link}
                  onClick={() => navigate(`/users/info/${transfer.source}`)}
                >
                  <span className={`underline`}>{transfer.source || "-"}</span>
                </td>
                <td>{transfer.cancelled ? "❌" : 
                    <Button
                    role={"warning"}
                    text="Отменить"
                    onClick={() => cancelTransfer(transfer.paymentId)}></Button>
                  }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transfers;
