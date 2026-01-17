import React from "react";
import {
  Typography,
  Button,
  Divider,
  Card,
  Row,
  Col,
  Empty,
  Form,
  Input,
  Radio,
  Tag,
  Alert,
  Select,
  InputNumber,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "../utils/toast";
import { useWatch } from "antd/es/form/Form";
import { bangladeshDistricts } from "../data";
import { FiX } from "react-icons/fi";

const { Title, Text } = Typography;

const DELIVERY_CHARGE = {
  dhaka: 80,
  outside: 150,
};

interface CheckoutFormValues {
  fullName?: string;
  phone?: string;
  email?: string;
  district?: string;
  deliveryArea?: "dhaka" | "outside";
  address?: string;
  paymentMethod?: "cod" | "bkash" | "nagad";
  walletNumber?: string;
  transactionId?: string;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [form] = Form.useForm<CheckoutFormValues>();

  const paymentMethod = useWatch("paymentMethod", form);
  const deliveryArea = useWatch("deliveryArea", form);

  const COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
    SAVE15: { type: "percent", value: 15 },
    WELCOME50: { type: "flat", value: 50 },
  };

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = deliveryArea ? DELIVERY_CHARGE[deliveryArea] : 0;

  const formatCurrency = (amount: number) =>
    `৳ ${amount.toLocaleString("en-BD")}`;

  const couponCode = useWatch("coupon", form);

  const discount =
    couponCode && COUPONS[couponCode]
      ? COUPONS[couponCode].type === "percent"
        ? Math.round((subTotal * COUPONS[couponCode].value) / 100)
        : COUPONS[couponCode].value
      : 0;

  const totalAmount = subTotal + deliveryFee - discount;

  const handlePlaceOrder = (values: any) => {
    toast.success("অর্ডার সফলভাবে প্লেস করা হয়েছে 🎉");
    clearCart();
    navigate("/order-success", {
      state: {
        orderId: "ORD" + Date.now(),
        total: totalAmount,
        paymentMethod: values.paymentMethod,
        address: values.address,
      },
    });
  };

  /* ================= EMPTY CART ================= */
  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <Empty className="pb-2!" description="আপনার কার্ট খালি" />
          <Button
            className="bg-violet-500! hover:via-violet-600!"
            type="primary"
            size="large"
            onClick={() => navigate("/")}
          >
            আরো শপিং করুন
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Title level={2}>Checkout</Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            paymentMethod: "cod",
            deliveryArea: "dhaka",
          }}
          onFinish={handlePlaceOrder}
          className="mt-6"
        >
          <Row gutter={[24, 24]}>
            {/* ================= ORDER SUMMARY ================= */}
            <Col xs={24} md={12}>
              <Card title="🧾 Order Summary" bordered={false}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <Text
                        strong
                        className="block truncate md:whitespace-normal md:line-clamp-2 pb-1"
                      >
                        {item.title}
                      </Text>
                      <Text type="secondary" className="text-sm!">
                        {formatCurrency(item.price)} x
                        <InputNumber
                          className="ml-2! w-14!"
                          min={1}
                          value={item.quantity}
                          onChange={(value: number | null) =>
                            updateQuantity(item.id, value || 1)
                          }
                        />
                        <Button
                          type="text"
                          className="ml-2!"
                          danger
                          icon={<FiX />}
                          onClick={() => removeFromCart(item.id)}
                        />
                      </Text>
                    </div>

                    <Text strong className="whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity)}
                    </Text>
                  </div>
                ))}

                <Divider />

                <Form.Item name="coupon" className="w-1/3">
                  <Input placeholder="Promo Code" />
                </Form.Item>

                {couponCode &&
                  (COUPONS[couponCode] ? (
                    <Text type="success" className="text-violet-500!">
                      ✔ Coupon applied (-{formatCurrency(discount)})
                    </Text>
                  ) : (
                    <Text type="danger">❌ Invalid coupon</Text>
                  ))}

                {discount > 0 && (
                  <div className="flex justify-between">
                    <Text strong className="text-violet-500!">
                      Discount
                    </Text>
                    <Text strong type="success" className="text-violet-500!">
                      - {formatCurrency(discount)}
                    </Text>
                  </div>
                )}

                <div className="flex justify-between">
                  <Text strong>Subtotal</Text>
                  <Text strong>{formatCurrency(subTotal)}</Text>
                </div>

                <div className="flex justify-between">
                  <Text strong>Delivery Charge</Text>
                  <Text strong>{formatCurrency(deliveryFee)}</Text>
                </div>

                <Divider />

                <div className="flex justify-between items-center">
                  <Text strong className="text-lg!">
                    Total Amount
                  </Text>
                  <Text strong className="text-lg!">
                    {formatCurrency(totalAmount)}
                  </Text>
                </div>

                <Tag color="violet" className="mt-2!">
                  <span className="text-[10px] md:text-xs lg:text-xs">
                    ✔ Cash on Delivery available all over Bangladesh
                  </span>
                </Tag>
              </Card>
            </Col>

            {/* ================= SHIPPING & PAYMENT ================= */}
            <Col xs={24} md={12}>
              <Text className="ml-2!" type="secondary">
                সঠিক তথ্য দিন, আমরা দ্রুত ডেলিভারি দেব 🚚
              </Text>
              <Card
                title="📦 Shipping & Payment"
                bordered={false}
                className="md:sticky"
              >
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: "নাম লিখুন" }]}
                >
                  <Input placeholder="আপনার পুরো নাম" />
                </Form.Item>

                <Form.Item
                  label="Mobile Number"
                  name="phone"
                  rules={[{ required: true, message: "মোবাইল নাম্বার দিন" }]}
                >
                  <Input placeholder="মোবাইল নাম্বার দিন" />
                </Form.Item>

                <Form.Item label="Email Address (Optional)" name="email">
                  <Input placeholder="ইমেইল ঠিকানা দিন" />
                </Form.Item>

                <Form.Item
                  label="District"
                  name="district"
                  rules={[{ required: true, message: "জেলা নির্বাচন করুন" }]}
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder="জেলা নির্বাচন করুন"
                    virtual={false}
                    getPopupContainer={(node) => node.parentElement!}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.value as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(value) => {
                      form.setFieldsValue({
                        deliveryArea: value === "Dhaka" ? "dhaka" : "outside",
                      });
                    }}
                  >
                    {bangladeshDistricts.map((item) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item name="deliveryArea" rules={[{ required: true }]}>
                  <Radio.Group disabled>
                    <Radio value="dhaka">
                      Inside Dhaka {formatCurrency(DELIVERY_CHARGE.dhaka)}
                    </Radio>
                    <Radio value="outside">
                      Outside Dhaka {formatCurrency(DELIVERY_CHARGE.outside)}
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Delivery Address"
                  name="address"
                  rules={[{ required: true, message: "ঠিকানা লিখুন" }]}
                >
                  <Input.TextArea rows={3} placeholder="বাসা/রোড/এলাকা, জেলা" />
                </Form.Item>

                {/* ================= PAYMENT METHOD ================= */}
                <Form.Item label="Payment Method" name="paymentMethod">
                  <Radio.Group className="w-full">
                    <Radio value="cod">
                      Cash on Delivery
                      <Tag color="violet" className="ml-2!">
                        Popular
                      </Tag>
                    </Radio>
                    <Radio value="bkash">bKash</Radio>
                    <Radio value="nagad">Nagad</Radio>
                  </Radio.Group>
                </Form.Item>

                {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                  <>
                    <Alert
                      type="info"
                      showIcon
                      className="mb-3!"
                      message="Payment Instruction"
                      description={`অনুগ্রহ করে 01751876070 Personal ${paymentMethod} এ ${formatCurrency(
                        totalAmount
                      )} ক্যাশ ইন অথবা সেন্ড মানি করুন এবং Transaction ID দিন`}
                    />

                    <Form.Item
                      label="Wallet Number"
                      name="walletNumber"
                      rules={[{ required: true, message: "নাম্বার দিন" }]}
                    >
                      <Input placeholder="01XXXXXXXXX" />
                    </Form.Item>

                    <Form.Item
                      label="Transaction ID"
                      name="transactionId"
                      rules={[{ required: true, message: "Txn ID দিন" }]}
                    >
                      <Input placeholder="Transaction ID" />
                    </Form.Item>
                  </>
                )}

                <Button
                  type="primary"
                  className="bg-violet-500! hover:bg-violet-600!"
                  size="large"
                  block
                  htmlType="submit"
                >
                  Confirm Order ({formatCurrency(totalAmount)})
                </Button>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
