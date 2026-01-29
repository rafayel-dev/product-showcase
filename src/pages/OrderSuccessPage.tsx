import {
  Typography,
  Divider,
  Row,
  Col,
  Table,
} from "antd";
import { FiCheckCircle, FiDownload } from "react-icons/fi";
import AppButton from "../components/common/AppButton";
import AppCard from "../components/common/AppCard";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/price";
import { API_URL } from "../services/productService";

const { Title, Text } = Typography;

type InvoiceItem = {
  title: string;
  selectedColor?: string;
  selectedSize?: string;
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
    customerPhone = "1234567890",
    customerEmail = "customer@email.com",
    orderDate = new Date().toISOString(),
    deliveryCharge = 100,
    discount = 0,
    paymentStatus = "Pending",
  } = state;


  const handleDownloadInvoice = () => {
    window.open(
      `${API_URL}/orders/${orderId}/invoice`,
      "_blank",
    );
  };

  const columns = [
    {
      title: "SL",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      width: 60,
    },
    {
      title: "Item",
      dataIndex: "title",
      key: "title",
      render: (_: string, record: InvoiceItem) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">
            {record.title}
          </span>
          <span className="text-gray-400 text-xs font-normal">
            ({record.selectedColor || "N/A"}, {record.selectedSize || "N/A"})
          </span>
        </div>
      ),
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
      render: (_: unknown, record: InvoiceItem) =>
        formatCurrency(record.price * record.quantity),
    },
  ];

  const subtotal = items.reduce(
    (sum: number, item: InvoiceItem) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-nunito">
      <AppCard className="w-full max-w-3xl shadow-lg border-0! rounded-2xl overflow-hidden">
        {/* Success Banner */}
        <div className="bg-green-50 p-6 text-center border-b border-green-100 mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
            <FiCheckCircle />
          </div>
          <Title level={3} className="text-green-800! mb-1!">Order Placed Successfully!</Title>
          <Text type="secondary" className="text-green-700">Your order has been confirmed.</Text>
        </div>

        <div className="px-2 md:px-6 pb-6">
          {/* Action Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="text-center md:text-left">
              <Text type="secondary" className="block text-xs uppercase tracking-wide">Order ID</Text>
              <Title level={4} className="m-0! text-violet-600! font-mono">{orderId}</Title>
            </div>
            <AppButton
              onClick={handleDownloadInvoice}
              icon={<FiDownload />}
              className="bg-gray-100! text-gray-700! border-gray-200! hover:bg-gray-200!"
            >
              Download Invoice
            </AppButton>
          </div>

          <Row gutter={[24, 24]}>
            {/* Customer Details */}
            <Col xs={24} md={12}>
              <div className="bg-gray-50 p-4 rounded-lg h-full">
                <Text strong className="block mb-2 text-gray-800 bg-white inline-block px-2 py-1 rounded text-xs uppercase">Billing Details</Text>
                <div className="space-y-1">
                  <Text strong className="block text-lg">{customerName}</Text>
                  <Text className="block text-gray-700">{customerPhone}</Text>
                  <Text className="block text-gray-600 text-sm">{customerEmail}</Text>
                  <Text className="block text-gray-600 text-sm mt-2">{address}</Text>
                </div>
              </div>
            </Col>

            {/* Order Summary */}
            <Col xs={24} md={12}>
              <div className="bg-violet-50 p-4 rounded-lg h-full">
                <Text strong className="block mb-2 text-violet-800 bg-white inline-block px-2 py-1 rounded text-xs uppercase">Order Info</Text>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <Text type="secondary">Date:</Text>
                    <Text strong>{new Date(orderDate).toLocaleDateString("en-GB")}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Payment Method:</Text>
                    <Text strong className="uppercase text-violet-600">{paymentMethod}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Payment Status:</Text>
                    <Text strong className="text-violet-600">{paymentStatus}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Est. Delivery:</Text>
                    <Text strong>2–4 Days</Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Divider className="my-8" />

          {/* Items Table - Custom Styled */}
          <div>
            <Text strong className="block mb-4 text-xs uppercase tracking-wide text-gray-500">Items Ordered</Text>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table
                columns={columns}
                dataSource={items}
                rowKey={(_, index) => index!.toString()}
                pagination={false}
                size="small"
                className="[&_.ant-table-thead_th]:bg-gray-50! [&_.ant-table-thead_th]:text-gray-600! [&_.ant-table-row:last-child_td]:border-b-0"
              />
            </div>
          </div>

          {/* Totals Section */}
          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-gray-600">
                <Text>Subtotal</Text>
                <Text>{formatCurrency(subtotal)}</Text>
              </div>
              <div className="flex justify-between text-gray-600">
                <Text>Delivery</Text>
                <Text>{formatCurrency(deliveryCharge)}</Text>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-violet-500">
                  <Text>Discount</Text>
                  <Text>- {formatCurrency(discount)}</Text>
                </div>
              )}
              <Divider className="my-2" />
              <div className="flex justify-between items-center text-lg">
                <Text strong>Grand Total</Text>
                <Text strong className="text-violet-600 text-xl">{formatCurrency(total)}</Text>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <AppButton
              type="primary"
              size="large"
              className="px-8 rounded-full text-lg! shadow-lg hover:shadow-xl transition-all w-full"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </AppButton>
          </div>
        </div>
      </AppCard>
    </div>
  );
};

export default OrderSuccessPage;
