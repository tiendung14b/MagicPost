import { useRef } from "react";
import Toast from "../../../../ui/Toast/Toast";
import DashBoard from "../../../../components/DashBoard/DashBoard";
import Row from "../../../../components/DashBoard/Row";
import Column from "../../../../components/DashBoard/Column";
import useUser from "../../../../hooks/useUser";
import useTransactionSpot from "../../../../hooks/useTransactionSpot";
import useWarehouse from "../../../../hooks/useWarehouse";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/Input/Input";
import Popup from "../../../../ui/Popup/Popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../../ui/Loading/Loading";
import useWindowScreen from "../../../../hooks/useWindowScreen";

import Dropdown from "../../../../ui/Dropdown/Dropdown";
import arrow from "../../../../assets/arrow.svg";
import filter_icon from "../../../../assets/filter.svg";

import logo from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import "../../../CSS/Director.css";

const DeliveryTransactionMobile = () => {
  const {
    transactionSpotLoading,
    clientTransaction_Confirmed,
    getFromClientTransaction,
    confirmDelivery,
  } = useTransactionSpot(toast);

  //state for transaction choosen
  const [transactionChoosen, setTransactionChoosen] = useState(null);
  //state for sort
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  //state for pagination
  const { height } = useWindowScreen();
  const [numPage, setNumPage] = useState(0);
  //state for dropdown
  const [isDropdown, setIsDropdown] = useState(false);
  //state for search
  const [search, setSearch] = useState("");
  //state for choosen type
  const [searchBy, setSearchBy] = useState("_id");
  //state for selected value to fitler
  const [selected, setSelected] = useState(null);
  //state for values of dropdown and selected
  const values = ["_id", "send_date"];
  //handle search type change
  const handleSearchTypeChange = (value) => {
    setIsDropdown(false);
    setSelected(value);
    setSearchBy(value);
    setSearch("");
    handleSort(value);
  };

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
    console.log(column);
  };

  const componentRef = useRef();
  //handle print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //list manager sorted to sortedManager
  const sortedClientTransactions = clientTransaction_Confirmed
    ?.slice(
      numPage * ((0.67 * height) / 60),
      numPage * ((0.67 * height) / 60) + (0.67 * height) / 60
    )
    .sort((a, b) => {
      const columnA = a[sortedColumn];
      const columnB = b[sortedColumn];

      if (sortOrder === "asc") {
        return columnA < columnB ? -1 : columnA > columnB ? 1 : 0;
      } else {
        return columnA > columnB ? -1 : columnA < columnB ? 1 : 0;
      }
    });

  //useEffect
  useEffect(() => {
    getFromClientTransaction(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
  }, []);

  return (
    <div className="manager__mobile">
      <h1 className="page__title__mobile">
        Đơn hàng tới điểm tập kết
      </h1>
      <DashBoard>
        <Column className="manager__todo__mobile">
          <div className="button__layout__mobile"></div>
          <Row className={"dashboard_rowForColumn"}>
            <Input
              placeholder={`Tìm kiếm theo ${
                searchBy === "first_name" ? "first name" : searchBy
              }`}
              className={"manager__search__mobile"}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="dropdown__div">
              <div className="dropdown__image">
                <div className="column__item sort_item title__name">
                  <img
                    src={arrow}
                    onClick={(e) => {
                      handleSort(selected);
                      e.target.classList.toggle("active");
                    }}
                  />
                </div>
                <img
                  src={filter_icon}
                  className="search_icon"
                  onClick={() => setIsDropdown((prev) => !prev)}
                />
              </div>
              {isDropdown ? (
                <Dropdown
                  items={values}
                  className="manager__search__type"
                  onItemClick={(value) => handleSearchTypeChange(value)}
                />
              ) : (
                <></>
              )}
            </div>
          </Row>
        </Column>
        {sortedClientTransactions
          ?.filter((manager) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "_id") {
              return manager?._id.toLowerCase().includes(searchValue);
            }
            if (searchBy === "send_date") {
              const date = new Date(manager?.send_date).toLocaleDateString();
              return date.toLowerCase().includes(searchValue);
            }
          })
          ?.map((manager) => (
            <Column className="manager__detail__mobile">
              <p className="manager__name column__item">
                <div className="column__item sort_item title__name">
                  <p className="column__title">ID: </p>
                  {manager._id}
                </div>
              </p>
              <p className="column__item manager__phone">
                <div className="column__item sort_item title__phone">
                  <p className="column__title">Ngày tháng năm: </p>
                  {new Date(manager?.send_date).toLocaleDateString()}
                </div>
              </p>
              <div className="column__item manager__edit">
                <div className="manager__edit__button">
                  <Button
                    text={"Xem chi tiết"}
                    className={"action"}
                    onClick={() => {
                      window["manager_popup"].showModal();
                      setTransactionChoosen(manager);
                    }}
                  />
                </div>
              </div>
            </Column>
          ))}
      </DashBoard>
      <div className="pagination" id="pagination">
        {[
          ...Array(
            Math.ceil(
              clientTransaction_Confirmed.length / ((0.73 * height) / 60)
            )
          ).keys(),
        ].map((i) => (
          <div
            id={"page_" + i}
            className="pagination__item"
            onClick={(e) => {
              if (i == 0 && numPage == i)
                window["page_" + i].classList.toggle("active");
              if (numPage === i) return;
              window["page_" + numPage].classList.toggle("active");
              e.target.classList.toggle("active");
              setNumPage(i);
              if (i < 5 || i > 15) return;
              window["pagination"].scrollLeft = (i - 5) * 40;
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <Popup
        className="manager_popup"
        popup_id={"manager_popup"}
        title={"Thông tin đơn hàng"}
      >
        <div className="popup__body__content">
          <div className="popup__body__row">
            <img src={transactionChoosen?.transaction_qr_tracker} alt="" />
          </div>
          <div className="popup__body__column">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Mã đơn hàng:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?._id}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Hình thức vận chuyển:
              </p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.transaction_type}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Địa chỉ bên gửi:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.sender?.address?.detail +
                  " " +
                  transactionChoosen?.sender?.address?.district +
                  " " +
                  transactionChoosen?.sender?.address?.city}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Địa chỉ bên nhận:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.receiver?.address?.detail +
                  " " +
                  transactionChoosen?.receiver?.address?.district +
                  " " +
                  transactionChoosen?.receiver?.address?.city}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Người gửi:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.sender?.name}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Người nhận:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.receiver?.name}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Ngày tạo:</p>
              <p className="manager_popup__field__value">
                {new Date(transactionChoosen?.send_date).toLocaleDateString()}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Phí vận chuyển:</p>
              <p className="manager_popup__field__value">
                {Math.round(transactionChoosen?.shipping_cost / 1000) * 100}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Tổng số gói hàng:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.list_package?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Phí Trả trước:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.prepaid}
              </p>
            </div>
            <div className="manager__package__list">
              <p className="manager_popup__field__title">Chi tiết gói hàng:</p>
              <table>
                <tr>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Phân loại</th>
                  <th>Số lượng</th>
                  <th>Khối lượng</th>
                  <th>Giá trị</th>
                </tr>
                {transactionChoosen?.list_package?.map((packageItem) => (
                  <tr>
                    <td>{packageItem.name}</td>
                    <td>{packageItem.description}</td>
                    <td>{packageItem.type}</td>
                    <td>{packageItem.quantity}</td>
                    <td>{packageItem.weight}</td>
                    <td>{packageItem.postage}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          <div className="popup__body__row">
            <Button
              text={"Xác nhận đơn hàng thành công"}
              className={"action"}
              onClick={() => {
                window["manager_popup"].close();
                confirmDelivery(
                  transactionChoosen?.destination_transaction_spot._id,
                  transactionChoosen?._id,
                  "SUCCESS"
                );
                console.log(transactionChoosen?._id);
              }}
            />
            <Button
              text={"Xác nhận đơn hàng thất bại"}
              className={"danger"}
              onClick={() => {
                window["manager_popup"].close();
                confirmDelivery(
                  transactionChoosen?.destination_transaction_spot._id,
                  transactionChoosen?._id,
                  "FAILED"
                );
              }}
            />
          </div>
        </div>
      </Popup>
      <Popup>
        <div className="popup__body__content pdf" ref={componentRef}>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <img src={logo} className="transaction__order__logo" alt="" />
            </div>
            <div className="manager_popup__field">
              <img src={transactionChoosen?.transaction_qr_tracker} alt="" />
            </div>
          </div>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Mã đơn hàng:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?._id}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Hình thức vận chuyển:
              </p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.transaction_type}
              </p>
            </div>
          </div>

          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Địa chỉ bên gửi:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.sender?.address?.detail +
                  " " +
                  transactionChoosen?.sender?.address?.district +
                  " " +
                  transactionChoosen?.sender?.address?.city}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Địa chỉ bên nhận:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.receiver?.address?.detail +
                  " " +
                  transactionChoosen?.receiver?.address?.district +
                  " " +
                  transactionChoosen?.receiver?.address?.city}
              </p>
            </div>
          </div>

          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Người gửi:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.sender?.name}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Người nhận:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.receiver?.name}
              </p>
            </div>
          </div>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Ngày tạo:</p>
              <p className="manager_popup__field__value">
                {new Date(transactionChoosen?.send_date).toLocaleDateString()}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Phí vận chuyển:</p>
              <p className="manager_popup__field__value">
                {Math.round(transactionChoosen?.shipping_cost / 1000) * 100}
              </p>
            </div>
          </div>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Tổng số gói hàng:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.list_package?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Phí Trả trước:</p>
              <p className="manager_popup__field__value">
                {transactionChoosen?.prepaid}
              </p>
            </div>
          </div>

          <div className="manager__package__list__pdf">
            <p className="manager_popup__field__title">Chi tiết gói hàng:</p>
            <table>
              <tr>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Phân loại</th>
                <th>Số lượng</th>
                <th>Khối lượng</th>
                <th>Giá trị</th>
              </tr>
              {transactionChoosen?.list_package?.map((packageItem) => (
                <tr>
                  <td>{packageItem.name}</td>
                  <td>{packageItem.description}</td>
                  <td>{packageItem.type}</td>
                  <td>{packageItem.quantity}</td>
                  <td>{packageItem.weight}</td>
                  <td>{packageItem.postage}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </Popup>
      {transactionSpotLoading ? <Loading /> : <></>}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default DeliveryTransactionMobile;
