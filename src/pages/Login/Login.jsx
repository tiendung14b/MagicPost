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
import { decodeToken, isExpired } from "react-jwt";

const onSubmit = async (loginInfo, loginPassword) => {
  try {
    const response = await clientAxios.post("/user/get_token", {
      phone_number: loginInfo,
      password: loginPassword,
    });
    const access_token = response?.data?.result?.access_token;
    if (access_token) {
      const user = decodeToken(access_token);
      sessionStorage.setItem("user", user);
      Toast.success("Đăng nhập thành công", toast);
    } else {
      Toast.fail("get token fail", toast);
    }
  } catch (err) {
    if (err.response) Toast.error(err.response?.data?.message, toast);
    else Toast.error("API error", toast);
  }
};

const Login = () => {
  const { height, width } = useWindowDimensions();
  const [loginInfo, setLoginInfo] = useState();
  const [loginPassword, setLoginPassword] = useState();

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
          onChange={(e) => setLoginInfo(e.target.value)}
        />
        <Input
          labelText={"Mật khẩu"}
          type="password"
          placeholder="Nhập mật khẩu"
          style={{ width: "57%" }}
          id="login_password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <div className="submit">
          <Button
            text={"Đăng nhập"}
            onClick={() => {
              if (!loginInfo || !loginPassword) {
                Toast.warn("Bạn cần nhập đầy đủ thông tin", toast);
              } else {
                onSubmit(loginInfo, loginPassword);
              }
            }}
          />
          <Button
            text={"Lấy lại mật khẩu"}
            style={{
              backgroundColor: "#016A70",
            }}
          />
        </div>
        <p style={{ color: "#777" }}>
          Không có tài khoản? Hãy liên hệ với admin tại nơi bạn làm việc.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
