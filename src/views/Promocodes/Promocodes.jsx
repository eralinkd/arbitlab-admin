import { Aside, Button, Header } from "../../components";
import React, { useEffect, useState } from "react";

import { getAllPromocodes } from "../../api/api";
import styles from "../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

function Promocodes() {
  const navigate = useNavigate();
  const [promocodes, setPromocodes] = useState([]);
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
    getAllPromocodes().then((data) => {
      setPromocodes(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header></Header>
      <Aside active={"promocodes"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Промокоды</h1>

        <div className={styles.buttonContainer}>
          <Button
            role="main"
            text="Добавить промокод"
            onClick={() => navigate(`/promocodes/add/`)}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>UUID</th>
              <th>Процент</th>
              <th>Кол-во активаций</th>
              <th>
                Активаций <br></br> осталось
              </th>
              <th>Создал</th>
              <th>Пользователи</th>
            </tr>
          </thead>
          <tbody>
            {promocodes.map((promocode) => (
              <tr key={promocode.uuid}>
                <td>{promocode.uuid || "-"}</td>
                <td>{promocode.percent || "-"}</td>
                <td>{promocode.activationCount || "-"}</td>
                <td>{promocode.activationsLeft || "-"}</td>
                {promocode.createdBy === "SYSTEM" ? (
                  <td>{promocode.createdBy}</td>
                ) : (
                  <td
                    className={styles.link}
                    onClick={() => navigate(`/users/info/${promocode.createdBy}`)}
                  >
                    <span className={`underline`}>
                      {promocode.createdBy || "-"}
                    </span>
                  </td>
                )}
                <td>
                  {promocode.usersIdActivatedPromo.map((user) => (
                    <>
                      <span
                        onClick={() => navigate(`/users/info/${user}`)}
                        key={user}
                        className="underline"
                      >
                        {user}
                      </span>
                      <br></br>
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Promocodes;
