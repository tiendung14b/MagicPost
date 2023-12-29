import "./login.css";
import logo from "../../assets/logo.png";
import mediaImg from "../../assets/mediaImg.webp";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import useWindowDimensions from "../../hooks/useWindowScreen";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import clientAxios from "../../api/clientAxios";
import Toast from "../../ui/Toast/Toast";
import { decodeToken } from "react-jwt";
import Loading from "../../ui/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Popup from "../../ui/Popup/Popup";
import responseToast from "../../util/response";
import role from "../../util/role";
import axios from "axios";

const Login = () => {
  const { width } = useWindowDimensions();
  // const [loginInfo, setLoginInfo] = useState();
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (loginInfo) => {
    try {
      setLoading(true);
      const response = await clientAxios.post("/user/get_token", loginInfo);
      const access_token = response?.result?.access_token;
      if (!access_token) {
        setLoading(false);
        return Toast.warn("get token fail", toast);
      }
      const user = decodeToken(access_token);
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("user", JSON.stringify(user));
      if (user.workplace.role == "DIRECTOR") {
        return navigate("/director");
      } else if (
        user.workplace.role == role.TRANSACTION_MANAGER &&
        user.workplace.workplace_name == "TRANSACTION" &&
        user.workplace.workplace_id
      ) {
        return navigate("/transaction/manager");
      } else if (
        user.workplace.role == role.TRANSACTION_EMPLOYEE &&
        user.workplace.workplace_name == "TRANSACTION" &&
        user.workplace.workplace_id
      ) {
        return navigate("/transaction/employee");
      } else if (
        user.workplace.role == role.WAREHOUSE_MANAGER &&
        user.workplace.workplace_name == "WAREHOUSE"
      ) {
        return navigate("/warehouse/manager");
      } else if (
        user.workplace.role == role.WAREHOUSE_EMPLOYEE &&
        user.workplace.workplace_name == "WAREHOUSE"
      ) {
        return navigate("/warehouse/employee");
      } else {
        sessionStorage.clear();
        Toast.warn("Bạn không có quyền truy cập vào trang này", toast);
      }
      setLoading(false);
    } catch (err) {
      if (!err.response) {
        responseToast(err, toast);
        console.log(err);
        return setLoading(false);
      }
      const res = err.response.data;
      if (res.status == "fail") {
        Toast.warn(err.response?.data?.message, toast);
      } else {
        Toast.error(err.response?.data?.message, toast);
      }
      setLoading(false);
    }
  };

  const onChangePassword = async () => {
    const phone_number = window["update_password_phone_number"].value;
    const old_password = window["update_password_old_password"].value;
    const new_password = window["update_password_new_password"].value;
    if (!phone_number || !old_password || !new_password) {
      return Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
    }
    try {
      const response = await clientAxios.put("/user/password", {
        phone_number,
        old_password,
        new_password,
      });
      if (response?.status == "success") {
        Toast.success(response?.message, toast);
        window["update_password"].close();
      } else {
        Toast.warn(response?.message, toast);
      }
      window["update_password"].close();
    } catch (err) {
      if (!err.response) {
        responseToast(err, toast);
        console.log(err);
        return;
      }
      const res = err.response.data;
      if (res.status == "fail") {
        Toast.warn(err.response?.data?.message, toast);
      } else {
        Toast.error(err.response?.data?.message, toast);
      }
    }
  };

  return (
    <div className="login">
      {width > 1000 ? (
        <div className="login__media">
          <img className="media_img" src={mediaImg} alt="" />
        </div>
      ) : (
        <></>
      )}
      <div className="login__form">
        <img src={logo} alt="" className="logo" />
        <Input
          labelText={"Thông tin đăng nhập"}
          placeholder={"Số điện thoại"}
          style={{ width: "57%" }}
          id="login_info"
          type="tel"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, phone_number: e.target.value })
          }
        />
        <Input
          labelText={"Mật khẩu"}
          type="password"
          placeholder="Nhập mật khẩu"
          style={{ width: "57%" }}
          id="login_password"
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />
        <div className="submit">
          <Button
            text={"Đăng nhập"}
            className={"submit"}
            onClick={() => {
              if (!loginInfo.phone_number || !loginInfo.password) {
                return Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
              }
              onSubmit(loginInfo);
            }}
          />
          <Button
            text={"Lấy lại mật khẩu"}
            className={"action"}
            onClick={() => {
              window["reset_password"].showModal();
            }}
          />
          <Button
            text={"Đổi mật khẩu"}
            className={"action"}
            onClick={() => {
              window["update_password"].showModal();
            }}
          />
        </div>
        <p className="login__notice" style={{ color: "#777" }}>
          Không có tài khoản? Hãy liên hệ với admin tại nơi bạn làm việc.
        </p>
      </div>
      <ToastContainer className={"toast_container"} />
      {loading ? <Loading /> : <></>}
      <Popup title={"Hello"} popup_id={"test"}>
        <p>This is popup</p>
        <Input
          labelText={"Số điện thoại"}
          placeholder={"Số điện thoại"}
          id="login_info"
          type="tel"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, phone_number: e.target.value })
          }
        />
      </Popup>
      <Popup
        title={"Đổi mật khẩu"}
        popup_id={"update_password"}
        className={"update_password"}
      >
        <Input
          labelText={"Số điện thoại"}
          placeholder={"Số điện thoại"}
          id="update_password_phone_number"
          type="tel"
        />
        <Input
          labelText={"Mật khẩu"}
          type="password"
          placeholder="Nhập mật khẩu"
          id="update_password_old_password"
        />
        <Input
          labelText={"Mật khẩu mới"}
          type="password"
          placeholder="Nhập mật khẩu mới"
          id="update_password_new_password"
        />
        <Button
          text={"Đổi mật khẩu"}
          className={"submit"}
          onClick={() => {
            onChangePassword();
          }}
        />
      </Popup>
      <Popup
        title={"Lấy lại mật khẩu"}
        popup_id={"reset_password"}
        className={"reset_password"}
      >
        <Input
          labelText={"Số điện thoại"}
          placeholder={"Số điện thoại"}
          id="reset_password_phone_number"
          type="tel"
        />
        <p
          onClick={async () => {
            if (!window["reset_password_phone_number"].value) {
              return Toast.warn("Bạn cần nhập số điện thoại", toast);
            }
            await clientAxios.post("/user/send_verify_code", {
              phone_number: window["reset_password_phone_number"].value,
            });
          }}
        >
          Gửi mã xác nhận
        </p>
        <Input
          labelText={"Mã xác nhận"}
          type="text"
          placeholder="Nhập mã xác nhận"
          id="reset_password_verify_code"
        />
        <Button
          text={"Lấy lại mật khẩu"}
          className={"submit"}
          onClick={async () => {
            try {
              if (
                !window["reset_password_phone_number"].value ||
                !window["reset_password_verify_code"].value
              ) {
                return Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
              }
              await clientAxios.post("/user/reset_password", {
                phone_number: window["reset_password_phone_number"].value,
                verify_code: window["reset_password_verify_code"].value,
              });
              Toast.success("Mật khẩu mới được gửi qua email của bạn", toast);
              window["reset_password"].close();
            } catch (err) {
              window["reset_password"].close();
              if (!err.response) {
                responseToast(err, toast);
                console.log(err);
                return;
              }
              const res = err.response.data;
              if (res.status == "fail") {
                Toast.warn(err.response?.data?.message, toast);
              } else {
                Toast.error(err.response?.data?.message, toast);
              }
            }
          }}
        />
        <p>Bạn cần nhập đầy đủ thông tin</p>
      </Popup>
    </div>
  );
};

export default Login;
