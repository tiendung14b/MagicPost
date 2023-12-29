import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../../ui/Loading/Loading";

import useTransactionSpot from "../../../../hooks/useTransactionSpot";
import useWarehouse from "../../../../hooks/useWarehouse";

import "../../../CSS/Director.css";

function Stat() {
  const {
    statistic,
  } = useTransactionSpot(toast);

  const {
    sentHistory,
    receivedHistory,
    warehouseLoading,
    getListSentHistory,
    getListReceivedHistory,
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

  //useEffect
  useEffect(() => {
    getListSentHistory();
    getListReceivedHistory();
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Thống kê</h1>
      <div className="stat__container">
        <div className="chart__container">
          {chartState &&
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
                        ...Object.keys(statistic?.sending_history), //không biết thay data
                      ])
                    ),
                  },
                }}
                series={[
                  ...chartState.series,
                  {
                    name: "Đơn hàng gửi",
                    data: Object.keys(statistic?.failed_transactions).map(
                      (item) => statistic?.failed_transactions[item].length //không biết thay data
                    ),
                  },
                  {
                    name: "Đơn hàng nhận",
                    data: Object.keys(statistic?.success_transactions).map(
                      (item) => statistic?.success_transactions[item].length //không biết thay data
                    ),
                  },
                  // {
                  //   name: "Đơn hàng gửi đi",
                  //   data: Object.keys(statistic?.sending_history).map(
                  //     (item) => statistic?.sending_history[item].length
                  //   ),
                  // },
                ]}
                type="bar"
                width="90%"
                height="400px"
              />
            )}
        </div>
        <div className="statistic__container">
          <div className="statistic__container__left">
            <div className="statistic__container__title">Trường số liệu 1</div>
            <div className="statistic__container__content">
              
            </div>
          </div>
          <div className="statistic__container__right">
            <div className="statistic__container__title">Trường số liệu 2</div>
            <div className="statistic__container__content">
              
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className="toasify" />
      {warehouseLoading && <Loading />}
    </div>
  );
}

export default Stat;
