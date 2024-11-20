import React from 'react';
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const whatsappNumber = '8104556898';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
      >
        <div className="p-3">
          <FaWhatsapp size={40} />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-20 right-1 bg-gray-900 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Contact on WhatsApp
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
