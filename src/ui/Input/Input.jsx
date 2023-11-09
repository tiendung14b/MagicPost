import "./input.css";

const Input = ({
  labelText = "",
  id = "",
  placeholder = "",
  style = {},
  type = "text",
}) => {
  return (
    <label htmlFor={id} style={style}>
      {labelText}
      <input type={type} placeholder={placeholder} id={id}></input>
    </label>
  );
};

export default Input;
