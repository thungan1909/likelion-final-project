import { Card } from "antd";
export default function CustomCard() {
  return (
    <Card
      title="User"
      bordered={false}
      style={{
        width: 400,
        height: 200,
        marginRight: 24,
      }}
    >
      <h2>5537</h2>
    </Card>
  );
}
