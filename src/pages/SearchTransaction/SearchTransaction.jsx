import "./search_transaction.css";
import Button from "../../ui/Button/Button";
import { useEffect, useRef } from "react";
import Input from "../../ui/Input/Input";

const SearchTransaction = () => {
  const searchRef = useRef(null);
  const queryParam = new URLSearchParams(window.location.search);
  const search = queryParam.get("transaction");

  useEffect(() => {
    console.log(search);
    if (search) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="search_transaction">
      <div className="hero">
        <div className="hero_content">
          <h1>Magic Post</h1>
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
      <div className="footer">
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
    </div>
  );
};

export default SearchTransaction;
