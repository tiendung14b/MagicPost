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
    getStatistic(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
  }, []);

  return (
    <div className="manager">
      <h3>Thống kê hàng ra / vào</h3>
      {chartState && chartState.series && Object.keys(statistic).length > 0 && (
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
          width="100%"
          height="400px"
        />
      )}
      {transactionSpotLoading && <Loading />}
    </div>
  );
}

export default Stat;
