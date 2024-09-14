import { Aside, Button, Header } from "../../components";
import React, { useEffect, useState } from "react";

import { getSubscription } from "../../api/api";
import styles from "../../assets/css/View.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

function Subscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const toastrRef = useStore((state) => state.toastrRef);
  const [showToastr, setShowToastr] = [
    useStore((state) => state.showToastr),
    useStore((state) => state.setShowToastr),
  ];
  const subscriptionsNames = useStore((state) => state.subscriptionsNames);
  const setSubscriptionsNames = useStore(
    (state) => state.setSubscriptionsNames
  );

  useEffect(() => {
    if (showToastr.type) {
      toastrRef.current.notify(showToastr.message, showToastr.type);
      setShowToastr({});
    }
  });

  useEffect(() => {
    getSubscription().then((data) => {
      setSubscriptions(data);
      setSubscriptionsNames(getSubscriptionsNames(data));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSubscriptionsNames = (subscriptions) => {
    return subscriptions.reduce((acc, subscription) => {
      acc[subscription.name] = subscription.level;
      return acc;
    }, {});
  };

  const getSubscriptionNameByLevel = (level) => {
    return Object.keys(subscriptionsNames).find(
      (key) => subscriptionsNames[key] === +level
    );
  };

  return (
    <>
      <Header></Header>
      <Aside active={"subscriptions"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Подписки</h1>

        <div className={styles.buttonContainer}>
          <Button
            role="main"
            text="Добавить подписку"
            onClick={() => navigate(`/subscriptions/add/`)}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Уровень</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Промо в <br></br>неделю</th>
              <th>Мин процент <br></br>промокода</th>
              <th>Макс процент <br></br>промокода</th>
              <th>Цена</th>
              <th>Скидки</th>
              <th>Реф <br></br>процент</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.level}>
                <td>{subscription.level || "-"}</td>
                <td
                  className={styles.link}
                  onClick={() =>
                    navigate(`/subscriptions/info/${subscription.level}`)
                  }
                >
                  <span className={`underline`}>
                    {subscription.name || "-"}
                  </span>
                </td>
                <td>{subscription.description || "-"}</td>
                <td>{subscription.promoPerWeek || "-"}</td>
                <td>{subscription.minPromoPercent || "-"}</td>
                <td>{subscription.maxPromoPercent || "-"}</td>
                <td>{subscription.price || "-"}</td>
                <td className={styles.discountMap}>
                  {subscription.discountMap &&
                  Object.keys(subscription.discountMap).length > 0
                    ? Object.keys(subscription.discountMap).map((key) => {
                        return (
                          <p key={key}>
                            {getSubscriptionNameByLevel(key)}:{" "}
                            <span>{subscription.discountMap[key]}</span>
                          </p>
                        );
                      })
                    : "-"}
                </td>
                <td>{subscription.refPercent || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Subscriptions;
