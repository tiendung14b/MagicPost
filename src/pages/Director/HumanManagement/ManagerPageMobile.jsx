import Toast from "../../../ui/Toast/Toast";
import DashBoard from "../../../components/DashBoard/DashBoard";
import Row from "../../../components/DashBoard/Row";
import useUser from "../../../hooks/useUser";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import Popup from "../../../ui/Popup/Popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../../ui/Loading/Loading";
import Column from "../../../components/DashBoard/Column";
import useWindowScreen from "../../../hooks/useWindowScreen";
import Dropdown from "../../../ui/Dropdown/Dropdown";
import "../Director.css";

import arrow from "../../../assets/arrow.svg";
import filter_icon from "../../../assets/filter.svg";

const ManagerPageMobile = () => {
  const {
    userloading,
    listManager,
    getListManager,
    createManager,
    deleteManager,
  } = useUser(toast);
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
  //state for search
  const [search, setSearch] = useState("");
  //state for choosen type
  const [searchBy, setSearchBy] = useState("first_name");
  //state for selected value to fitler
  const [selected, setSelected] = useState(null);
  //state for values of dropdown and selected
  const values = ["first_name", "phone_number", "email"];
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

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  //list manager sorted to sortedManager
  const sortedManager = listManager
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
  }, []);

  return (
    <div className="manager__mobile">
      <h1 className="page__title">Manager Dashboard</h1>
      <DashBoard>
        <Column className="manager__todo__mobile">
          <div className="button__layout__mobile">
            <Button
              text={"Thêm quản lý"}
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
        {sortedManager
          ?.filter((manager) => {
            const searchValue = search.toLowerCase();
            if (searchBy === "first_name") {
              const fullName = manager?.first_name + " " + manager?.last_name;
              return fullName.toLowerCase().includes(searchValue);
            }
            if (searchBy === "phone_number") {
              return manager?.phone_number.toLowerCase().includes(searchValue);
            }
            if (searchBy === "email") {
              return manager?.email.toLowerCase().includes(searchValue);
            }
          })
          ?.map((manager) => (
            <Column className="manager__detail__mobile">
              <p className="manager__name column__item">
                <div className="column__item sort_item title__name">
                  <p className="column__title">Họ Tên: </p>
                  {manager?.first_name + " " + manager?.last_name}
                </div>
              </p>
              <p className="column__item manager__phone">
                <div className="column__item sort_item title__phone">
                  <p className="column__title">Số điện thoại: </p>
                  {manager?.phone_number}
                </div>
              </p>
              <p className="column__item manager__workplace">
                <div className="column__item sort_item title__workplace">
                  <p className="column__title">Điểm quản lý: </p>
                  {manager?.workplace?.name || "Chưa có"}
                </div>
              </p>
              <p className="column__item sort_item title__email">
                <p className="column__title">Email: </p> {manager?.email}
              </p>
              <p className="column__item sort_item title__role">
                <p className="column__title">Vai Trò: </p>
                {manager?.workplace?.role || "Chưa có"}
              </p>
              <div className="column__item manager__edit">
                <Button
                  text={"Xoá người dùng này"}
                  className={"danger"}
                  onClick={() => {
                    deleteManager(manager?._id);
                  }}
                />
              </div>
            </Column>
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
        className="add_manager_popup"
        popup_id={"add_manager_popup"}
        title={"Thêm tài khoản quản lý"}
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
          <div className="add_manager_role">
            <p>Vai trò:</p>
            <div className="checkbox">
              <input
                type="radio"
                name="role"
                value="WAREHOUSE_MANAGER"
                id="warehouse_role"
                onClick={(e) => {
                  setNewUser({
                    ...newUser,
                    workplace: { role: e.target.value },
                  });
                }}
              />
              <label htmlFor="warehouse_role">Quản lý điểm tập kết</label>
            </div>
            <div className="checkbox">
              <input
                type="radio"
                name="role"
                value="WAREHOUSE_MANAGER"
                id="transaction_role"
                onClick={(e) => {
                  setNewUser({
                    ...newUser,
                    workplace: { role: e.target.value },
                  });
                }}
              />
              <label htmlFor="transaction_role">Quản lý điểm giao dịch</label>
            </div>
          </div>
          <p className="warn" id="add_manager_warn">
            Bạn cần nhập đầy đủ thông tin
          </p>
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
                  !newUser?.email ||
                  !newUser?.workplace?.role
                ) {
                  Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
                  window["add_manager_warn"].className = "warn show";
                  return;
                }
                window["add_manager_popup"].close();
                createManager(newUser);
                setNewUser({});
              }}
            />
            <Button
              text={"Hủy"}
              className={"cancel"}
              onClick={() => {
                window["add_manager_popup"].close();
                setNewUser({});
              }}
            />
          </div>
        </div>
      </Popup>
      {userloading ? <Loading /> : <></>}
      <ToastContainer className="toasify" />
    </div>
  );
};

export default ManagerPageMobile;
