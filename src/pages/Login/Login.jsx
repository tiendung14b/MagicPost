import "./login.css";
import logo from "../../assets/logo.png";
import mediaImg from "../../assets/mediaImg.webp";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import useWindowDimensions from "../../hooks/useWindowScreen";

const Login = () => {
  const { height, width } = useWindowDimensions();
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
          placeholder={"Email hoặc mật khẩu"}
          style={{ width: "57%" }}
        />
        <Input
          labelText={"Mật khẩu"}
          type="password"
          placeholder="Nhập mật khẩu"
          style={{ width: "57%" }}
        />
        <Button text={"Đăng nhập"} />
        <p style={{ color: "#777" }}>
          Không có tài khoản. Hãy liên hệ với admin tại nơi bạn làm việc
        </p>
      </div>
    </div>
  );
};

export default Login;
