"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const images = [
  { src: "/logos/slide1.jpg", alt: "Image 1" },
  { src: "/Images/W14.jpeg", alt: "Image 2" },
  { src: "/logos/slide2.jpg", alt: "Image 3" },
  { src: "/Images/W11.jpeg", alt: "Image 4" },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    console.log("Current Index:", currentIndex);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 relative w-full h-64 sm:h-96">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority={index === 0} // Load the first image eagerly
          />
        </div>
      ))}

      <h1 className=" absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-center drop-shadow-lg px-4">
        We Provide the Best AC Services in Mira Bhayander.
      </h1>
      <p className="absolute top-[62%] left-[30%] text-blue-600 text-lg sm:text-base lg:text-2xl font-semibold text-center drop-shadow-lg px-12 hidden sm:block">
        Book your AC repair and maintenance work,
        <br /> our expert will visit site within <b>30 Minutes</b>.{" "}
      </p>

      <Link href="/contact">
        <button className="absolute top-[88%] sm:top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white font-semibold py-3 px-6 sm:px-8 sm:py-4 rounded-lg text-lg sm:text-xl hover:bg-blue-600 transition focus:outline-none focus:ring-4 focus:ring-blue-300">
          Book now
        </button>
      </Link>
    </div>
  );
};

export default Banner;
