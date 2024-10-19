"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

const images = [ 
  '../Images/W11.jpeg',
  '../Images/W12.jpeg',
  '../Images/W13.jpeg',
  '../Images/W14.jpeg',
];
           
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />  
      ))}

      <h1 className="absolute top-80 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-700 text-3xl md:text-6xl font-headerfont text-center">
                We Offer the Best AC Services
      </h1>

     <Link href="/contact">
      <button className='absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-center font-headerfont p-4 px-6 rounded-lg text-xl text-white'>
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
