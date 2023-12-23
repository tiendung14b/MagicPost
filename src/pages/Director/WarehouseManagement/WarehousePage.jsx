import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import useWarehouse from "../../../hooks/useWarehouse";
import useUser from "../../../hooks/useUser";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import Popup from "../../../ui/Popup/Popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../ui/Loading/Loading";
import useWindowScreen from "../../../hooks/useWindowScreen";
import "../Director.css";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import arrow from "../../../assets/arrow.svg";
import filter_icon from "../../../assets/filter.svg";

import default_avatar from "../../../assets/default_avatar.png";

const WarehousePage = () => {
  const {
    //state for transaction
    listWarehouse,
    warehouseLoading,
    getListWarehouse,
    setWarehouseManager,
    deleteWarehouseManager,
  } = useWarehouse(toast);

  //state for user
  const { userloading, listManager, getListManager } = useUser(toast);

  //state for sort
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  //state for choose transaction manager
  const [userChoosen, setUserChoosen] = useState({});
  //state for choose new manager
  const [newManager, setNewManager] = useState({});
  //state for choose get the current transaction  info
  const [currentWarehouse, setcurrentWarehouse] = useState({});
  //state for pagination
  const { height } = useWindowScreen();
  const [numPage, setNumPage] = useState(0);
  //state for dropdown
  const [isDropdown, setIsDropdown] = useState(false);
  const transactionValues = ["name", "location"];
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

  //handle sort
  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  //get all transaction manager from list user
  const listWareHouseManager = listManager?.filter(
    (user) =>
      user?.workplace?.role === "WAREHOUSE_MANAGER" &&
      user?.workplace?.workplace_id == null
  );

  //list manager sorted to sortedManager
  const sortedTransaction = listWarehouse
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
    getListWarehouse();
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Warehouse Dashboard</h1>
      <DashBoard>
        <Row className="manager__todo">
          <Button
            text={"Thêm kho mới"}
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
            Location
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
                handleSort("warehouse_manager");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item title__edit">Quản lý tài khoản</div>
        </Row>
        {sortedTransaction
          ?.filter((warehouse) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "name") {
              return warehouse?.name?.toLowerCase().includes(searchValue);
            }
            if (searchBy === "location") {
              return warehouse?.location?.toLowerCase().includes(searchValue);
            }
            // if (searchBy === "postal_code") {
            //   return warehouse?.postal_code
            //     ?.toLowerCase()
            //     .includes(searchValue);
            // }
            if (searchBy === "warehouse_manager") {
              return (
                warehouse?.warehouse_manager?.first_name
                  ?.toLowerCase()
                  .includes(searchValue) ||
                warehouse?.warehouse_manager?.last_name
                  ?.toLowerCase()
                  .includes(searchValue)
              );
            }
          })
          ?.map((warehouse) => (
            <Row className="manager__detail">
              <p className="manager__name row__item">{warehouse?.name}</p>
              <p className="row__item manager__phone">{warehouse?.location}</p>
              {/* <p className="row__item manager__workplace">
                {warehouse?.postal_code}
              </p> */}
              <p
                className="row__item transaction_manager"
                onClick={() => {
                  setcurrentWarehouse(warehouse);
                  setUserChoosen(warehouse?.warehouse_manager);
                  window["manager_popup"].showModal();
                }}
              >
                {warehouse?.warehouse_manager ? (
                  <>
                    <img
                      src={
                        warehouse.warehouse_manager.url_avatar ||
                        default_avatar
                      }
                      alt=""
                    />
                    {warehouse.warehouse_manager.first_name +
                      " " +
                      warehouse.warehouse_manager.last_name}
                  </>
                ) : (
                  "Chưa có"
                )}
              </p>

              <div className="row__item manager__edit">
                <Button
                  text={"Xem chi tiết"}
                  className={"action"}
                  onClick={() => {}}
                />
              </div>
            </Row>
          ))}
      </DashBoard>
      <div className="pagination" id="pagination">
        {[
          ...Array(
            Math.ceil(sortedTransaction.length / ((0.73 * height) / 60))
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
              deleteWarehouseManager(currentWarehouse?._id);
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
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Location City"}
            type="text"
            name="location_city"
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Postal Code"}
            type="text"
            name="postal_code"
          />
          <p className="warn" id="add_manager_warn">
            Bạn cần nhập đầy đủ thông tin
          </p>
          <div className="add_manager_submit">
            <Button
              text={"Thêm điểm giao dịch"}
              className={"submit"}
              onClick={() => {}}
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
          {listWareHouseManager?.map((user) => (
            <Row
              key={user.id} // Add a unique key to each row
              className={`manager__detail popup__item ${
                selectedRow === user ? "selected-row" : ""
              }`}
            >
              <div
                className="choose_list_manager"
                onClick={() => {
                  setSelectedRow(user);
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
                setWarehouseManager(currentWarehouse?._id, newManager?._id);
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
      {warehouseLoading ? <Loading /> : <></>}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default WarehousePage;
