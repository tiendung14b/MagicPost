import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import useUser from "../../../hooks/useUser";
import useWarehouse from "../../../hooks/useWarehouse";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import Popup from "../../../ui/Popup/Popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../ui/Loading/Loading";
import Column from "../../../components/DashBoard/Column";
import useWindowScreen from "../../../hooks/useWindowScreen";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import "../../CSS/Director.css";

import arrow from "../../../assets/arrow.svg";
import filter_icon from "../../../assets/filter.svg";
import default_avatar from "../../../assets/default_avatar.png";

const WarehousePageMobile = () => {
  const {
    //state for transaction
    listWarehouse,
    warehouseLoading,
    getListWarehouse,
    createWarehouse,
    setWarehouseManager,
    deleteWarehouseManager,
  } = useWarehouse(toast);

  //state for user
  const { userloading, listManager, getListManager } = useUser(toast);
  //state for new warehouse
  const [newWarehouse, setNewWarehouse] = useState({});
  //state for user choosen
  const [userChoosen, setUserChoosen] = useState({});
  //state for choose new manager
  const [newManager, setNewManager] = useState({});
  //state for choose get the current transaction  info
  const [currentWarehouse, setcurrentWarehouse] = useState({});
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
  const [searchBy, setSearchBy] = useState("name");
  //state for selected value to fitler
  const [selected, setSelected] = useState(null);
  //state for values of dropdown and selected
  const values = ["name", "location"];
  //state for chooose the selected column
  const [selectedColumn, setSelectedColumn] = useState(null);
  //handle search type change
  const handleSearchTypeChange = (value) => {
    setIsDropdown(false);
    setSelected(value);
    setSearchBy(value);
    setSearch("");
    handleSort(value);
  };

  const getWarehouseInput = () => {
    const name = document.getElementById("add_manager_name_input").value;
    const location = document.getElementById(
      "add_manager_location_input"
    ).value;
    const warehouse_manager = document.getElementById(
      "add_manager_warehouse_manager_input"
    ).value;
    return { name, location, warehouse_manager };
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

  //get all transaction manager from list user
  const listWareHouseManager = listManager?.filter(
    (user) =>
      user?.workplace?.role === "WAREHOUSE_MANAGER" &&
      user?.workplace?.workplace_id == null
  );

  //list manager sorted to sortedManager
  const sortedWarehouse = listWarehouse
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

  useEffect(() => {
    getListManager();
    getListWarehouse();
  }, []);

  return (
    <div className="manager__mobile">
      <h1 className="page__title__mobile">Warehouse Dashboard</h1>
      <DashBoard>
        <Column className="manager__todo__mobile">
          <div className="button__layout__mobile">
            <Button
              text={"Thêm kho mới"}
              className={"action"}
              onClick={() => {
                window["add_manager_popup"].showModal();
              }}
            />
          </div>
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
        {sortedWarehouse
          ?.filter((warehouse) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "name") {
              return warehouse?.name.toLowerCase().includes(searchValue);
            }
            if (searchBy === "location") {
              return warehouse?.location.toLowerCase().includes(searchValue);
            }
          })
          ?.map((warehouse) => (
            <Column className="manager__detail__mobile">
              <p className="manager__name column__item">
                <div className="column__item sort_item title__name">
                  <p className="column__title">Name: </p>
                  {warehouse?.name}
                </div>
              </p>
              <p className="column__item manager__phone">
                <div className="column__item sort_item title__phone">
                  <p className="column__title">Location City: </p>
                  {warehouse?.location}
                </div>
              </p>
              <p className="column__item manager__workplace">
                <div className="column__item sort_item title__workplace">
                  <p className="column__title">Transaction Manager: </p>
                  {warehouse?.warehouse_manager?.workplace?.workplace_id ? (
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
                </div>
              </p>
              <div className="column__item manager__edit">
                <div className="manager__edit__button">
                  <Button
                    text={"Xem chi tiết"}
                    className={"action"}
                    onClick={() => {
                      window["warehouse_popup"].showModal();
                      setUserChoosen(warehouse?.warehouse_manager);
                      setcurrentWarehouse(warehouse);
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
            Math.ceil(sortedWarehouse.length / ((0.73 * height) / 60))
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
        title={"Thêm kho mới"}
      >
        <div className="popup__body__content">
          <Input
            className="add_manager_popup__input"
            placeholder={"Tên"}
            type="text"
            name="name"
            id="add_manager_name_input"
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"location"}
            type="text"
            name="location"
            id="add_manager_location_input"
          />
          <div className="choose_warehouse_manager">
            <select
              name="warehouse_manager"
              id="add_manager_warehouse_manager_input"
            >
              {listWareHouseManager?.map((user) => (
                <option value={user._id}>
                  {user.first_name + " " + user.last_name}
                </option>
              ))}
            </select>
          </div>
          <p className="warn" id="add_manager_warn">
            Bạn cần nhập đầy đủ thông tin
          </p>
          <div className="add_manager_submit">
            <Button
              text={"Thêm kho mới"}
              className={"submit"}
              onClick={() => {
                const warehouse = getWarehouseInput();
                if (
                  !warehouse.name ||
                  !warehouse.location ||
                  !warehouse.warehouse_manager
                ) {
                  document.getElementById("add_manager_warn").style.display =
                    "block";
                  return;
                }
                createWarehouse(warehouse);
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
          {listWareHouseManager?.map((user) => (
            <Column
              key={user.id} // Add a unique key to each row
              className={`manager__detail popup__item ${
                selectedColumn === user ? "selected" : ""
              }`}
            >
              <div
                className="choose_list_manager_mobile"
                onClick={() => {
                  setSelectedColumn(user);
                  setNewManager(user);
                }}
              >
                <div className="column__item sort_item title__name pop__up">
                  <p className="column__title">Name: </p>
                  <img
                    src={user?.url_avatar || default_avatar}
                    alt={`Avatar of ${user?.first_name}`}
                  />
                  {user?.first_name + " " + user?.last_name}
                </div>
                <div className="column__item sort_item title__name pop__up">
                  <p className="column__title">Phone: </p>
                  {user?.phone_number}
                </div>
                <div className="column__item sort_item title__name pop__up">
                  <p className="column__title">Email: </p>
                  {user?.email}
                </div>
              </div>
            </Column>
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
      <Popup
        className="warehouse_popup"
        popup_id={"warehouse_popup"}
        title={"Thông tin điểm tập kết"}
      >
        <div className="popup__body__content">
          <div className="popup__body__row">
            <div className="manager_popup__field">
              {/* <img src={logo} className="transaction__order__logo" alt="" /> */}
            </div>
          </div>
          <div className="popup__body__column">
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Tên điểm tập kết:</p>
              <p className="manager_popup__field__value">
                {currentWarehouse?.name}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Địa chỉ:</p>
              <p className="manager_popup__field__value">
                {currentWarehouse?.location}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Tổng số nhân viên:</p>
              <p className="manager_popup__field__value">
                {currentWarehouse?.warehouse_employees?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Kết nối tới số điểm giao dịch:
              </p>
              <p className="manager_popup__field__value">
                {currentWarehouse?.transaction_spots?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Số đơn nhận từ điểm giao dịch:
              </p>
              <p className="manager_popup__field__value">
                {
                  currentWarehouse?.unconfirm_transactions_from_transaction_spot
                    ?.length
                }
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Số đơn nhận từ điểm tập kết:
              </p>
              <p className="manager_popup__field__value">
                {
                  currentWarehouse?.unconfirm_transactions_from_warehouse
                    ?.length
                }
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Số đơn gửi đi điểm giao dịch:
              </p>
              <p className="manager_popup__field__value">
                {
                  currentWarehouse?.inwarehouse_transactions_to_transaction_spot
                    ?.length
                }
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">
                Số đơn gửi đi điểm tập kết:
              </p>
              <p className="manager_popup__field__value">
                {
                  currentWarehouse?.inwarehouse_transactions_to_warehouse
                    ?.length
                }
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Số đơn gửi:</p>
              <p className="manager_popup__field__value">
                {currentWarehouse?.sent_transactions_history?.length}
              </p>
            </div>
            <div className="manager_popup__field">
              <p className="manager_popup__field__title">Số đơn nhận:</p>
              <p className="manager_popup__field__value">
                {currentWarehouse?.received_transactions_history?.length}
              </p>
            </div>
          </div>

          <div className="manager__package__list">
            <p className="manager_popup__field__title">Thông tin nhân viên:</p>
            {/* <table>
              <tr>
                <th>Tên</th>
                <th>Mail</th>
                <th>Phone</th>
                <th>Ngày tạo tài khoản</th>
              </tr>
              {currentWarehouse?.warehouse_employees?.map((user) => (
                <tr>
                  <td>{user?.first_name + " " + user?.last_name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone_number}</td>
                  <td>{new Date(user?.create_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </table> */}
          </div>
          <div className="manager__package__list">
            <p className="manager_popup__field__title">
              Thông tin điểm giao dịch:
            </p>
            <table>
              <tr>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Postal Code</th>
              </tr>
              {currentWarehouse?.transaction_spots?.map((spot) => (
                <tr>
                  <td>{spot?.name}</td>
                  <td>
                    {spot?.location?.detail +
                      " " +
                      spot?.location?.district +
                      " " +
                      spot?.location?.city}
                  </td>
                  <td>{spot?.postal_code}</td>
                </tr>
              ))}
            </table>
          </div>
          <Button
            text={"Xem chi tiết danh sách nhân viên"}
            className={"action"}
            onClick={() => {
              window["employee_popup"].showModal();
            }}
          />

          <Button
            text={"Đóng"}
            className={"danger"}
            onClick={() => {
              window["warehouse_popup"].close();
            }}
          />
        </div>
      </Popup>
      <Popup
        className="employee_popup"
        popup_id={"employee_popup"}
        title={"Danh sách nhân viên"}
      >
        <div className="popup__body__content">
          {currentWarehouse?.warehouse_employees?.map((user) => (
            <Column
              key={user.id} // Add a unique key to each row
              className={`manager__detail popup__item ${
                selectedColumn === user ? "selected" : ""
              }`}
            >
              <div
                className="choose_list_manager_mobile"
                onClick={() => {
                  setSelectedColumn(user);
                }}
              >
                <div className="column__item sort_item title__name pop__up">
                  <p className="column__title">Name: </p>
                  <img
                    src={user?.url_avatar || default_avatar}
                    alt={`Avatar of ${user?.first_name}`}
                  />
                  {user?.first_name + " " + user?.last_name}
                </div>
                <div className="column__item sort_item title__name pop__up">
                  <p className="column__title">Phone: </p>
                  {user?.phone_number}
                </div>
                <div className="column__item sort_item title__name pop__up">
                  <p className="column__title">Email: </p>
                  {user?.email}
                </div>
              </div>
            </Column>
          ))}
          <div className="close">
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
      {warehouseLoading ? <Loading /> : <></>}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default WarehousePageMobile;
