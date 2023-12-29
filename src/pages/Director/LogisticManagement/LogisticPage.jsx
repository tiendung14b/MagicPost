import React, { useEffect, useState } from "react";
import "../../CSS/Director.css";
import useLocation from "../../../hooks/useLocation";
import Row from "../../../components/DashBoard/Row";
import useUser from "../../../hooks/useUser";
import useTransactionSpot from "../../../hooks/useTransactionSpot";
import useWarehouse from "../../../hooks/useWarehouse";
import Loading from "../../../ui/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../../ui/Button/Button";

import Chart from "react-apexcharts";

const LogisticPage = () => {
  const [transactionSpotChoice, setTransactionSpotChoice] = useState(null);
  const [warehouseChoice, setWarehouseChoice] = useState(null);
  const [line, setLine] = useState(false);
  const [lineTransactionSpot, setLineTransactionSpot] = useState(false);

  const {
    listWarehouse,
    warehouseLoading,
    statisticWarehouse,
    getStatisticWarehouse,
    getListWarehouse,
  } = useWarehouse(toast);

  const {
    listTransactionSpot,
    transactionSpotLoading,
    statistic,
    getStatistic,
    getListTransactionSpot,
  } = useTransactionSpot(toast);

  const getValue = () => {
    const warehouse = document.getElementById("add_warehouse_input").value;
    const transactionSpot = document.getElementById(
      "add_transaction_spot"
    ).value;
    setWarehouseChoice(listWarehouse.find((w) => w._id === warehouse));
    setTransactionSpotChoice(
      listTransactionSpot.find((t) => t._id === transactionSpot)
    );
    getStatisticWarehouse(warehouse);
    getStatistic(transactionSpot);
    console.log("Data của điểm tập kết ", statisticWarehouse);
  };

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

  useEffect(() => {
    getListTransactionSpot();
    getListWarehouse();
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Thống kê</h1>
      <div className="stat__container">
        <div className="chart__container">
          <div className="chart__header">
            <div className="chart__name">
              <h3>Thống kê {warehouseChoice?.name}</h3>
            </div>
            <Button
              className="action"
              onClick={() => {
                setLine(!line);
              }}
              text={line ? "Biểu đồ cột" : "Biểu đồ đường"}
            />
            <div className="choose_warehouse">
              <select name="warehouse" id="add_warehouse_input">
                <option value={null} disabled>
                  Chọn kho
                </option>
                {listWarehouse?.map((warehouse) => (
                  <option value={warehouse._id}>{warehouse.name}</option>
                ))}
              </select>
            </div>
            <Button
              text={"Cập nhật"}
              className={"submit"}
              onClick={() => {
                getValue();
              }}
            />
          </div>

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
        <div className="chart__container">
          <div className="chart__header">
            <div className="chart__name">
              <h3>Thống kê {transactionSpotChoice?.name}</h3>
            </div>
            <Button
              className="action"
              onClick={() => {
                setLineTransactionSpot(!lineTransactionSpot);
              }}
              text={lineTransactionSpot ? "Biểu đồ cột" : "Biểu đồ đường"}
            />
            <div className="choose_transaction">
              <select name="transaction" id="add_transaction_spot">
                <option value={null} disabled>
                  Chọn điểm giao dịch
                </option>
                {listTransactionSpot?.map((warehouse) => (
                  <option value={warehouse._id}>{warehouse.name}</option>
                ))}
              </select>
            </div>
            <Button
              text={"Cập nhật"}
              className={"submit"}
              onClick={() => {
                getValue();
              }}
            />
          </div>

          {lineTransactionSpot &&
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
          {!lineTransactionSpot &&
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
      </div>
      {warehouseLoading ? <Loading /> : <></>}
      {/* {locationLoading ? <Loading /> : <></>} */}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default LogisticPage;
