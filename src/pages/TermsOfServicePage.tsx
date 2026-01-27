import React, { useState, useEffect } from "react";
import { Typography, Divider } from "antd";
import AppCard from "../components/common/AppCard";
import {
  FaFileContract,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaExclamationTriangle,
  FaQuestionCircle,
} from "react-icons/fa";
import { getSetting } from "../services/settingService";

const { Title, Paragraph, Text } = Typography;

const STORE_NAME = "Your Store Name";
const SUPPORT_EMAIL = "support@yourstore.com";
const SUPPORT_PHONE = "01751876070";

const TermsOfServicePage: React.FC = () => {
  const [termsContent, setTermsContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSetting("terms_of_service").then((setting) => {
      if (setting?.value) {
        setTermsContent(setting.value);
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
          Terms of Service
        </h1>
        <p className="text-violet-100 text-lg max-w-2xl mx-auto px-4">
          আমাদের সেবা ব্যবহারের শর্তাবলী
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-10">
        <AppCard className="shadow-xl border-0! rounded-2xl">
          <div className="text-center mb-8">
            <Text type="secondary" className="text-sm uppercase tracking-wider">
              Last updated: {new Date().toLocaleDateString("en-BD")}
            </Text>
          </div>

          <Paragraph className="text-lg text-gray-700 leading-relaxed mb-8">
            এই Terms of Service আপনার এবং <strong>{STORE_NAME}</strong>-এর মধ্যে
            একটি আইনি চুক্তি। আমাদের ওয়েবসাইট ব্যবহার করার পূর্বে অনুগ্রহ করে
            শর্তাবলী মনোযোগ সহকারে পড়ুন। ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি এই
            শর্তাবলীতে সম্মত হচ্ছেন।
          </Paragraph>

          <Divider />

          {termsContent ? (
            <div
              className="prose prose-violet max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: termsContent }}
            />
          ) : (
            <div className="space-y-10">
              {/* 1 */}
              <Section
                icon={<FaFileContract size={20} />}
                color="orange"
                title="1. Use of Website"
              >
                এই ওয়েবসাইট শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করা যাবে। কোনো প্রকার
                অবৈধ, প্রতারণামূলক বা ক্ষতিকর কার্যকলাপ সম্পূর্ণভাবে নিষিদ্ধ।
                আমাদের পূর্বানুমতি ছাড়া ওয়েবসাইটের কোনো কন্টেন্ট কপি, পুনঃপ্রকাশ
                বা বিতরণ করা যাবে না।
              </Section>

              {/* 2 */}
              <Section
                icon={<FaShoppingCart size={20} />}
                color="violet"
                title="2. Orders & Pricing"
              >
                পণ্যের মূল্য, অফার ও ডিসকাউন্ট সময় অনুযায়ী পরিবর্তন হতে পারে।
                আমরা সর্বোচ্চ চেষ্টা করি সঠিক তথ্য প্রদর্শনের জন্য, তবে কোনো
                কারিগরি বা মানবিক ত্রুটির কারণে ভুল মূল্য প্রদর্শিত হলে
                {STORE_NAME} সংশ্লিষ্ট অর্ডার বাতিল করার অধিকার সংরক্ষণ করে।
              </Section>

              {/* 3 */}
              <Section
                icon={<FaTruck size={20} />}
                color="green"
                title="3. Delivery Policy"
              >
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>ঢাকার ভিতরে:</strong> ১–২ কর্মদিবস
                    </li>
                    <li>
                      <strong>ঢাকার বাইরে:</strong> ২–৪ কর্মদিবস
                    </li>
                    <li>
                      অনিবার্য কারণে (আবহাওয়া, প্রাকৃতিক দুর্যোগ বা রাজনৈতিক
                      পরিস্থিতি) ডেলিভারি সময় বিলম্বিত হতে পারে।
                    </li>
                  </ul>
                </div>
              </Section>

              {/* 4 */}
              <Section
                icon={<FaUndo size={20} />}
                color="violet"
                title="4. Return & Refund Policy"
              >
                আমরা গ্রাহক সন্তুষ্টিকে সর্বোচ্চ গুরুত্ব দিই। পণ্য গ্রহণের পর
                কোনো সমস্যা থাকলে নিম্নলিখিত শর্তে রিটার্ন গ্রহণযোগ্য:
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>
                    পণ্য গ্রহণের <strong>৭ দিনের</strong> মধ্যে রিটার্ন করতে হবে
                  </li>
                  <li>
                    পণ্য অবশ্যই অব্যবহৃত, অবিকৃত এবং অরিজিনাল প্যাকেজিং-এ থাকতে হবে
                  </li>
                  <li>
                    রিফান্ড (প্রযোজ্য হলে) ৭–১০ কর্মদিবসের মধ্যে প্রসেস করা হবে
                  </li>
                  <li>
                    পণ্যে কোনো ত্রুটি না থাকলে রিটার্ন চার্জ ক্রেতাকে বহন করতে হতে পারে
                  </li>
                </ul>
              </Section>

              {/* 5 */}
              <Section
                icon={<FaExclamationTriangle size={20} />}
                color="green"
                title="5. Limitation of Liability"
              >
                প্রাকৃতিক দুর্যোগ, কুরিয়ার বিলম্ব বা আমাদের নিয়ন্ত্রণের বাইরে থাকা
                কোনো পরিস্থিতির কারণে সৃষ্ট ক্ষতি বা বিলম্বের জন্য
                {STORE_NAME} আইনগতভাবে দায়বদ্ধ থাকবে না। তবে আমরা সর্বোচ্চ
                সহযোগিতার মাধ্যমে সমস্যা সমাধানে সচেষ্ট থাকবো।
              </Section>
            </div>
          )}

          {/* Contact */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-10">
            <div className="flex items-center gap-3 mb-4">
              <FaQuestionCircle className="text-violet-600 text-xl" />
              <Title level={4} className="m-0!">
                Questions?
              </Title>
            </div>

            <Paragraph className="text-gray-700">
              শর্তাবলী সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন:
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
const Section = ({ icon, title, color, children }: any) => (
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

export default TermsOfServicePage;
