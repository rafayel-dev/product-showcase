import { Card, Typography, Divider, Button, Space, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const {
    orderId,
    total,
    paymentMethod,
    address,
  } = state;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <Space direction="vertical" className="w-full" size="middle">
          <Title level={3}>🎉 Order Confirmed</Title>

          <Tag color="green">Order ID: {orderId}</Tag>

          <Divider />

          <div className="flex justify-between">
            <Text>Total Paid</Text>
            <Text strong>৳ {total}</Text>
          </div>

          <div className="flex justify-between">
            <Text>Payment Method</Text>
            <Text>{paymentMethod.toUpperCase()}</Text>
          </div>

          <Divider />

          <Text strong>Delivery Address</Text>
          <Text type="secondary">{address}</Text>

          <Divider />

          <Text type="secondary">
            📦 Estimated Delivery: 2–4 working days
          </Text>

          <Button
            type="primary"
            block
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
