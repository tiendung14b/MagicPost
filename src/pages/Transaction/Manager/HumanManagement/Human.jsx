import Toast from "../../../../ui/Toast/Toast";
import DashBoard from "../../../../components/DashBoard/DashBoard";
import Row from "../../../../components/DashBoard/Row";
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

import default_avatar from "../../../../assets/default_avatar.png";

import "../../../CSS/Director.css";

const Human = () => {
  const {
    listManager,
  } = useUser(toast);

  //state to get the transaction employee
  const {
    listTransactionEmployee,
    transactionSpotLoading,
    getListTransactionEmployee,
    addTransactionEmployee,
    deleteTransactionEmployee,
    setTransactionSpotLoading,
  } = useTransactionSpot(toast);

  

  //state for user
  const [newUser, setNewUser] = useState({});
  const [userChoosen, setUserChoosen] = useState({});
  //state for sort
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  //state for pagination
  const { height } = useWindowScreen();
  const [numPage, setNumPage] = useState(0);
  //state for dropdown
  const [isDropdown, setIsDropdown] = useState(false);
  //state for values of dropdown and selected
  const values = ["first_name", "phone", "email"];
  //state for search
  const [search, setSearch] = useState("");
  //state for choosen type
  const [searchBy, setSearchBy] = useState("first_name");
  //handle search type change
  const handleSearchTypeChange = (value) => {
    setIsDropdown(false);
    setSearchBy(value);
    setSearch("");
  };

  //handle change
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
  //list manager sorted to sortedEmployee
  const sortedEmployee = listTransactionEmployee
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
    getListTransactionEmployee(
      JSON.parse(sessionStorage.getItem("user")).workplace.workplace_id
    );
  }, []);

  return (
    <div className="manager">
      <h1 className="page_title">Transaction Manager Dashboard</h1>
      <DashBoard>
        <Row className="manager__todo">
          <Button
            text={"Thêm nhân viên điểm giao dịch"}
            className={"action"}
            onClick={() => {
              window["add_manager_popup"].showModal();
            }}
          />
          <div className="input__div">
            <Input
              placeholder={`Tìm kiếm theo ${
                searchBy === "first_name" ? "first name" : searchBy
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
                  items={values}
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
            Họ Tên
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("first_name");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          <div className="row__item sort_item title__phone">
            Số điện thoại
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("phone_number");
                e.target.classList.toggle("active");
              }}
            />
          </div>
          {/* <div className="row__item sort_item title__workplace">
            Điểm quản lý
            <img
              src={arrow}
              alt=""
              onClick={(e) => {
                handleSort("workplace");
                e.target.classList.toggle("active");
              }}
            />
          </div> */}
          <div className="row__item title__edit">Quản lý tài khoản</div>
        </Row>
        {sortedEmployee
          ?.filter((manager) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "first_name") {
              const fullName = manager?.first_name + " " + manager?.last_name;
              return fullName.toLowerCase().includes(searchValue);
            }
            if (searchBy === "phone") {
              return manager?.phone_number.toLowerCase().includes(searchValue);
            }
            if (searchBy === "email") {
              return manager?.email.toLowerCase().includes(searchValue);
            }
          })
          ?.map((manager) => (
            <Row className="manager__detail">
              <p className="manager__name row__item user_management">
                <img
                  src={
                    manager?.url_avatar ||
                    default_avatar
                  }
                />
                {" " + manager?.first_name + " " + manager?.last_name}
              </p>
              <p className="row__item manager__phone">
                {manager?.phone_number}
              </p>
              {/* <p className="row__item manager__workplace">
                {manager?.workplace?.name || "Chưa có"}
              </p> */}
              <div className="row__item manager__edit">
                <Button
                  text={"Xem chi tiết"}
                  className={"action"}
                  onClick={() => {
                    setUserChoosen(manager);
                    console.log(userChoosen);
                    window["manager_popup"].showModal();
                  }}
                />
              </div>
            </Row>
          ))}
      </DashBoard>
      <div className="pagination" id="pagination">
        {[
          ...Array(
            Math.ceil(listManager.length / ((0.73 * height) / 60))
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
              {userChoosen?.first_name + " " + userChoosen?.last_name}
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
          {/* <div className="manager_popup__field">
            <p className="manager_popup__field__title">Nơi làm việc:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.workplace?.name || "Chưa có"}
            </p>
          </div> */}
          <div className="manager_popup__field">
            <p className="manager_popup__field__title">Vai trò:</p>
            <p className="manager_popup__field__value">
              {userChoosen?.workplace?.role || "Chưa có"}
            </p>
          </div>
          <Button
            text={"Xoá người dùng này"}
            className={"danger"}
            onClick={() => {
              setTransactionSpotLoading(true);
              window["manager_popup"].close();
              deleteTransactionEmployee(userChoosen?._id);
            }}
          />
        </div>
      </Popup>
      <Popup
        className="add_mzanager_popup"
        popup_id={"add_manager_popup"}
        title={"Thêm nhân viên điểm giao dịch"}
      >
        <div className="popup__body__content">
          <Input
            className="add_manager_popup__input"
            placeholder={"Họ"}
            type="text"
            name="first_name"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Tên"}
            type="text"
            name="last_name"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder={"Số điện thoại"}
            type="tel"
            name="phone_number"
            onChange={handleChange}
          />
          <Input
            className="add_manager_popup__input"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <div className="add_manager_submit">
            <Button
              text={"Thêm quản lý"}
              className={"submit"}
              onClick={() => {
                console.log(newUser.workplace);
                if (
                  !newUser?.phone_number ||
                  !newUser?.first_name ||
                  !newUser?.last_name ||
                  !newUser?.email
                ) {
                  Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
                  return;
                }
                setTransactionSpotLoading(true);
                window["add_manager_popup"].close();
                addTransactionEmployee(newUser);
                setNewUser({});
              }}
            />
            <Button
              text={"Hủy"}
              className={"danger"}
              onClick={() => {
                window["add_manager_popup"].close();
                setNewUser({});
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

export default Human;
