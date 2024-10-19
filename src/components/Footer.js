"use client"
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-300 text-black py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Us Section */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">About Us</h2>
          <p className="text-sm md:text-base">
            We are a leading company in our industry, committed to providing quality services. Our mission is to make your services experience better as enjoyable and convenient as possible.
          </p>
        </div>

        {/* Connect with Us Section */}
        <div className='flex flex-col text-center items-center'>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Connect with Us</h2>
          <ul className="flex gap-4 justify-center pt-4">
            <li><a href="https://facebook.com" className="hover:underline text-black"> <FaFacebook size={20}/> Facebook</a></li>
            <li><a href="https://Whatsapp.com" className="hover:underline text-black"> <FaWhatsapp size={20}/> Whatsapp</a></li>
            <li><a href="https://instagram.com" className="hover:underline text-black"> <FaInstagram size={20}/> Instagram</a></li>
            <li><a href="https://linkedin.com" className="hover:underline text-black"> <FaLinkedin size={20}/> LinkedIn</a></li>
          </ul>
        </div>

        {/* Navigate Section */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Navigate</h2>
          <ul>
            <li><a href="/contact" className="text-sm md:text-base hover:underline">Contact Us</a></li>
            <li><a href="/about" className="text-sm md:text-base hover:underline">About Us</a></li>
            <li><a href="/blog" className="text-sm md:text-base hover:underline">Blog</a></li>
            <li><a href="/services" className="text-sm md:text-base hover:underline">Our Services</a></li>
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Information</h2>
          <p className="text-sm md:text-base">
            <strong>Address:</strong><br />
            Gayatri Sales , Shop NO.2  <br/>mahavir sadan near Nirmala Niketan
                school Vinayak nagar road Bhayander west.<br/>
            <strong>Contact Number:</strong><br />
            +91-9594754553
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto text-center mt-8 text-xs md:text-sm text-gray-500">
        © 2024 Your Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
