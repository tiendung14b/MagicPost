import "./input.css";

const Input = ({
  labelText = "",
  id = "",
  placeholder = "",
  style = {},
  type = "text",
}) => {
  return (
    <label htmlFor={id}>
      {labelText}
      <input
        type={type}
        style={style}
        placeholder={placeholder}
        id={id}
      ></input>
    </label>
  );
};

export default Input;
