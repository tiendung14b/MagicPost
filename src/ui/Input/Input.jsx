import "./input.css";

const Input = ({
  name = "",
  className = "",
  labelText = "",
  id = "",
  placeholder = "",
  style = {},
  type = "text",
  onChange = () => {},
}) => {
  return (
    <label htmlFor={id} style={style} onChange={onChange} className={className}>
      {labelText}
      <div className="input_content">
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
        ></input>
      </div>
    </label>
  );
};

export default Input;
