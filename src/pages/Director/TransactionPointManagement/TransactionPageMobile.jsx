import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import useTransactionSpot from "../../../hooks/useTransactionSpot";
import useWarehouse from "../../../hooks/useWarehouse";
import useUser from "../../../hooks/useUser";
import useLocation from "../../../hooks/useLocation";
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

const TransactionPageMobile = () => {
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
    warehouseLoading,
    getListWarehouse,
    setWarehouseManager,
    deleteWarehouseManager,
  } = useWarehouse(toast);

  //state for user
  const { userloading, listManager, getListManager } = useUser(toast);
  //state for new transaction spot
  const [newTransactionSpot, setNewTransactionSpot] = useState({});
  //state for choose get the current transaction spot info
  const [currentTransactionSpot, setCurrentTransactionSpot] = useState({});
  //state for sort
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  //state for choose transaction manager
  const [userChoosen, setUserChoosen] = useState({});
  //state for choose new manager
  const [newManager, setNewManager] = useState({});
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
  //state for chooose the selected column
  const [selectedColumn, setSelectedColumn] = useState(null);
  //state for values of dropdown and selected
  const transactionValues = ["name", "location_city", "postal_code"];

  //handle search type change
  const handleSearchTypeChange = (value) => {
    setIsDropdown(false);
    setSelected(value);
    setSearchBy(value);
    setSearch("");
    handleSort(value);
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
    console.log(column);
  };

  //get all transaction manager from list user
  const listManagerSpot = listManager?.filter(
    (user) =>
      user?.workplace?.role === "TRANSACTION_MANAGER" &&
      user?.workplace?.workplace_id == null
  );

  //list transaction sorted to sortedTransaction
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

  useEffect(() => {
    getListManager();
    getListTransactionSpot();
    getProvince();
    getDistrict("01");
    getListWarehouse();
  }, []);

  return (
    <div className="manager__mobile">
      <h1 className="page__title__mobile">Transacsion Dashboard</h1>
      <DashBoard>
        <Column className="manager__todo__mobile">
          <div className="button__layout__mobile">
            <Button
              text={"Thêm điểm giao dịch"}
              className={"action"}
              onClick={() => {
                window["add_manager_popup"].showModal();
              }}
            />
          </div>
          <Row className={"dashboard_rowForColumn"}>
            <Input
              placeholder={`Tìm kiếm theo ${
                searchBy === "name" ? "name" : searchBy
              }`}
              className={"manager__search__mobile"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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
                  onClick={() => {
                    setIsDropdown((prev) => !prev);
                  }}
                />
              </div>
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
          </Row>
        </Column>
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
          })
          ?.map((transactionSpot) => (
            <Column className="manager__detail__mobile">
              <p className="manager__name column__item">
                <div className="column__item sort_item title__name">
                  <p className="column__title">Name: </p>
                  {transactionSpot?.name}
                </div>
              </p>
              <p className="column__item manager__phone">
                <div className="column__item sort_item title__phone">
                  <p className="column__title">Location City: </p>
                  {transactionSpot?.location?.city}
                </div>
              </p>
              <p className="column__item manager__workplace">
                <div className="column__item sort_item title__workplace">
                  <p className="column__title">Postal Code: </p>
                  {transactionSpot?.postal_code}
                </div>
              </p>
              <p className="column__item manager__workplace">
                <div className="column__item sort_item title__workplace">
                  <p className="column__title">Transaction Manager: </p>
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
                </div>
              </p>
              <div className="column__item manager__edit">
                <div className="manager__edit__button">
                  <Button
                    text={"Xem chi tiết"}
                    className={"action"}
                    onClick={() => {
                      setCurrentTransactionSpot(transactionSpot);
                      setUserChoosen(transactionSpot?.transaction_manager);
                      window["manager_popup"].showModal();
                    }}
                  />
                  <Button
                    text={"Xoá"}
                    className={"danger"}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </Column>
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
            onChange={(e) => {
              handleChange("name", e.target.value);
            }}
          />
          <div className="choose_location">
            <select
              name="province"
              id="province"
              onChange={(e) => {
                getDistrict(e.target.value);
                let text = e.target.options[e.target.selectedIndex].text;
                text = text.replace("Tỉnh ", "");
                text = text.replace("Thành phố ", "");
                console.log(text);
                setNewTransactionSpot({
                  ...newTransactionSpot,
                  location: {
                    ...newTransactionSpot.location,
                    city: text,
                  },
                });
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
            <select
              name="district"
              id="district"
              onChange={(e) => {
                console.log(e.target.options[e.target.selectedIndex].text);
                let text = e.target.options[e.target.selectedIndex].text;
                text = text.replace("Quận ", "");
                text = text.replace("Huyện ", "");
                console.log(text);
                setNewTransactionSpot({
                  ...newTransactionSpot,
                  location: {
                    ...newTransactionSpot.location,
                    district: text,
                  },
                });
              }}
            >
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
              id="warehouse"
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
              id="transaction_manager"
              onChange={(e) => {
                console.log(listManagerSpot);
                handleChange("transaction_manager", e.target.value);
              }}
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
            onChange={(e) => {
              setNewTransactionSpot({
                ...newTransactionSpot,
                location: {
                  ...newTransactionSpot.location,
                  detail: e.target.value,
                },
              });
            }}
          />
          <p className="warn" id="add_manager_warn">
            Bạn cần nhập đầy đủ thông tin
          </p>
          <div className="add_manager_submit">
            <Button
              text={"Thêm điểm giao dịch"}
              className={"submit"}
              onClick={() => {
                console.log(newTransactionSpot);
                if (
                  !newTransactionSpot?.name ||
                  !newTransactionSpot?.location?.city ||
                  !newTransactionSpot?.location?.district ||
                  !newTransactionSpot?.warehouse ||
                  !newTransactionSpot?.transaction_manager
                ) {
                  Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
                  return;
                }
                window["add_manager_popup"].close();
                createTransactionSpot(newTransactionSpot);
                setNewTransactionSpot({});
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
        className="update_manager_popup"
        popup_id={"update_manager_popup"}
        title={"Danh sách người quản lý điểm giao dịch"}
      >
        <div className="popup__body__content">
          {listManagerSpot?.map((user) => (
            <Column
              key={user?.id}
              className={`manager__detail popup__item ${
                selectedColumn === user ? "selected" : ""
              }`}
            >
              <div
                className="choose_list_manager_mobile"
                onClick={() => {
                  setSelectedColumn(user);
                  console.log(selectedColumn);
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
      {transactionSpotLoading ? <Loading /> : <></>}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default TransactionPageMobile;
