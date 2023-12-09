import "./button.css";

const Button = ({ text, onClick, className }) => {
  return (
    <button type="button" onClick={onClick} className={`button ${className}`}>
      {text}
    </button>
  );
};

export default Button;
