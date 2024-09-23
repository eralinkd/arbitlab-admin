import { Aside, Button, Header } from "../../components";
import React, { useEffect, useState } from "react";
import { getAllUsers, getUserById } from "../../api/api";

import styles from "../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const toastrRef = useStore((state) => state.toastrRef);
  const [userId, setUserId] = useState("");
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
    getAllUsers().then((data) => {
      setUsers(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchById = (id) => {
    if (!id) {
      getAllUsers().then((data) => {
        setUsers(data);
      });
      return;
    }
    getUserById(id).then((data) => {
      setUsers([data]);
    });
  };

  return (
    <>
      <Header></Header>
      <Aside active={"users"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Пользователи</h1>

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
              <th>Имя</th>
              <th>Баланс</th>
              <th>Выведено</th>
              <th>Инвестировано</th>
              <th>
                Оборот <br></br> команды
              </th>
              <th>Партнеры</th>
              <th>Бан</th>
              <th>Админ</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && users.map((item) => (
              <tr key={item.id}>
                <td
                  className={styles.link}
                  onClick={() => navigate(`/users/info/${item.id}`)}
                >
                  <span className={`underline`}>{item.id || "-"}</span>
                </td>
                <td>{item.name || "-"}</td>
                <td>{item.balance || "-"}</td>
                <td>{item.withdrawalProfit || "-"}</td>
                <td>{item.invested || "-"}</td>
                <td>{item.teamInvested || "-"}</td>
                <td>
                  {item.partners.map((user) => (
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
                <td>{item.banned ? "Да" : "-"}</td>
                <td>{item.admin ? "Да" : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
