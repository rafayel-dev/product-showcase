import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat: React.FC = () => {
  const phoneNumber = "8801751876070";
  const message = "Hello, I need some help!";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-16 right-6 md:right-8 md:bottom-8 z-50 group flex items-center">
      {/* Tooltip */}
      <span
        className="mr-3 whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-md
        opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-300 ease-out"
      >
        Chat with us
      </span>

      {/* Button */}
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
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />

        {/* Icon */}
        <FaWhatsapp
          size={30}
          className="relative transition-transform duration-300 group-hover:rotate-12"
        />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
