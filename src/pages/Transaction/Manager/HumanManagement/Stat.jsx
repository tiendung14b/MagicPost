import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../../ui/Loading/Loading";

import useTransactionSpot from "../../../../hooks/useTransactionSpot";
import Button from "../../../../ui/Button/Button";

import "../../../CSS/Director.css";

function Stat() {
  const {
    statistic,
    clientTransaction,
    clientTransaction_Confirmed,
    transactionSpotLoading,
    getStatistic,
    getFromClientTransaction,
    getToClientTransaction,
  } = useTransactionSpot(toast);

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

  const StatClientTransaction = clientTransaction.length;
  const StatClientTransaction_Confirmed = clientTransaction_Confirmed.length;

  //useEffect
  useEffect(() => {
    getStatistic(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
    getFromClientTransaction(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
    getToClientTransaction(
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
            Object.keys(statistic).length > 0 && (
              <Chart
                options={{
                  ...chartState.options,
                  xaxis: {
                    categories: Array.from(
                      new Set([
                        ...Object.keys(statistic?.success_transactions),
                        ...Object.keys(statistic?.failed_transactions),
                        ...Object.keys(statistic?.sending_history),
                      ])
                    ),
                  },
                }}
                series={[
                  ...chartState.series,
                  {
                    name: "Gửi thất bại",
                    data: Object.keys(statistic?.failed_transactions).map(
                      (item) => statistic?.failed_transactions[item].length
                    ),
                  },
                  {
                    name: "Gửi hàng thành công",
                    data: Object.keys(statistic?.success_transactions).map(
                      (item) => statistic?.success_transactions[item].length
                    ),
                  },
                  {
                    name: "Đơn hàng gửi đi",
                    data: Object.keys(statistic?.sending_history).map(
                      (item) => statistic?.sending_history[item].length
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
            Object.keys(statistic).length > 0 && (
              <Chart
                options={{
                  ...chartState.options,
                  xaxis: {
                    categories: Array.from(
                      new Set([
                        ...Object.keys(statistic?.success_transactions),
                        ...Object.keys(statistic?.failed_transactions),
                        ...Object.keys(statistic?.sending_history),
                      ])
                    ),
                  },
                }}
                series={[
                  ...chartState.series,
                  {
                    name: "Gửi thất bại",
                    data: Object.keys(statistic?.failed_transactions).map(
                      (item) => statistic?.failed_transactions[item].length
                    ),
                  },
                  {
                    name: "Gửi hàng thành công",
                    data: Object.keys(statistic?.success_transactions).map(
                      (item) => statistic?.success_transactions[item].length
                    ),
                  },
                  {
                    name: "Đơn hàng gửi đi",
                    data: Object.keys(statistic?.sending_history).map(
                      (item) => statistic?.sending_history[item].length
                    ),
                  },
                ]}
                type="bar"
                width="90%"
                height="400px"
              />
            )}
        </div>
        <div className="statistic__container">
          <div className="statistic__container__left">
            <div className="statistic__container__title">
              Tổng số đơn hàng cần gửi cho điểm tập kết
            </div>
            <div className="statistic__container__content">
              {StatClientTransaction}
            </div>
          </div>
          <div className="statistic__container__right">
            <div className="statistic__container__title">
              Tổng số đơn hàng cần gửi cho người nhận
            </div>
            <div className="statistic__container__content">
              {StatClientTransaction_Confirmed}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="toasify" />
      {transactionSpotLoading && <Loading />}
    </div>
  );
}

export default Stat;
