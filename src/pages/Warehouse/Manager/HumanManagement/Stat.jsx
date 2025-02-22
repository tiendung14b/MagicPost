import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../../ui/Loading/Loading";

import useTransactionSpot from "../../../../hooks/useTransactionSpot";
import useWarehouse from "../../../../hooks/useWarehouse";

import Button from "../../../../ui/Button/Button";

import "../../../CSS/Director.css";
import Card from "../../../../ui/Card.js/Card";

function Stat() {
  const {
    warehouseLoading,
    statisticWarehouse,
    getStatisticWarehouse,
  } = useWarehouse(toast);
  

  const [chartState, setChartState] = useState({
    options: {
      chart: {
        type: "basic-bar",
      },
      xaxis: {},
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
    },
    series: [],
  });

  const [line, setLine] = useState(false);

  //useEffect
  useEffect(() => {
    getStatisticWarehouse(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Thống kê</h1>
      <div className="stat__container">
        <div className="chart__container">
          <Button
            className="action"
            onClick={() => {
              setLine(!line);
            }}
            text={line ? "Biểu đồ cột" : "Biểu đồ đường"}
          />
          {line &&
            chartState &&
            chartState.series &&
            Object.keys(statisticWarehouse).length > 0 && (
              <Chart
                options={{
                  ...chartState.options,
                  xaxis: {
                    categories: Array.from(
                      new Set([
                        ...Object.keys(
                          statisticWarehouse?.received_transactions
                        ),
                        ...Object.keys(statisticWarehouse?.sent_transactions),
                      ])
                    ),
                  },
                }}
                series={[
                  ...chartState.series,
                  {
                    name: "Đơn hàng nhận về",
                    data: Object.keys(
                      statisticWarehouse?.received_transactions
                    ).map(
                      (item) =>
                        statisticWarehouse?.received_transactions[item].length
                    ),
                  },
                  {
                    name: "Đơn hàng gửi đi",
                    data: Object.keys(
                      statisticWarehouse?.sent_transactions
                    ).map(
                      (item) =>
                        statisticWarehouse?.sent_transactions[item].length
                    ),
                  },
                ]}
                type="line"
                width="90%"
                height="400px"
              />
            )}
          {!line &&
            chartState &&
            chartState.series &&
            Object.keys(statisticWarehouse).length > 0 && (
              <Chart
                options={{
                  ...chartState.options,
                  xaxis: {
                    categories: Array.from(
                      new Set([
                        ...Object.keys(
                          statisticWarehouse?.received_transactions
                        ),
                        ...Object.keys(statisticWarehouse?.sent_transactions),
                      ])
                    ),
                  },
                }}
                series={[
                  ...chartState.series,
                  {
                    name: "Đơn hàng nhận về",
                    data: Object.keys(
                      statisticWarehouse?.received_transactions
                    ).map(
                      (item) =>
                        statisticWarehouse?.received_transactions[item].length
                    ),
                  },
                  {
                    name: "Đơn hàng gửi đi",
                    data: Object.keys(
                      statisticWarehouse?.sent_transactions
                    ).map(
                      (item) =>
                        statisticWarehouse?.sent_transactions[item].length
                    ),
                  },
                ]}
                type="bar"
                width="90%"
                height="400px"
              />
            )}
        </div>
      </div>
      <ToastContainer className="toasify" />
      {warehouseLoading && <Loading />}
    </div>
  );
}

export default Stat;
