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
    <div className=" bg-gray-50 my-4">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Our Authorized Service Centres
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Find our trusted service centers for reliable assistance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {centres.map((centre, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={centre.logo}
                alt={`${centre.name} Logo`}
                className="w-full h-40 object-contain bg-gray-100"
              />
              <div className="p-4">
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
    </div>
  );
};

export default AuthorizeServiceCentres;
