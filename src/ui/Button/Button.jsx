import "./button.css";

const Button = ({ text, className = "", onClick = () => {}, style = {} }) => {
  return (
    <button type="button" onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
