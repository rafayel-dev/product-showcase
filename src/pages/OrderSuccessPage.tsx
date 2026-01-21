import {
  Card,
  Typography,
  Divider,
  Button,
  Space,
  Row,
  Col,
  Table,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

type InvoiceItem = {
  name: string;
  price: number;
  quantity: number;
};

const OrderSuccessPage: React.FC = () => {
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
    items = [] as InvoiceItem[],
    customerName = "Customer",
    customerEmail = "customer@email.com",
    orderDate = new Date().toISOString(),
    deliveryCharge = 100,
  } = state;

  const formatCurrency = (amount: number) =>
    `৳ ${Number(amount).toLocaleString("en-BD")}`;

  const handleDownloadInvoice = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/orders/${orderId}/invoice`,
      "_blank",
    );
  };

  const columns = [
    {
      title: "SL",
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as const,
    },
    {
      title: "Total",
      key: "total",
      align: "right" as const,
      render: (_: any, record: InvoiceItem) =>
        formatCurrency(record.price * record.quantity),
    },
  ];

  const subtotal = items.reduce(
    (sum: number, item: InvoiceItem) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-3xl shadow-md">
        <Space direction="vertical" size="large" className="w-full">
          {/* ===== HEADER ===== */}
          <div className="flex justify-between items-start">
            <div>
              <Title level={4} className="mb-1">
                🧾 Invoice
              </Title>
              <Text type="secondary">Thank you for your purchase!</Text>
            </div>
            <Button
              type="default"
              className="w-1/4!"
              onClick={handleDownloadInvoice}
            >
              Download Invoice (PDF)
            </Button>
          </div>

          <Divider />

          {/* ===== COMPANY & INVOICE INFO ===== */}
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Your Store Name</Text>
              <br />
              <Text type="secondary">Dhaka, Bangladesh</Text>
              <br />
              <Text type="secondary">support@yourstore.com</Text>
            </Col>
            <Col span={12} className="text-right">
              <Text>Invoice No:</Text>
              <br />
              <Text strong>{orderId}</Text>
              <br />
              <Text>Date:</Text>
              <br />
              <Text strong>
                {new Date(orderDate).toLocaleDateString("en-GB")}
              </Text>
            </Col>
          </Row>

          <Divider />

          {/* ===== CUSTOMER INFO ===== */}
          <div>
            <Text strong>Bill To</Text>
            <br />
            <Text>{customerName}</Text>
            <br />
            <Text type="secondary">{customerEmail}</Text>
            <br />
            <Text type="secondary">{address}</Text>
          </div>

          <Divider />

          {/* ===== INVOICE ITEMS TABLE ===== */}
          <Text strong>Invoice Items</Text>

          <Table
            columns={columns}
            dataSource={items}
            rowKey={(_, index) => index!.toString()}
            pagination={false}
            size="small"
            bordered
          />

          <Divider />

          {/* ===== PAYMENT SUMMARY ===== */}
          <Row gutter={[0, 8]}>
            <Col span={12}>
              <Text>Subtotal</Text>
            </Col>
            <Col span={12} className="text-right">
              <Text>{formatCurrency(subtotal)}</Text>
            </Col>

            <Col span={12}>
              <Text>Delivery Charge</Text>
            </Col>
            <Col span={12} className="text-right">
              <Text>{formatCurrency(deliveryCharge)}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Total Paid</Text>
            </Col>
            <Col span={12} className="text-right">
              <Text strong>{formatCurrency(total)}</Text>
            </Col>
          </Row>

          <Divider />

          {/* ===== PAYMENT & DELIVERY INFO ===== */}
          <Row gutter={16}>
            <Col span={12}>
              <Text type="secondary">Payment Method</Text>
              <br />
              <Text strong className="uppercase">
                {paymentMethod}
              </Text>
            </Col>
            <Col span={12}>
              <Text type="secondary">Estimated Delivery</Text>
              <br />
              <Text strong>2–4 Working Days</Text>
            </Col>
          </Row>

          <Divider />

          {/* ===== ACTION BUTTON ===== */}
          <Button
            type="primary"
            className="bg-violet-500! hover:bg-violet-600!"
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
