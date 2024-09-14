import { Aside, Button, Header } from "../../components";
import React, { useEffect, useState } from "react";

import { getAllLigaments } from "../../api/api";
import styles from "../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

function Ligaments() {
  const navigate = useNavigate();
  const [ligaments, setLigaments] = useState([]);
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
    getAllLigaments().then((data) => {
      setLigaments(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header></Header>
      <Aside active={"ligaments"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Связки</h1>

        <div className={styles.buttonContainer}>
          <Button
            role="main"
            text="Добавить связку"
            onClick={() => navigate(`/ligaments/add/`)}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Распределение</th>
              <th>Уровень подписки</th>
              <th>Процент пользователя</th>
              <th>Черный процент</th>
              <th>Глобальный процент</th>
              <th>Мин начало</th>
              <th>Макс начало</th>
            </tr>
          </thead>
          <tbody>
            {ligaments.map((ligament) => (
              <tr key={ligament.id}>
                <td>{ligament.id || "-"}</td>
                <td
                  className={styles.link}
                  onClick={() =>
                    navigate(`/ligaments/info/${ligament.id}`)
                  }
                >
                  <span className={`underline`}>
                    {ligament.name || "-"}
                  </span>
                </td>
                <td>{ligament.distribution || "-"}</td>
                <td>{ligament.subscriptionLevel === -1 ? "-" : ligament.subscriptionLevel || "-"}</td>
                <td>{ligament.userPercent || "-"}</td>
                <td>{ligament.blackPercent || "-"}</td>
                <td>{ligament.globalPercent || "-"}</td>
                <td>{ligament.minStart || "-"}</td>
                <td>{ligament.maxStart || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Ligaments;
