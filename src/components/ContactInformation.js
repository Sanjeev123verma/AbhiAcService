import React from "react";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import {
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaWhatsappSquare,
} from "react-icons/fa";

export const ContactInformation = () => {
  return (
    <div className="bg-slate-100 rounded-lg p-5 shadow-md max-w-sm mx-auto font-abc text-xl">
      <h1 className="text-4xl font-extrabold my-12 text-center">
        Contact Info
      </h1>
      <div className="mb-8 flex items-center space-x-4">
        <FaMapMarkerAlt className="text-blue-500 text-6xl" />
        <p>
          Gayatri Sales , Shop NO.2 mahavir sadan near Nirmala Niketan school
          Vinayak nagar road Bhayander west.
        </p>
      </div>
      <div className="mb-8 flex items-center space-x-8">
        <AiFillPhone className="text-blue-500 text-4xl" />
        <p>+91-8104556898</p>
      </div>
      <div className="mb-8 flex items-center space-x-4">
        <AiOutlineMail className="text-blue-500 text-4xl" />
        <p>abhiacservice@gmail.com</p>
      </div>
      <div className="mb-12 flex items-center space-x-6">
        <FaGlobe className="text-blue-500 text-4xl " />
        <p>www.abhiacservice.com</p>
      </div>
      <div className="flex justify-center space-x-3 text-blue-500 text-xl gap-6">
        <FaFacebook />
        <FaTwitter />
        <FaLinkedin />
        <FaWhatsappSquare />
      </div>
    </div>
  );
};
