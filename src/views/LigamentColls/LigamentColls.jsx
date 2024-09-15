import { Aside, Button, Header } from "../../components";
import React, { useEffect, useState } from "react";
import {
  getAllLigamentColls,
  getLigamentCollByUserId,
  getLigamentCollCancel,
} from "../../api/api";

import styles from "../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

function LigamentColls() {
  const navigate = useNavigate();
  const [ligamentColls, setLigamentColls] = useState([]);
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
    getAllLigamentColls().then((data) => {
      setLigamentColls(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchById = (id) => {
    if (!id) {
      getAllLigamentColls().then((data) => {
        setLigamentColls(data);
      });
      return;
    }
    getLigamentCollByUserId(id).then((data) => {
      setLigamentColls(data);
    });
  };

  const cancelLigamentColl = (id) => {
    getLigamentCollCancel(id).then(() => {
      getAllLigamentColls().then((data) => {
        setLigamentColls(data);
      });
    });
  };

  return (
    <>
      <Header></Header>
      <Aside active={"ligamentColls"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Круги связок</h1>

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
              <th>Название</th>
              <th>ID связки</th>
              <th>ID пользователя</th>
              <th>Вложения</th>
              <th>Дней инвестирования</th>
              <th>Выполнено</th>
            </tr>
          </thead>
          <tbody>
            {ligamentColls.map((coll) => (
              <tr key={coll.id}>
                <td>{coll.id || "-"}</td>
                <td>{coll.name || "-"}</td>
                <td
                  className={styles.link}
                  onClick={() => navigate(`/ligaments/info/${coll.ligamentId}`)}
                >
                  <span className={`underline`}>{coll.ligamentId || "-"}</span>
                </td>
                <td
                  className={styles.link}
                  onClick={() => navigate(`/users/info/${coll.usedId}`)}
                >
                  <span className={`underline`}>{coll.usedId || "-"}</span>
                </td>
                <td>{coll.amount || "-"}</td>
                <td>{coll.daysOfInvest || "-"}</td>
                <td>
                  {coll.done ? (
                    "✅"
                  ) : (
                    <Button
                      role={"main"}
                      text="Завершить"
                      onClick={() => cancelLigamentColl(coll.id)}
                    ></Button>
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

export default LigamentColls;
