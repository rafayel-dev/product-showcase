import { Tooltip } from "antd";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat: React.FC = () => {
  const phoneNumber = "8801751876070";
  const message = "Hello, I need some help!";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-16 right-6 md:right-8 md:bottom-8 z-50 group flex items-center">

      {/* Button */}
      <Tooltip title="Chat with us" placement="left" color="#fff">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full
          bg-green-500 text-white shadow-xl
          transition-all duration-300 ease-out
          hover:bg-green-600 hover:scale-110"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-600/50 animate-ping group-hover:animate-none" />

        {/* Icon */}
        <FaWhatsapp
          size={30}
          className="relative transition-transform duration-300 group-hover:rotate-12"
        />
      </a>
      </Tooltip>
    </div>
  );
};

export default WhatsAppFloat;
