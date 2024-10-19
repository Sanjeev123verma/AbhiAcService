import React from 'react'
import AcServiceInfo from '@/components/AcServiceInfo';
import PageHeader from '@/components/Pageheader';


export default function Services () {
  return (
     <>
     <PageHeader title="Our Services" breadcrumb="/ Service" />
     <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/Images/background-image.jpg')" }}> </div>
      <AcServiceInfo/>
      <Cards/>
    </section>
     </>  
  );
};


// This is a CARD section 
const Cards = () => {

  const services = [
    { title: "Voltas AC Service & Repair", image: "/images/w1.jpeg" },
    { title: "LG AC Service & Repair", image: "/images/w2.jpeg" },
    { title: "Samsung AC Service & Repair", image: "/images/samsung-ac.jpg" },
    { title: "Lloyd AC Service & Repair", image: "/images/lloyd-ac.jpg" },
    { title: "Hitachi AC Service & Repair", image: "/images/hitachi-ac.jpg" },
    { title: "Daikin AC Service & Repair", image: "/images/daikin-ac.jpg" },
    { title: "Other Brands AC Service & Repair", image: "/images/other-brands-ac.jpg" },
  ];

  return (
      <div className='m-2'>
      <h3 className="text-4xl font-headerfont font-semibold mb-8 text-center bg-gray-400 py-2">Our Trending Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden z-10">
              <img src={service.image} alt={service.title} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};
