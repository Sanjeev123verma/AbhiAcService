"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import AcServiceInfo from "@/components/AcServiceInfo";
import PageHeader from "@/components/Pageheader";

// -------------------- MAIN PAGE -------------------- //
export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" breadcrumb=" Services" />
      <section className="relative overflow-hidden">
        {/* <div
          className=" h-screen absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: \"url('/Images/background-image.jpg')\" }}
        /> */}
        <AcServiceInfo />
        <Brands />
        <Cards />
      </section>
    </>
  );
}

// -------------------- CARD SECTION -------------------- //
const Cards = () => {
  const router = useRouter();

  const services = [
    {
      title: "AC Dry Service",
      originalPrice: "₹399",
      discountedPrice: "₹299",
      image: "/Images/w1.jpeg",
    },
    {
      title: "AC Jacket Chemical Jet Wash Service",
      originalPrice: "₹499",
      discountedPrice: "₹399",
      image: "/Images/m1.jpeg",
    },
    {
      title: "Ac Full Chemical Wash",
      originalPrice: "₹1699",
      discountedPrice: "₹1499",
      image: "/images/hitachi-ac.jpg",
    },
    {
      title: "Daikin AC Service & Repair",
      image: "/images/daikin-ac.jpg",
    },
    {
      title: "Ac Unistallation",
      originalPrice: "₹599",
      discountedPrice: "₹499",
      image: "/images/other-brands-ac.jpg",
    },
    {
      title: "AC Installation",
      originalPrice: "₹1416",
      discountedPrice: "₹999",
      image: "/Images/w2.jpeg",
    },
    {
      title: "AC Gas Filling R32, R410, R22, R290 (3 Months Warranty Included)",
      originalPrice: "₹3499",
      discountedPrice: "₹2999",
      image: "/logos/gas.jpeg",
    },
  ];

  // Handle button click and redirect to the /contact page with the full title as a query param
  const handleBookNow = (title) => {
    router.push(`/contact?service=${encodeURIComponent(title)}`);
  };

  return (
    <div className="m-2">
      <h3 className="text-4xl font-headerfont font-semibold mb-8 text-center bg-gray-400 py-2">
        Our Trending Services
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-orange-50 rounded-lg shadow-lg overflow-hidden z-10"
          >
            {/* Image Container */}
            <div className="relative w-full h-60">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority={index < 2} // optional: prioritize first few images
              />
            </div>

            <div className="p-4">
              <h4 className="text-lg font-semibold text-center">
                {service.title}
              </h4>

              <div className="flex justify-between pt-2">
                <div className="ml-8 pt-3">
                  {service.originalPrice && (
                    <span className="text-lg font-medium line-through text-gray-500 mr-2">
                      {service.originalPrice}
                    </span>
                  )}
                  {service.discountedPrice && (
                    <span className="text-lg font-medium text-black">
                      {service.discountedPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleBookNow(service.title)}
                  className="w-full bg-blue-500 mx-5 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------- BRANDS SECTION -------------------- //
const Brands = () => {
  const brands = [
    { name: "Hitachi", src: "/logos/brand1.png" },
    { name: "Panasonic", src: "/logos/brand2.png" },
    { name: "Vester", src: "/logos/brand3.png" },
    { name: "LG", src: "/logos/brand4.png" },
    { name: "Voltas", src: "/logos/brand5.png" },
    { name: "Videocon", src: "/logos/brand6.png" },
    { name: "Samsung", src: "/logos/brand7.png" },
    { name: "Onida", src: "/logos/brand8.png" },
    { name: "Fedders", src: "/logos/brand9.png" },
    { name: "Daikin", src: "/logos/brand10.png" },
    { name: "General", src: "/logos/brand11.png" },
    { name: "Sansui", src: "/logos/sansui1.png" },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        WE SERVICE <span className="text-purple-600">ALL BRANDS</span>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
