import { Aside, Header } from "../../components";
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import { getCheckStatistic } from "../../api/api";
import styles from "./MainPage.module.css";
import useStore from "../../state/store";

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Получение меток дат за последние 7 дней
const getLast7DaysLabels = (data) => {
  return data.map((item) =>
    new Date(item.date).toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" })
  );
};

// Компонент для отображения графика
const StatisticChart = ({ title, dataValues, color }) => {
  const data = {
    labels: getLast7DaysLabels(dataValues),
    datasets: [
      {
        label: title,
        data: dataValues.map((item) => item.value),
        borderColor: color,
        backgroundColor: color + "33",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {},
  };

  return <Line data={data} options={options} />;
};

function MainPage() {
  const [statistic, setStatistic] = useState({
    day_register: [],
    all_replenishment: [],
    all_withdraw: [],
    day_replenishment_total: [],
    day_replenishment_sum: [],
  });

  const welcomeData = useStore((state) => state.welcomeData);
  const toastrRef = useStore((state) => state.toastrRef);
  const [showToastr, setShowToastr] = [
    useStore((state) => state.showToastr),
    useStore((state) => state.setShowToastr),
  ];

  useEffect(() => {
    getCheckStatistic().then((data) => {
      const day_register = data.map((item) => ({
        date: item.date,
        value: item.counts.day_register,
      }));
      const all_replenishment = data.map((item) => ({
        date: item.date,
        value: item.counts.all_replenishment,
      }));
      const all_withdraw = data.map((item) => ({
        date: item.date,
        value: item.counts.all_withdraw,
      }));
      const day_replenishment_total = data.map((item) => ({
        date: item.date,
        value: item.counts.day_replenishment_total,
      }));
      const day_replenishment_sum = data.map((item) => ({
        date: item.date,
        value: item.counts.day_replenishment_sum,
      }));

      setStatistic({
        day_register,
        all_replenishment,
        all_withdraw,
        day_replenishment_total,
        day_replenishment_sum,
      });
    });

    fetch("https://zenquotes.io/api/random/[business]")
      .then((response) => response.json())
      .then((data) => {
        toastrRef.current.notify(data.content + " - " + data.author, "success");
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Header />
      <Aside active={"main"} />
      <div className={`asideMargin`}>
        <h1 className={styles.greeting}>Здарова, {welcomeData}</h1>

        <div className={styles.counters}>
          <div>
            <h3>Новых регистраций</h3>
            <StatisticChart title="Новых регистраций" dataValues={statistic.day_register} color="#ff4d4f" />
          </div>
          <div>
            <h3>Всего пополнений</h3>
            <StatisticChart title="Всего пополнений" dataValues={statistic.all_replenishment} color="#ffa940" />
          </div>
          <div>
            <h3>Всего выводов</h3>
            <StatisticChart title="Всего выводов" dataValues={statistic.all_withdraw} color="#73d13d" />
          </div>
          <div>
            <h3>Пополнений сегодня</h3>
            <StatisticChart title="Пополнений сегодня" dataValues={statistic.day_replenishment_total} color="#4096ff" />
          </div>
          <div className={styles.center}>
            <h3>Сумма пополнений за сегодня</h3>
            <StatisticChart title="Сумма пополнений за сегодня" dataValues={statistic.day_replenishment_sum} color="#9254de" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
