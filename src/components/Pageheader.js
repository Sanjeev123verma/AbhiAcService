// components/PageHeader.js
"use clients";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaGlobe } from 'react-icons/fa'; 

const PageHeader = ({ title, breadcrumb }) => {
  return (

    <div className="mt-12 p-1 px-4 bg-blue-400 text-white text-lg flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    {/* Title and Breadcrumb */}
    <div className="md:ml-8 text-center items-center pt-2 md:text-left">
      <h1 className="text-2xl md:text-4xl font-bold text-black">{title}</h1>
      <div className="flex items-center justify-center md:justify-start pt-1 space-x-2">
        <Link href="/" passHref>
          <IoHomeOutline className="text-2xl md:text-3xl" />
        </Link>
        <p className="text-white text-sm md:text-base">{breadcrumb}</p>
      </div>
    </div>

    {/* Contact Information */}
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
      <div className="flex items-center space-x-2">
        <AiFillPhone className="text-2xl md:text-3xl" />
        <p className="text-sm md:text-lg">8104556898</p>
      </div>
      <div className="flex items-center space-x-2">
        <AiOutlineMail className="text-2xl md:text-3xl" />
        <p className="text-sm  md:text-lg">gayatrisales1986@gmail.com</p>
      </div>
      <div className="flex items-center space-x-2">
        <FaGlobe className="text-2xl md:text-3xl" />
        <p className="text-sm md:text-lg">www.abhiacservice.com</p>
      </div>
    </div>
  </div>
  );
};

export default PageHeader;
