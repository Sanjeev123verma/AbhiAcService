"use client";
import Image from "next/image";
import React from "react";

const AuthorizeServiceCentres = () => {
  const centres = [
    {
      name: "Panasonic",
      address: "123 Main Street, New Delhi",
      contact: "8069841333",
      logo: "/logos/brand2.png",
    },
    {
      name: "Voltas",
      address: "456 Elm Street, Mumbai",
      contact: "9650694555 / 1860 599 4555",
      logo: "/logos/brand5.png",
    },
    {
      name: "Sansui",
      address: "789 Pine Avenue, Bengaluru",
      contact: "080-54321678",
      logo: "/logos/sansui1.png",
    },
  ];

  return (
    <div className="bg-gray-50 py-10 w-full px-6 lg:px-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Our Authorized Service Centres
        </h1>
        <p className="text-gray-600">
          Find our trusted service centers for reliable assistance.
        </p>
      </div>

      {/* Centered Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {centres.map((centre, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {/* Image Container */}
            <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
              <Image
                src={centre.logo}
                alt={`${centre.name} Logo`}
                width={150}
                height={80}
                className="object-contain"
                priority={index < 2}
              />
            </div>

            {/* Text Details */}
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {centre.name}
              </h2>
              <p className="text-gray-600">{centre.address}</p>
              <p className="text-gray-600">{centre.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorizeServiceCentres;
