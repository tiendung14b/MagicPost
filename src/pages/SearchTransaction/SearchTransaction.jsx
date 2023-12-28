import "./search_transaction.css";
import Button from "../../ui/Button/Button";
import { useEffect, useRef, useState } from "react";
import Input from "../../ui/Input/Input";
import clientAxios from "../../api/clientAxios";
import responseToast from "../../util/response";
import Toast from "../../ui/Toast/Toast";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/logo.png";

const SearchTransaction = () => {
  const searchRef = useRef(null);
  const [data, setData] = useState({});
  const queryParam = new URLSearchParams(window.location.search);
  const transaction_id = queryParam.get("transaction");
  const statusMap = {
    SUCCESS: "Giao hàng thành công",
    WAITING: "Đang giao hàng",
    FAILED: "Giao hàng thất bại",
  };

  useEffect(() => {
    if (transaction_id) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
      clientAxios
        .get("/transaction/get_info/" + transaction_id)
        .then((res) => {
          setData(res.result);
        })
        .catch((err) => {
          console.log(data);
        });
    }
  }, []);

  return (
    <div className="search_transaction">
      <header className="search_transaction_header">
        <ul className="nav_header">
          <li>
            <a href="#hero">Trang chủ</a>
          </li>
          <li>
            <a href="#search_content">Tra cứu đơn hàng</a>
          </li>
          <li>
            <a href="">Về chúng tôi</a>
          </li>
        </ul>
      </header>
      <div className="hero" id="hero">
        <div className="hero_content">
          <h1 className="hero_title">Magic Post</h1>
          <p>
            Magic Post là một đơn vị vận chuyển hàng đầu tại Việt Nam, chúng tôi
            cung cấp dịch vụ giao hàng nhanh chóng, đáng tin cậy và tiết kiệm,
            cung cấp thông tin tức thì về tình trạng và vị trí của các gói hàng.
          </p>
          <Button
            text="Tra cứu đơn hàng"
            onClick={() => {
              searchRef.current.scrollIntoView({ behavior: "smooth" });
            }}
            className={"action"}
          />
        </div>
      </div>
      <div className="search_content" id="search_content" ref={searchRef}>
        <h2>Tra cứu đơn hàng</h2>
        <Input
          type="text"
          placeholder="Nhập mã đơn hàng"
          className="search_input"
          id="search_input"
        />
        <Button
          text="Tra cứu"
          className="submit"
          onClick={() => {
            window.location.href =
              "/view/transaction/?transaction=" +
              document.getElementById("search_input").value;
          }}
        />
      </div>
      <div className="search_result">
        <h2 style={{ fontSize: "24px" }}>Kết quả tra cứu</h2>
        {Object.keys(data).length == 0 && <p>Đơn hàng không tồn tại</p>}
        {Object.keys(data).length > 0 && (
          <div className="search_result_container">
            <p>Mã đơn hàng: {data?._id}</p>
            <div className="data_detail">
              <div className="data_detail_left">
                <p>Người gửi: {data?.sender?.name}</p>
                <p>Số điện thoại: {data?.sender?.phoneNumber}</p>
                <p>
                  Địa chỉ:{" "}
                  {data?.sender?.address.city +
                    ", " +
                    data?.sender?.address.district +
                    ", " +
                    data?.sender?.detail}
                </p>
              </div>
              <div className="data_detail_right">
                <p>Người nhận: {data?.receiver?.name}</p>
                <p>Số điện thoại: {data?.receiver?.phone}</p>
                <p>
                  Địa chỉ: {""}
                  {data?.receiver?.address.city +
                    ", " +
                    data?.receiver?.address.district +
                    ", " +
                    data?.receiver?.address.detail}
                </p>
              </div>
            </div>
            <div className="data_detail">
              <p>Ngày gửi: {new Date(data?.send_date).toLocaleString()}</p>
            </div>
            {data?.status?.length > 0 && (
              <p style={{ fontWeight: "bold", color: "#fa5a5a" }}>
                Trạng thái đơn hàng:{" "}
                {statusMap[data?.status[data?.status?.length - 1].status]}
                {data?.status[data?.status?.length - 1].status == "SUCCESS" && (
                  <p>
                    Ngày nhận: {new Date(data?.receive_date).toLocaleString()}
                  </p>
                )}
              </p>
            )}
            {data?.status?.map((status, index) => (
              <div className="search_result_item" key={index}>
                <div className="search_result_item_left">
                  <p>Thời gian: {new Date(status.date).toLocaleString()}</p>
                </div>
                <div className="search_result_item_right">
                  <p>Địa điểm: {status.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="about"></div>
      <div className="footer">
        <div className="footer_top">
          <img src={logo} alt="" />
          <p>Magic Post</p>
        </div>
        <div className="footer_content">
          <div className="footer_content_left">
            <h3>Liên hệ</h3>
            <p>Số điện thoại: 1900 1234</p>
            <a href="mailto: magicpost.uet@gmail.com">
              Email: magicpost.uet@gmail.com
            </a>
            <p>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
          </div>
          <div className="footer_content_right">
            <h3>Liên kết</h3>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchTransaction;
