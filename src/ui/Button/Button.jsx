import "./button.css";

const Button = ({ text, onClick, style = {}, colorHover = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = colorHover;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = style.backgroundColor;
      }}
    >
      {text}
    </button>
  );
};

export default Button;
