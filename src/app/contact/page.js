"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PageHeader from "@/components/Pageheader";
import { AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaGlobe, FaWhatsappSquare } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const searchParams = useSearchParams(); // Initialize the router
  const service = searchParams.get('service');  // Get the service query parameter


  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "name") {
      // Name must contain only letters and spaces, and be 3-50 characters long
      if (!/^[A-Za-z\s]{3,20}$/.test(value)) {
        error = "Name should be 3-20 characters long and contain only letters.";
      }
    }

    if (name === "phone") {
      // Phone must be 10 digits (Indian mobile number format)
      if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Phone number must be a valid 10-digit number.";
      }
    }

    if (name === "message" && value.length > 0 ) {
      // Optional validation: Ensure message isn't too short
      if (value.length < 5) {
        error = "Message should be at least 5 characters long.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(''); // Clear previous status message
    setIsPopupVisible(false);

    // Validate all fields before submitting
    const newErrors = {};
    if (!/^[A-Za-z\s]{3,50}$/.test(formData.name)) {
      newErrors.name = "Name should be 3-20 characters long and contain only letters.";
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be a valid 10-digit number.";
    }
    if (!formData.address) {
      newErrors.address = "Address is required.";
    }
    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }
    if (formData.message && formData.message.length < 5) {
      newErrors.message = "Message should be at least 5 characters long.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Stop submission if there are validation errors
      return;
    }
    
    
    
    
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
        setStatusMessage('Thank you for your message! Our Technician will Contact to you soon.');
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
    setIsPopupVisible(true); 
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Hide the pop-up
  };

  return (
    <>
      <PageHeader title="Contact us" breadcrumb=" Contact us" />
      <div className="container mx-auto px-4 py-2 md:w-4/5 items-center text-center">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
        <div className="flex flex-col md:flex-row justify-between mx-auto gap-8">
        <div className="md:w-[100%] p-4 sm:p-12 bg-blue-200">
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
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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
               {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

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
              {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}

              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full p-2 border rounded h-32"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
               Book now
              </button>
            </form>
          </div>


          {/* Contact Information */}
          <div className="bg-slate-100 rounded-lg p-5 shadow-md max-w-sm mx-auto font-abc text-xl">
            <h1 className="text-4xl font-extrabold my-12 text-center">
              Contact Info
            </h1>
            <div className="mb-8 flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-6xl" />
              <p>
                Gayatri Sales , Shop NO.2 mahavir sadan near Nirmala Niketan
                school Vinayak nagar road Bhayander west.
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
        </div>
      </div>

        {/* Pop-up */}
        {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md text-center">
            <p className="text-lg text-green-600 font-semibold">{statusMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
