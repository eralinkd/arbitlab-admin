import { Aside, Button, Header } from "../../../components";
import React, { useEffect, useState } from "react";
import { getSubscription, postSubscription } from "../../../api/api";

import styles from "../../../assets/css/Add.module.css";
import { useNavigate } from "react-router-dom";
import useStore from "../../../state/store";

function SubscriptionsAdd() {
  const navigate = useNavigate();
  const toastrRef = useStore((state) => state.toastrRef);
  const setShowToastr = useStore((state) => state.setShowToastr);
  const subscriptionsNames = useStore((state) => state.subscriptionsNames);
  const setSubscriptionsNames = useStore(
    (state) => state.setSubscriptionsNames
  );

  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [promoPerWeek, setPromoPerWeek] = useState("");
  const [minPromoPercent, setMinPromoPercent] = useState("");
  const [maxPromoPercent, setMaxPromoPercent] = useState("");
  const [price, setPrice] = useState("");
  const [refPercent, setRefPercent] = useState("");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [discountValues, setDiscountValues] = useState([]);

  const addSubscription = () => {
    if (
      !level ||
      !name ||
      !description ||
      !promoPerWeek ||
      !minPromoPercent ||
      !maxPromoPercent ||
      !price ||
      !refPercent
    ) {
      toastrRef.current.notify("Все поля обязательны!", "warn");
      return;
    }
    const params = {
      level: +level,
      name: name,
      description: description,
      promoPerWeek: +promoPerWeek,
      minPromoPercent: +minPromoPercent,
      maxPromoPercent: +maxPromoPercent,
      price: +price,
      discountMap: selectedSubscriptions.reduce((acc, subscription, i) => {
        if (discountValues[i] !== "") {
          acc[subscription] = discountValues[i];
        }
        return acc;
      }, {}),
      refPercent: +refPercent,
    };
    postSubscription(params).then(() => {
      setShowToastr({ message: "Подписка добавлена!", type: "success" });
      navigate("/subscriptions");
    });
  };

  useEffect(() => {
    getSubscription().then((data) => {
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

  const addDiscount = () => {
    setDiscountValues([...discountValues, ""]);
    setSelectedSubscriptions([...selectedSubscriptions, ""]);
  };

  const removeDiscount = (i) => {
    setDiscountValues(discountValues.filter((_, index) => index !== i));
    setSelectedSubscriptions(
      selectedSubscriptions.filter((_, index) => index !== i)
    );
  };

  return (
    <>
      <Header></Header>
      <Aside active={"subscriptions"}></Aside>
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Добавить подписку</h1>

        <div className={styles.container}>
          <div className={styles.item}>
            <p>Уровень:</p>
            <input
              type="text"
              placeholder="Уровень"
              value={level || ""}
              onChange={(e) => setLevel(e.target.value)}
            ></input>
          </div>

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
            <p>Описание:</p>
            <textarea
              type="text"
              placeholder="Описание"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.item}>
            <p>Промо в неделю:</p>
            <input
              value={promoPerWeek || ""}
              placeholder="Промо в неделю"
              onChange={(e) => setPromoPerWeek(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Мин процент промокода:</p>
            <input
              type="text"
              placeholder="Мин процент промокода"
              value={minPromoPercent || ""}
              onChange={(e) => setMinPromoPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Макс процент промокода:</p>
            <input
              type="text"
              placeholder="Макс процент промокода"
              value={maxPromoPercent || ""}
              onChange={(e) => setMaxPromoPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Цена:</p>
            <input
              type="text"
              placeholder="Цена"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className={styles.item}>
            <p>Скидки:</p>
            <div className={styles.discountMap}>
              {discountValues.map((discount, i) => (
                <div key={i}>
                  <select
                    value={selectedSubscriptions[i] || "-"}
                    onChange={(e) => {
                      const updatedSubscriptions = [...selectedSubscriptions];
                      updatedSubscriptions[i] = e.target.value;
                      setSelectedSubscriptions(updatedSubscriptions);
                    }}
                  >
                    <option value="-">-</option>
                    {Object.entries(subscriptionsNames).map(([key, value]) => (
                      <option key={key} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Значение скидки"
                    value={discount || ""}
                    onChange={(e) => {
                      const updatedDiscounts = [...discountValues];
                      updatedDiscounts[i] = e.target.value;
                      setDiscountValues(updatedDiscounts);
                    }}
                  />

                  <div
                    onClick={() => removeDiscount(i)}
                    className={`${styles.addDiscount} ${styles.delete}`}
                  ></div>
                </div>
              ))}
              <div onClick={() => addDiscount()} className={styles.addDiscount}>
                +
              </div>
            </div>
          </div>

          <div className={styles.item}>
            <p>Реф процент:</p>
            <input
              type="text"
              placeholder="Реф процент"
              value={refPercent || ""}
              onChange={(e) => setRefPercent(e.target.value)}
            ></input>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              onClick={() => addSubscription()}
              text={"Сохранить"}
              role={"main"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SubscriptionsAdd;
