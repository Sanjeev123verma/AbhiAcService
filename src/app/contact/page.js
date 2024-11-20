"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PageHeader from "@/components/Pageheader";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const searchParams = useSearchParams(); // Initialize the router
  const service = searchParams.get('service');  // Get the service query parameter


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(''); // Clear previous status message
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatusMessage('Thank you for your message! Our Technician will visit to you soon.');
        setFormData({
          name: '',
          phone: '',
          address: '',
          service: '',
          message: '',
        });
      } else {
        setStatusMessage(result.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setStatusMessage('An error occurred. Please try again.');
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <>
      <PageHeader title="Contact us" breadcrumb=" /Contact" />
      <div className="container mx-auto px-4 py-2 w-4/5">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
        <div className="flex flex-col md:flex-row justify-between mx-auto gap-8">
        <div className="md:w-[100%] p-10 bg-blue-200">
        <h2 className="text-2xl font-semibold mb-4">{service || "Contact Form"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-2 border rounded"
                required
              />
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
                required
              />
              <label htmlFor="address" className="sr-only">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded h-16"
                required
              ></textarea>
              <label htmlFor="service" className="sr-only">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="" disabled>Select Service</option>
                <option value="AC Installation">AC Installation</option>
                <option value="AC Repair">AC Repair</option>
                <option value="AC Dry & Wet Service">AC Dry & Wet Service</option>
                <option value="AC Gas Charging">AC Gas Charging</option>
                <option value="PCB Repair">PCB Repair</option>
                <option value="Other Issue">Other Issue</option>
              </select>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full p-2 border rounded h-32"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
               Book now
              </button>
            </form>
            {statusMessage && <p className="mt-4 text-center text-lg font-bold text-red-500">{statusMessage}</p>}
          </div>

          {/* Contact Information */}
          <div className="bg-slate-100 rounded-lg p-5 shadow-md max-w-sm mx-auto font-abc text-xl">
            <h3 className="text-4xl font-extrabold mb-16 text-center">
              Contact Info
            </h3>
            <div className="mb-8 flex items-center">
              <FaMapMarkerAlt className="text-blue-500 text-4xl mr-2" />
              <p>
                Gayatri Sales , Shop NO.2 mahavir sadan near Nirmala Niketan
                school Vinayak nagar road Bhayander west.
              </p>
            </div>
            <div className="mb-8 flex items-center">
              <AiFillPhone className="text-blue-500 mr-2" />
              <p>8104556898</p>
            </div>
            <div className="mb-8 flex items-center">
              <AiOutlineMail className="text-blue-500 mr-2" />
              <p>gayatrisales1986@gmail.com</p>
            </div>
            <div className="mb-8 flex items-center">
              <FaGlobe className="text-blue-500 text-xl mr-2" />
              <p>www.abhiacservice.com</p>
            </div>
            <div className="flex justify-center space-x-3 text-blue-500 text-xl gap-4">
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
      <div className="m-2">
        <h1 className="text-4xl font-bold text-center mt-10 mb-2">
          Our Location
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3873013677403!2d72.84887097425795!3d19.30899304461867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b02b2d5c65cb%3A0xe2f32eb9fb1839ed!2sNirmala%20Niketan%20High%20School!5e0!3m2!1sen!2sin!4v1732011957419!5m2!1sen!2sin" 
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="shadow-lg rounded-lg"
        ></iframe>
      </div>
    </>
  );
};

export default ContactPage;

// import React from 'react';
// export default function Contact() {
//   return (
//     <>
//       {/* <Head>
//         <title>Contact Us</title>
//       </Head> */}
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Contact Form */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
//             <form>
//               <div className="mb-4">
//                 <input type="text" placeholder="Your Name" className="p-2 border rounded w-full"/>
//               </div>
//               <div className="mb-4">
//                 <input type="text" placeholder="Phone" className="p-2 border rounded w-full"/>
//               </div>
//               <div className="mb-4">
//                 <input type="email" placeholder="Email" className="p-2 border rounded w-full"/>
//               </div>
//               <div className="mb-4">
//                 <textarea placeholder="Message" className="p-2 border rounded w-full" rows="4"></textarea>
//               </div>
//               <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className="bg-blue-100 p-6 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
//             <ul>
//               <li className="mb-2"><strong>Address:</strong> Your Address Here</li>
//               <li className="mb-2"><strong>Phone:</strong> +123456789</li>
//               <li className="mb-2"><strong>Email:</strong> info@example.com</li>
//               <li className="mb-2"><strong>Website:</strong> www.example.com</li>
//             </ul>
//             {/* Social Media Icons */}
//             <div className="flex space-x-4 mt-4">
//               <a href="#" className="text-blue-600 hover:text-blue-800"><svg>...</svg></a>
//               <a href="#" className="text-blue-600 hover:text-blue-800"><svg>...</svg></a>
//               <a href="#" className="text-blue-600 hover:text-blue-800"><svg>...</svg></a>
//               <a href="#" className="text-blue-600 hover:text-blue-800"><svg>...</svg></a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const contact = () => {
//   return (
//     <>
//       <div className="p-6 max-w-4xl mx-auto">
//   <h2 className="text-2xl font-semibold">Your cart</h2>
//   <div className="border-t border-gray-200 mt-4">
//     <div className="flex items-center py-5">
//       <img src="../Images/aa.jpeg" className="w-20 h-20 object-cover" alt="Product" />
//       <div className="ml-4 flex-1">
//         <h4 className="font-medium text-lg">JOIN Wilde Perfume Stick</h4>
//         <p className="text-sm text-gray-600">Vanilla, rose | 30 ml / 1 fl oz</p>
//         <p className="text-gray-900 mt-2">€59,00</p>
//       </div>
//       <div className="flex items-center space-x-4">
//         <input type="number" value="1" className="w-16 border rounded px-2 py-1" />
//         <a href="#" className="text-blue-600">Remove</a>
//       </div>
//     </div>
//     {/* <!-- Repeat for other products --> */}
//     <div className="flex justify-between items-center mt-4 border-t pt-4">
//       <p className="text-xl font-semibold">Subtotal</p>
//       <p className="text-xl font-semibold">€137,00 EUR</p>
//     </div>
//     <p className="text-gray-500 text-sm mt-2">Taxes and <a href="#" className="text-blue-600">shipping</a> calculated at checkout</p>
//     <div className="mt-6 flex justify-between">
//       <button className="text-blue-600">CONTINUE SHOPPING</button>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded">CHECKOUT</button>
//     </div>
//   </div>
// </div>

//     </>
//   )
// }

// export default contact
