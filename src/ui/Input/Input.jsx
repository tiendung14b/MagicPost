import "./input.css";

const Input = ({
  labelText = "",
  id = "",
  placeholder = "",
  style = {},
  type = "text",
  onChange = () => {},
}) => {
  return (
    <label htmlFor={id} style={style} onChange={onChange}>
      {labelText}
      <input type={type} placeholder={placeholder} id={id}></input>
    </label>
  );
};

export default Input;
