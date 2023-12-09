import './component.css'
import Button from '../../ui/Button/Button'

const Component = () => {
  return (
    <div className='component'>
      <p>Sample component</p>
      <Button onClick={() => {alert('button clicked')}} text={"Click here"} />
    </div>
  )
}

export default Component;