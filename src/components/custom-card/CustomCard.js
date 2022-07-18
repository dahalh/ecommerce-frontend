import Card from "react-bootstrap/Card";
import "./customCard.style.css";

export const CustomCard = ({ title, count }) => {
  return (
    <Card style={{ minwidth: "18rem" }}>
      <Card.Body className="text-center py-3 text-light d-flex justify-content-center flex-column">
        <Card.Title className="m-5">{count}</Card.Title>
        <Card.Text className="fw-bolder fs-2">{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};
