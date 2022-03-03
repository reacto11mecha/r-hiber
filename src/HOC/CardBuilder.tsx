import { Card } from "react-bootstrap";
import type { ReactNode } from "react";

const CardBuilder = ({
  width = "26em",
  title,
  children,
}: {
  width?: string;
  title: string;
  children: ReactNode;
}) => (
  <Card style={{ width }}>
    <Card.Body>
      <Card.Title style={{ fontWeight: "600" }}>{title}</Card.Title>
      {children}
    </Card.Body>
  </Card>
);

export default CardBuilder;
