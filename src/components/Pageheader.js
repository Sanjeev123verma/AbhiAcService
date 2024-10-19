// components/PageHeader.js
"use clients";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaGlobe } from 'react-icons/fa'; 

const PageHeader = ({ title, breadcrumb }) => {
  return (

    <div className=" bg-blue-400 text-white text-2xl p-2 flex justify-between items-center">
      <div className="ml-8">
        <h1 className="text-4xl font-bold text-black">{title}</h1>
        <div className=" flex items-center mt-2">
          <Link href="/">
            {" "}
            <IoHomeOutline className="text-3xl pr-2"/>{" "}
          </Link>
          <p className="text-white">{breadcrumb}</p>
        </div>
      </div>

      
        {/* Additional content if needed */}
        <div className="flex items-center">
          <AiFillPhone className="text-3xl mr-2" />
          <p>9594754553</p>
        </div>
        <div className="flex items-center">
          <AiOutlineMail className="text-3xl mr-2" />
          <p>gayatrisales1986@gmail.com</p>
        </div>
        <div className="flex items-center mr-8">
          <FaGlobe className="text-3xl mr-2" />
          <p>www.GayatriSales.com</p>
        </div>
    </div>
  );
};

export default PageHeader;
