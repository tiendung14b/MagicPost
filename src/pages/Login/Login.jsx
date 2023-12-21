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
        user.workplace.workplace_name == "TRANSACTION"
      ) {
        return navigate("/transaction/manager");
      } else if (
        user.workplace.role == role.TRANSACTION_EMPLOYEE &&
        user.workplace.workplace_name == "TRANSACTION"
      ) {
        return navigate("/transaction/employee");
      } else {
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
              window["test"].showModal();
            }}
          />
        </div>
        <p className="login__notice" style={{ color: "#777" }}>
          Không có tài khoản? Hãy liên hệ với admin tại nơi bạn làm việc.
        </p>
      </div>
      <ToastContainer />
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
    </div>
  );
};

export default Login;
