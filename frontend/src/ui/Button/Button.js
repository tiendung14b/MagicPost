import './button.css'

const Button = ({ children, onClick }) => {
  return (
    <button className='button' type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;