import React, { useState, useEffect } from "react";
import { Typography, Divider } from "antd";
import AppCard from "../components/common/AppCard";
import {
  FaShieldAlt,
  FaUserSecret,
  FaLock,
  FaDatabase,
  FaEnvelope,
} from "react-icons/fa";
import { getSetting } from "../services/settingService";

const { Title, Paragraph, Text } = Typography;

const STORE_NAME = "Your Store Name";
const SUPPORT_EMAIL = "support@yourstore.com";
const SUPPORT_PHONE = "01751876070";

const PrivacyPolicyPage: React.FC = () => {
  const [privacyContent, setPrivacyContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSetting("privacy_policy").then((setting) => {
      if (setting?.value) {
        setPrivacyContent(setting.value);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen font-nunito pb-12">
      {/* Header */}
      <div className="bg-violet-700 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-violet-100 text-lg max-w-2xl mx-auto px-4">
          আপনার ব্যক্তিগত তথ্যের নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <AppCard className="shadow-xl border-0! rounded-2xl">
          <div className="text-center mb-8">
            <Text type="secondary" className="text-sm uppercase tracking-wider">
              Last updated: {new Date().toLocaleDateString("en-BD")}
            </Text>
          </div>

          <Paragraph className="text-lg text-gray-700 leading-relaxed mb-8">
            <strong>{STORE_NAME}</strong> আপনার ব্যক্তিগত তথ্যের গোপনীয়তা
            রক্ষায় প্রতিশ্রুতিবদ্ধ। এই Privacy Policy ব্যাখ্যা করে আমরা কীভাবে
            আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করি।
          </Paragraph>

          <Divider />

          {privacyContent ? (
            <div
              className="prose prose-violet max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: privacyContent }}
            />
          ) : (
            <div className="space-y-10">
              {/* 1 */}
              <Section
                icon={<FaDatabase size={20} />}
                color="violet"
                title="1. Information We Collect"
              >
                আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>ব্যক্তিগত তথ্য: নাম, মোবাইল নম্বর, ইমেইল ঠিকানা</li>
                  <li>শিপিং তথ্য: ডেলিভারি ঠিকানা, পোস্ট কোড</li>
                  <li>লেনদেন সংক্রান্ত তথ্য: অর্ডার ও পেমেন্টের বিস্তারিত</li>
                </ul>
              </Section>

              {/* 2 */}
              <Section
                icon={<FaUserSecret size={20} />}
                color="orange"
                title="2. How We Use Your Information"
              >
                আপনার তথ্য ব্যবহার করা হয়:
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>অর্ডার প্রসেস ও সফল ডেলিভারির জন্য</li>
                  <li>কাস্টমার সাপোর্ট ও সমস্যা সমাধানের জন্য</li>
                  <li>
                    অর্ডার আপডেট ও প্রমোশনাল নোটিফিকেশন পাঠাতে
                    (আপনার সম্মতিসহ)
                  </li>
                </ul>
              </Section>

              {/* 3 */}
              <Section
                icon={<FaLock size={20} />}
                color="green"
                title="3. Data Security"
              >
                আমরা আপনার তথ্য সুরক্ষার জন্য আধুনিক প্রযুক্তিগত ও প্রশাসনিক
                ব্যবস্থা গ্রহণ করি। SSL এনক্রিপশন ও নিরাপদ সার্ভার ব্যবহারের মাধ্যমে
                তথ্য সংরক্ষণ করা হয়। আপনার তথ্য কখনোই তৃতীয় পক্ষের কাছে বিক্রি
                করা হয় না।
              </Section>

              {/* 4 */}
              <Section
                icon={<FaShieldAlt size={20} />}
                color="violet"
                title="4. Payments & Cash on Delivery"
              >
                আমরা Cash on Delivery (COD), bKash, Nagad সহ অনুমোদিত পেমেন্ট
                মাধ্যম গ্রহণ করি। পেমেন্ট গেটওয়ে ব্যতীত কোনো কার্ড তথ্য আমাদের
                সিস্টেমে সংরক্ষণ করা হয় না।
              </Section>
            </div>
          )}

          {/* Contact */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-violet-600 text-xl" />
              <Title level={4} className="m-0!">
                Contact Us
              </Title>
            </div>

            <Paragraph className="text-gray-700">
              Privacy Policy সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ
              করুন:
            </Paragraph>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <ContactCard label="Email Support" value={SUPPORT_EMAIL} />
              <ContactCard label="Phone Support" value={SUPPORT_PHONE} />
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
};

/* Reusable Components */
const Section = ({
  icon,
  title,
  color,
  children,
}: any) => (
  <div className="flex gap-4">
    <div
      className={`hidden md:flex min-w-12 h-12 bg-${color}-100 rounded-full items-center justify-center text-${color}-600 mt-1`}
    >
      {icon}
    </div>
    <div>
      <Title level={4} className="text-violet-700!">
        {title}
      </Title>
      <Paragraph className="text-gray-600">{children}</Paragraph>
    </div>
  </div>
);

const ContactCard = ({ label, value }: any) => (
  <div className="bg-white p-3 rounded-lg shadow-sm">
    <Text type="secondary" className="text-xs uppercase">
      {label}
    </Text>
    <Paragraph className="m-0 font-bold text-violet-600">
      {value}
    </Paragraph>
  </div>
);

export default PrivacyPolicyPage;
