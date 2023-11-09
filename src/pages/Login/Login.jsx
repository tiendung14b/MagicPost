import "./login.css";
import logo from "../../assets/logo.png";
import mediaImg from "../../assets/logo.png";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import useWindowDimensions from "../../hooks/useWindowScreen";

const Login = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div className="login">
      {width > 900 ? (
        <div className="login__media">
          <img
            className="media_img"
            src="https://images.unsplash.com/photo-1615678815958-5910c6811c25?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      ) : (
        <></>
      )}
      <div className="login__form">
        <img src={logo} alt="" className="logo" />
        <Input
          labelText={"Thông tin đăng nhập"}
          placeholder={"Email hoặc mật khẩu"}
        />
        <Input
          labelText={"Mật khẩu"}
          type="password"
          placeholder="Nhập mật khẩu"
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
