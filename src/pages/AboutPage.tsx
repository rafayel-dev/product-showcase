import React from "react";
import { FaUsers, FaShippingFast, FaHeadset, FaCheckCircle } from "react-icons/fa";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-violet-600 text-white text-center py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-nunito">
            আমাদের সম্পর্কে
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            আপনার বিশ্বস্ত অনলাইন শপিং পার্টনার
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          {/* Our Story Section */}
          <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 font-nunito">
                Our Story
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                আমাদের পথচলা শুরু হয় একটি সাধারণ লক্ষ্য নিয়ে - বাংলাদেশের প্রতিটি
                ঘরে ঘরে সুলভ মূল্যে মানসম্মত পণ্য পৌঁছে দেওয়া। আমরা বিশ্বাস করি,
                সঠিক পণ্য মানুষের জীবনযাত্রাকে আরও সহজ ও সুন্দর করে তুলতে পারে।
                এই বিশ্বাস থেকেই আমরা কঠোর পরিশ্রম এবং সততার সাথে আপনাদের সেবা
                দিয়ে যাচ্ছি।
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our journey began with a simple goal: to deliver quality
                products at affordable prices to every corner of Bangladesh. We
                believe that the right product can make life easier and more
                beautiful. With this belief, we are working hard and honestly to
                serve you.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://placehold.net/600x400.png"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 font-nunito">
              কেন আমাদের বেছে নিবেন?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              <div className="text-center">
                <FaCheckCircle className="text-violet-500 text-4xl mx-auto" />
                <h3 className="text-xl font-semibold mt-4">
                  মানসম্মত পণ্য
                </h3>
                <p className="text-gray-600 mt-2">
                  আমরা প্রতিটি পণ্যের গুণগত মান নিশ্চিত করি।
                </p>
              </div>
              <div className="text-center">
                <FaShippingFast className="text-violet-500 text-4xl mx-auto" />
                <h3 className="text-xl font-semibold mt-4">
                  দ্রুত ডেলিভারি
                </h3>
                <p className="text-gray-600 mt-2">
                  সারা বাংলাদেশে দ্রুততম সময়ে হোম ডেলিভারি।
                </p>
              </div>
              <div className="text-center">
                <FaHeadset className="text-violet-500 text-4xl mx-auto" />
                <h3 className="text-xl font-semibold mt-4">
                  চমৎকার গ্রাহক সেবা
                </h3>
                <p className="text-gray-600 mt-2">
                  আপনাদের যেকোনো প্রয়োজনে আমরা আছি ২৪/৭।
                </p>
              </div>
              <div className="text-center">
                <FaUsers className="text-violet-500 text-4xl mx-auto" />
                <h3 className="text-xl font-semibold mt-4">
                  বিশ্বস্ততার গ্যারান্টি
                </h3>
                <p className="text-gray-600 mt-2">
                  হাজারো গ্রাহকের আস্থা আমাদের সবচেয়ে বড় অর্জন।
                </p>
              </div>
            </div>
          </section>

          {/* Meet The Team Section */}
          <section>
            <h2 className="text-3xl font-bold text-center text-gray-800 font-nunito">
              Meet Our Team
            </h2>
            <p className="text-center text-gray-600 mt-2">
              The passionate people behind our success
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <img
                  src="https://placehold.net/avatar.svg"
                  alt="Team Member 1"
                  className="w-32 h-32 rounded-full mx-auto shadow-md"
                />
                <h3 className="text-xl font-semibold mt-4">Full Name</h3>
                <p className="text-gray-500">Co-Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="text-center">
                <img
                  src="https://placehold.net/avatar.svg"
                  alt="Team Member 2"
                  className="w-32 h-32 rounded-full mx-auto shadow-md"
                />
                <h3 className="text-xl font-semibold mt-4">Full Name</h3>
                <p className="text-gray-500">Co-Founder & CTO</p>
              </div>
              {/* Team Member 3 */}
              <div className="text-center">
                <img
                  src="https://placehold.net/avatar.svg"
                  alt="Team Member 3"
                  className="w-32 h-32 rounded-full mx-auto shadow-md"
                />
                <h3 className="text-xl font-semibold mt-4">Full Name</h3>
                <p className="text-gray-500">Chief Operating Officer</p>
              </div>
              {/* Team Member 4 */}
              <div className="text-center">
                <img
                  src="https://placehold.net/avatar.svg"
                  alt="Team Member 4"
                  className="w-32 h-32 rounded-full mx-auto shadow-md"
                />
                <h3 className="text-xl font-semibold mt-4">Full Name</h3>
                <p className="text-gray-500">Marketing Lead</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;