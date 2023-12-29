import "./Card.css";

function Card({ children, ...props }) {
  return (
    <div className="card">
      <div className="card__header">
        <h3 className="card__title">{props.title}</h3>
        <p className="card__subtitle">{props.subtitle}</p>
      </div>
      <div className="card__body">{props.children}</div>
    </div>
  );
}

export default Card;
