import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat: React.FC = () => {
  const phoneNumber = { phone: "8801751876070" };

  const message = "Hello, I need some help!";

  const whatsappLink = `https://wa.me/${phoneNumber.phone}?text=${encodeURIComponent(
    message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 group flex items-center">
      {/* Hover Text */}
      <span className="mr-2 bg-white text-black text-sm px-2 py-1 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Chat on WhatsApp
      </span>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white p-4 rounded-full shadow-lg"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
