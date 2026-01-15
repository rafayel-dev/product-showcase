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

  const { orderId, total, paymentMethod, address } = state;

  const formatCurrency = (amount: number) =>
    `৳ ${Number(amount).toLocaleString("en-BD")}`;

  const handleDownloadInvoice = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/orders/${orderId}/invoice`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <Space direction="vertical" className="w-full" size="middle">
          <Title level={3}>✅ অর্ডার সফল হয়েছে 🎉</Title>

          <div className="flex items-center justify-between">
            <Tag color="violet">Order ID: {orderId}</Tag>
            <Button
              type="default"
              className="text-violet-500! hover:border-violet-600! w-1/3! text-xs!"
              block
              onClick={handleDownloadInvoice}
            >
              Download Invoice (PDF)
            </Button>
          </div>
          <Divider />

          <div className="flex justify-between">
            <Text>Total Paid</Text>
            <Text strong>{formatCurrency(total)}</Text>
          </div>

          <div className="flex justify-between">
            <Text>Payment Method</Text>
            <Text className="uppercase">{paymentMethod}</Text>
          </div>

          <Divider />

          <Text strong>Delivery Address</Text>
          <Text type="secondary">{address}</Text>

          <Divider />

          <Text type="secondary">📦 Estimated Delivery: 2–4 working days</Text>

          {/* ===== ACTION BUTTONS ===== */}

          <Button
            type="primary"
            className="bg-violet-500! hover:bg-violet-600! py-6! text-lg!"
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
