import { Card } from "antd";
import "./customCard.css";
export default function CustomCard({ title, statistic, backgroundColor }) {
  return (
    <div className="custom-card" style={{ backgroundColor: backgroundColor }}>
      <span className="custom-card__title">{title}</span>
      <h2 className="custom-card__statistic">{statistic}</h2>
    </div>
  );
}
