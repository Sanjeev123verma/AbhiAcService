"use client" ;
import { useEffect, useState } from 'react';
import Link from 'next/link';


const images = [ 
  '../Images/W14.jpeg',
  '../logos/slide1.jpg',
  '../logos/slide2.jpg',
  '../Images/W11.jpeg',
];
           
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[90vh] lg:h-[100vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center' }}
        />  
      ))}

      <h1 className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-center drop-shadow-lg px-4">
        We Provide the Best AC Services in Mira Bhayander. 
      </h1>
      <p className='absolute top-[55%] left-[30%] text-blue-600 text-lg sm:text-base lg:text-2xl font-semibold text-center drop-shadow-lg px-12 hidden sm:block'>Book your AC repair and maintenance work,<br/> our expert will visit site within 30 Minutes. </p>

     <Link href="/contact">
        <button className="absolute top-[67%] sm:top-[73%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white font-semibold py-3 px-6 sm:px-8 sm:py-4 rounded-lg text-lg sm:text-xl hover:bg-blue-600 transition focus:outline-none focus:ring-4 focus:ring-blue-300">
          Book now
        </button>
      </Link>
    </div>
  );
};

export default Banner;
 
// components/Banner.js
// import Slider from 'react-slick'; 
// import 'slick-carousel/slick/slick.css'; ../Images/W12.jpeg
// import 'slick-carousel/slick/slick-theme.css';

// const Banner = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//   };

//   return (
//     <div className="relative w-full h-[100vh]">
//       <Slider {...settings}>
//         <div>
//           <img
//             src="../Images/BG4.jpg"
//             alt="Banner Image 1"
//             className="w-full h-full object-cover"
//           />

//         </div>
//         <div>
//           <img
//             src="../Images/BG5.jpg"
//             alt="Banner Image 2"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div>
//           <img
//             src="../Images/BG6.jpg"
//             alt="Banner Image 3"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div>
//           <img
//             src="../Images/BG7.jpg"
//             alt="Banner Image 4"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </Slider>
//       <div className="absolute inset-0 bg-blue opacity-50 flex items-center justify-center">
//         <h2 className="text-red-500 text-4xl font-bold">Welcome to Our Website</h2>
//       </div>
//     </div>
//   );
// };

// export default Banner;
