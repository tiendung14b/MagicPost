import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import Toast from "../../../../ui/Toast/Toast";
import DashBoard from "../../../../components/DashBoard/DashBoard";
import Row from "../../../../components/DashBoard/Row";
import useUser from "../../../../hooks/useUser";
import useTransactionSpot from "../../../../hooks/useTransactionSpot";
import useWarehouse from "../../../../hooks/useWarehouse";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/Input/Input";
import Popup from "../../../../ui/Popup/Popup";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../../ui/Loading/Loading";
import useWindowScreen from "../../../../hooks/useWindowScreen";

import Dropdown from "../../../../ui/Dropdown/Dropdown";
import arrow from "../../../../assets/arrow.svg";
import filter_icon from "../../../../assets/filter.svg";

import default_avatar from "../../../../assets/default_avatar.png";

import "../../../CSS/Director.css";

function Stat() {
  const [data, setData] = useState(null);

  const [successTransactionData, setSuccessTransactionData] = useState(null);
  const [failedTransactionData, setFailedTransactionData] = useState([]);
  const [sendingHistoryData, setSendingHistoryData] = useState([]);

  const { statistic, transactionSpotLoading, getStatistic } =
    useTransactionSpot(toast);

  const [chartState, setChartState] = useState({
    options: {
      chart: {
        type: "basic-bar",
        events: {
          click(event, chartContext, config) {
            setData({
              seriesName: config.config.series[config.seriesIndex].name,
              dataPoint:
                config.config.series[config.seriesIndex].data[
                  config.dataPointIndex
                ],
            });
            console.log(config);
            console.log(config.config.series[config.seriesIndex].name);
            console.log(
              config.config.series[config.seriesIndex].data[
                config.dataPointIndex
              ]
            );
          },
        },
      },
      xaxis: {
        categories: [
          "01/2023",
          "02/2023",
          "03/2023",
          "04/2023",
          "05/2023",
          "06/2023",
          "07/2023",
          "08/2023",
          "09/2023",
          "10/2023",
          "11/2023",
          "12/2023",
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "Failed",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        
      },
      {
        name: "Success",
        data: [90, 80, 70, 60, 50, 40, 30, 20, 10],
      },
      {
        name: "Sending History",
        data: [50, 40, 30, 20, 10, 90, 80, 70, 60],
      },
    ],
  });

  //useEffect
  useEffect(() => {
    getStatistic(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
    console.log(statistic?.success_transactions);
  }, []);



  return (
    <div className="manager">
      <h1>Chart Test</h1>
      {chartState && chartState.series && (
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="line"
          width="100%"
          height="400px"
        />
      )}
      <div className="showData">
        <h2>Series Name: {data?.seriesName}</h2>
        <h2>Data Point: {data?.dataPoint}</h2>
      </div>
    </div>
  );
}

export default Stat;
