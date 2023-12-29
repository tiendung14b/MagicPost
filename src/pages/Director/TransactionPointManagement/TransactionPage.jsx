import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import useTransactionSpot from "../../../hooks/useTransactionSpot";
import useLocation from "../../../hooks/useLocation";
import useWarehouse from "../../../hooks/useWarehouse";
import useUser from "../../../hooks/useUser";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import Popup from "../../../ui/Popup/Popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../ui/Loading/Loading";
import useWindowScreen from "../../../hooks/useWindowScreen";
import "../../CSS/Director.css";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import arrow from "../../../assets/arrow.svg";
import filter_icon from "../../../assets/filter.svg";

import default_avatar from "../../../assets/default_avatar.png";

import logo from "../../../assets/logo.png";

const TransactionPage = () => {
  const {
    //state for transaction spot
    listTransactionSpot,
    transactionSpotLoading,
    getListTransactionSpot,
    setTransactionManager,
    createTransactionSpot,
    deleteTransactionManager,
  } = useTransactionSpot(toast);

  const { provinceData, districtData, getProvince, getDistrict } =
    useLocation(toast);

  const {
    //state for transaction
    listWarehouse,
    getListWarehouse,
    
  } = useWarehouse(toast);

  //state for user
  const { userloading, listManager, getListManager } = useUser(toast);
  //state for new transaction spot
  const [newTransactionSpot, setNewTransactionSpot] = useState({});
  //state for sort
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  //state for choose transaction manager
  const [userChoosen, setUserChoosen] = useState({});
  //state for choose new manager
  const [newManager, setNewManager] = useState({});
  //state for choose get the current transaction spot info
  const [currentTransactionSpot, setCurrentTransactionSpot] = useState({});
  //state for pagination
  const { height } = useWindowScreen();
  const [numPage, setNumPage] = useState(0);
  //state for dropdown
  const [isDropdown, setIsDropdown] = useState(false);
  const transactionValues = ["name", "location_city", "postal_code"];
  //state for search
  const [search, setSearch] = useState("");
  //state for choosen type
  const [searchBy, setSearchBy] = useState("name");
  //state for choosed the selected row
  const [selectedRow, setSelectedRow] = useState(null);
  //handle search type change
  const handleSearchTypeChange = (value) => {
    setIsDropdown(false);
    setSearchBy(value);
    setSearch("");
  };

  const handleChange = (name, value) => {
    setNewTransactionSpot({ ...newTransactionSpot, [name]: value });
  };

  //handle sort
  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const getTransactionInput = () => {
    const name = document.getElementById(
      "add_transaction_spot_name_input"
    ).value;
    const provinceInput = document.getElementById(
      "add_transaction_spot_province_input"
    );
    const province = provinceInput.options[provinceInput.selectedIndex].text;
    const districtInput = document.getElementById(
      "add_transaction_spot_district_input"
    );
    const district = districtInput.options[districtInput.selectedIndex].text;
    const warehouse = document.getElementById(
      "add_transaction_spot_warehouse_input"
    ).value;
    const transaction_manager = document.getElementById(
      "add_transaction_spot_transaction_manager_input"
    ).value;
    const detail = document.getElementById(
      "add_transaction_spot_detail_input"
    ).value;
    return {
      name,
      location: { city: province, district, detail },
      warehouse,
      transaction_manager,
    };
  };

  //get all transaction manager from list user
  const listManagerSpot = listManager?.filter(
    (user) =>
      user?.workplace?.role === "TRANSACTION_MANAGER" &&
      user?.workplace?.workplace_id == null
  );

  //list manager sorted to sortedManager
  const sortedTransaction = listTransactionSpot
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
    getListManager();
    getListTransactionSpot();
    getProvince();
    getDistrict("01");
    getListWarehouse();
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Transacsion Dashboard</h1>
      <DashBoard>
        <Row className="manager__todo">
          <Button
            text={"Thêm điểm giao dịch"}
            className={"action"}
            onClick={() => {
              window["add_manager_popup"].showModal();
            }}
          />
          <div className="input__div">
            <Input
              placeholder={`Tìm kiếm theo ${
                searchBy === "name" ? "name" : searchBy
              }`}
              className={"manager__search"}
              onChange={(e) => setSearch(e.target.value)}
            ></Input>
            <div className="dropdown__div">
              <img
                src={filter_icon}
                className="search_icon"
                onClick={() => setIsDropdown((prev) => !prev)}
              />
              {isDropdown ? (
                <Dropdown
                  items={transactionValues}
                  className="manager__search__type"
                  onItemClick={(value) => handleSearchTypeChange(value)}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </Row>
        <Row className="title">
          <div className="row__item sort_item title__name">
            Name
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("name");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item sort_item title__phone">
            Location City
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("location");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          {/* <div className="row__item sort_item title__workplace">
            Postal Code
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("postal_code");
                e.target.classList.toggle("active");
              }}
            />
          </div> */}
          <div className="row__item sort_item title__workplace">
            Người quản lý
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("transaction_manager");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item title__edit">Quản lý tài khoản</div>
        </Row>
        {sortedTransaction
          ?.filter((transactionSpot) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "name") {
              return transactionSpot?.name?.toLowerCase().includes(searchValue);
            }
            if (searchBy === "location_city") {
              return transactionSpot?.location?.city
                ?.toLowerCase()
                .includes(searchValue);
            }
            if (searchBy === "postal_code") {
              return transactionSpot?.postal_code
                ?.toLowerCase()
                .includes(searchValue);
            }
            if (searchBy === "transaction_manager") {
              return (
                transactionSpot?.transaction_manager?.first_name
                  ?.toLowerCase()
                  .includes(searchValue) ||
                transactionSpot?.transaction_manager?.last_name
                  ?.toLowerCase()
                  .includes(searchValue)
              );
            }
          })
          ?.map((transactionSpot) => (
            <Row className="manager__detail">
              <p className="manager__name row__item">{transactionSpot?.name}</p>
              <p className="row__item manager__phone">
                {transactionSpot?.location?.city}
              </p>
              {/* <p className="row__item manager__workplace">
                {transactionSpot?.postal_code}
              </p> */}
              <p
                className="row__item transaction_manager "
                onClick={() => {
                  setCurrentTransactionSpot(transactionSpot);
                  setUserChoosen(transactionSpot?.transaction_manager);
                  window["manager_popup"].showModal();
                }}
              >
                {transactionSpot?.transaction_manager?.workplace
                  ?.workplace_id ? (
                  <>
                    <img
                      src={
                        transactionSpot.transaction_manager.url_avatar ||
                        default_avatar
                      }
                      alt=""
                    />
                    {transactionSpot.transaction_manager.first_name +
                      " " +
                      transactionSpot.transaction_manager.last_name}
                  </>
                ) : (
                  "Chưa có"
                )}
              </p>

              <div className="row__item manager__edit">
                <Button
                  text={"Xem chi tiết"}
                  className={"action"}
                  onClick={() => {
                    setCurrentTransactionSpot(transactionSpot);
                    window["transaction_popup"].showModal();
                  }}
                />
              </div>
            </Row>
          ))}
      </DashBoard>
      <div className="pagination" id="pagination">
        {[
          ...Array(
            Math.ceil(listTransactionSpot.length / ((0.73 * height) / 60))
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
        title={"Thông tin quản lý"}
      >
        <div className="popup__body__content">
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Họ tên:</p>
            <p className="manager_popup__field__value">
              {userChoosen
                ? userChoosen.first_name + " " + userChoosen.last_name
                : "Chưa có"}
            </p>
          </div>
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Số điện thoại:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.phone_number}
            </p>
          </div>
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Email:</p>
            <p className="manager_popup__field__value">{userChoosen?.email}</p>
          </div>
          <Button
            text={"Thay đổi thông tin người quản lý"}
            className={"action"}
            onClick={() => {
              window["update_manager_popup"].showModal();
            }}
          />
          <Button
            text={"Xóa người quản lý"}
            className={"danger"}
            onClick={() => {
              window["manager_popup"].close();
              deleteTransactionManager(currentTransactionSpot?._id);
            }}
          />
        </div>
      </Popup>
      <Popup
        className="add_manager_popup"
        popup_id={"add_manager_popup"}
        title={"Thêm điểm giao dịch quản lý"}
      >
        <div className="popup__body__content">
          <Input
            className="add_manager_popup__input"
            placeholder={"Tên"}
            type="text"
            name="Name"
            id="add_transaction_spot_name_input"
          />
          <div className="choose_location">
            <select
              name="province"
              id="add_transaction_spot_province_input"
              onChange={(e) => {
                getDistrict(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Province
              </option>
              {provinceData?.map((province) => (
                <option value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
            <select name="district" id="add_transaction_spot_district_input">
              <option value="" disabled>
                Select District
              </option>
              {districtData?.map((district) => (
                <option value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>
          <div className="choose_warehouse">
            <select
              name="warehouse"
              id="add_transaction_spot_warehouse_input"
              onChange={(e) => {
                handleChange("warehouse", e.target.value);
              }}
            >
              {listWarehouse?.map((warehouse) => (
                <option value={warehouse._id}>{warehouse.name}</option>
              ))}
            </select>
          </div>
          <div className="choose_transaction_manager">
            <select
              name="transaction_manager"
              id="add_transaction_spot_transaction_manager_input"
            >
              {listManagerSpot?.map((user) => (
                <option value={user._id}>
                  {user.first_name + " " + user.last_name}
                </option>
              ))}
            </select>
          </div>
          <Input
            className="add_manager_popup__input"
            placeholder={"Chi tiết"}
            type="text"
            name="Detail"
            id="add_transaction_spot_detail_input"
          />
          <p className="warn" id="add_manager_warn">
            Bạn cần nhập đầy đủ thông tin
          </p>
          <div className="add_manager_submit">
            <Button
              text={"Thêm điểm giao dịch"}
              className={"submit"}
              onClick={() => {
                const transactionSpotInput = getTransactionInput();
                if (
                  transactionSpotInput.name === "" ||
                  transactionSpotInput.location.city === "" ||
                  transactionSpotInput.location.district === "" ||
                  transactionSpotInput.warehouse === "" ||
                  transactionSpotInput.transaction_manager === "" ||
                  transactionSpotInput.detail === ""
                ) {
                  document.getElementById("add_manager_warn").style.display =
                    "block";
                  return;
                }
                createTransactionSpot(transactionSpotInput);
                window["add_manager_popup"].close();
              }}
            />
            <Button
              text={"Hủy"}
              className={"danger"}
              onClick={() => {
                window["add_manager_popup"].close();
              }}
            />
          </div>
        </div>
      </Popup>
      <Popup
        className="update_manager_popup"
        popup_id={"update_manager_popup"}
        title={"Danh sách người quản lý điểm giao dịch"}
      >
        <div className="popup__body__content">
          {listManagerSpot?.map((user) => (
            <Row
              key={user.id} // Add a unique key to each row
              className={`manager__detail popup__item ${
                selectedRow === user ? "selected" : ""
              }`}
            >
              <div
                className="choose_list_manager"
                onClick={() => {
                  setSelectedRow(user);
                  console.log(selectedRow);
                  setNewManager(user);
                }}
              >
                <p className="row__item transaction_manager popup__item">
                  <img
                    src={user?.url_avatar}
                    alt={`Avatar of ${user?.first_name}`}
                  />
                  {user?.first_name + " " + user?.last_name}
                </p>
                <p className="row__item transaction_manager popup__item">
                  {user?.phone_number}
                </p>
                <p className="row__item transaction_manager popup__item">
                  {user?.email}
                </p>
              </div>
            </Row>
          ))}
          <div className="add_manager_submit">
            <Button
              text={"Cập nhật"}
              className={"submit"}
              onClick={() => {
                setTransactionManager(
                  currentTransactionSpot?._id,
                  newManager?._id
                );
                toast.success("Cập nhật người quản lý thành công");
                window["update_manager_popup"].close();
                window["manager_popup"].close();
              }}
            />
            <Button
              text={"Hủy"}
              className={"danger"}
              onClick={() => {
                window["update_manager_popup"].close();
              }}
            />
          </div>
        </div>
      </Popup>
      <Popup
        className="transaction_popup"
        popup_id={"transaction_popup"}
        title={"Thông tin điểm giao dịch"}
      >
        <div className="popup__body__content">
          <div className="popup__body__row">
            <div className="manager_popup__field">
              {/* <img src={logo} className="transaction__order__logo" alt="" /> */}
            </div>
          </div>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Tên điểm giao dịch:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.name}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Địa chỉ:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.location?.detail +
                  " " +
                  currentTransactionSpot?.location?.district +
                  " " +
                  currentTransactionSpot?.location?.city}
              </p>
            </div>
          </div>

          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Mã Postal Code:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.postal_code}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Kết nối tới điểm tập kết:
              </p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.warehouse?.name}
              </p>
            </div>
          </div>

          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Số nhân viên:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.transaction_employees?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Đơn tới:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.from_client_transactions?.length}
              </p>
            </div>
          </div>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Đơn chưa xác nhận:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.unconfirm_transactions?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Đơn tới:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.to_client_transactions?.length}
              </p>
            </div>
          </div>
          <div className="popup__body__row">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Số đơn thành công:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.success_transactions?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Số đơn thất bại:</p>
              <p className="manager_popup__field__value">
                {currentTransactionSpot?.failed_transactions?.length}
              </p>
            </div>
          </div>
          {/* <div className="manager__package__list">
            <p className="manager_popup__field__title">Thông tin nhân viên:</p>
            <table>
              <tr>
                <th>Tên</th>
                <th>Mail</th>
                <th>Phone</th>
                <th>Ngày tạo tài khoản</th>
              </tr>
              {currentTransactionSpot?.transaction_employees?.map((user) => (
                <tr>
                  <td>{user?.first_name + " " + user?.last_name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone_number}</td>
                  <td>{new Date(user?.create_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </table>
          </div> */}
          <div className="popup__body__row">
            <Button
              text={"Xem nhân viên"}
              className={"action"}
              onClick={() => {
                window["employee_popup"].showModal();
              }}
            />

            <Button
              text={"Đóng"}
              className={"danger"}
              onClick={() => {
                window["transaction_popup"].close();
              }}
            />
          </div>
        </div>
      </Popup>
      <Popup
        className="employee_popup"
        popup_id={"employee_popup"}
        title={"Danh sách nhân viên"}
      >
        <div className="popup__body__content">
          {currentTransactionSpot?.transaction_employees?.map((user) => (
            <Row
              key={user.id} // Add a unique key to each row
              className={`manager__detail popup__item ${
                selectedRow === user ? "selected" : ""
              }`}
            >
              <div
                className="choose_list_manager"
                onClick={() => {
                  setSelectedRow(user);
                }}
              >
                <p className="row__item transaction_manager popup__item">
                  <img
                    src={user?.url_avatar || default_avatar}
                    alt={`Avatar of ${user?.first_name}`}
                  />
                  {user?.first_name + " " + user?.last_name}
                </p>
                <p className="row__item transaction_manager popup__item">
                  {user?.phone_number}
                </p>
                <p className="row__item transaction_manager popup__item">
                  {user?.email}
                </p>
              </div>
            </Row>
          ))}
          <div className="close_submit">
            <Button
              text={"Hủy"}
              className={"danger"}
              onClick={() => {
                window["employee_popup"].close();
              }}
            />
          </div>
        </div>
      </Popup>
      {transactionSpotLoading ? <Loading /> : <></>}
      {/* {locationLoading ? <Loading /> : <></>} */}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default TransactionPage;
