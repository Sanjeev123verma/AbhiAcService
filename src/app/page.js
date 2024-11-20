
// import AcServiceInfo from "@/components/AcServiceInfo";
// import ExperienceSection from "@/components/Experience";
// import Banner from "@/components/Banner";


// export default function Home() {
//   return (
//     <main className=" flex flex-col items-center justify-between w-full">
//       <Banner />
//       <Features/>
//       <AcServiceInfo/>
//       <ExperienceSection/>
//     </main>
    
//   );
// }

// const Features = () => {
//   return (
    
//     <div className="absolute inset-auto top-[600px] bg-gray-400 text-white w-[85%] m-auto rounded-lg z-30 shadow-xl">
//       <div className="w-full m-auto px-4 sm:px-6 lg:px-8 items-center">
//         <div className="grid gap-4 m-auto lg:grid-cols-2 xl:grid-cols-4 items-center justify-center">

//           <div className="flex max-w-sm w-full lg:max-w-full lg:flex m-2 gap-2 h-40">
//           <img src="../Images/technician.png"
//                    alt="Icon Image"
//                    className=" w-14 lg:w-16 h-12"
//               />
//             <div className="border-r border-2 border-blue-600 lg:border-blue-600 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-loose">
//               <div className="">
//                 <div className="text-white font-bold text-xl mb-2">20+ Certified Technicians</div>
//                 <p className="text-base">
//                   We have over 20 certified AC repair technicians in Mumbai Maharashtra .
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex max-w-sm w-full lg:max-w-full lg:flex m-2 gap-2">
//             <img src="../Images/M.png"
//                    alt="Icon Image"
//                    className=" w-14 lg:w-16 h-12"
//               />
//             <div className="border-r border-2 border-blue-600 lg:border-blue-600 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//               <div className="">
//                 <div className="text-white font-bold text-xl mb-2">All Brands Repair</div>
//                 <p className="text-base">
//                  Gayatri Sales & Service, We are  repair Split & Window ACs  of all major brands in Mumbai Maharashtra.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex max-w-sm w-full lg:max-w-full lg:flex m-2 gap-2">
//           <img src="../Images/customer-satisfaction.png"
//                    alt="Icon Image"
//                    className=" h-16 w-14 lg:w-18 bg-cover"
//               />
//             {/* <div className="h-16  flex items-center justify-center bg-blue-500 text-white rounded-full p-2">
//             </div> */}
//             <div className="border-r border-2 border-blue-600 lg:border-blue-600 rounded-b lg:rounded-b-none lg:rounded-r p-3 flex flex-col justify-between leading-normal">
//               <div className="">
//                 <div className="text-white font-bold text-xl mb-2">Guaranteed Warranty</div>
//                 <p className=" text-base">
//                 We provide a warranty on every repair job we perform at your location high-quality service every time.                </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex max-w-sm w-full lg:max-w-full lg:flex m-2 gap-2">
//           <img src="../Images/money-back-guarantee.png"
//                    alt="Icon Image"
//                    className=" w-14 lg:w-16 h-12"
//               />
//             <div className=" border-r border-2 border-blue-600 lg:border-blue-600 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
//               <div className="">
//                 <div className="text-white font-bold text-xl mb-2">Affordable Plans & Prices</div>
//                 <p className=" text-base">
//                   Best prices available for each service you take with Repair  City.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import AcServiceInfo from "@/components/AcServiceInfo";
import ExperienceSection from "@/components/Experience";
import Banner from "@/components/Banner";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full">
      <Banner />
      <Features />
      <AcServiceInfo />
      <ExperienceSection />
    </main>
  );
}

const Features = () => {
  return (
    <div className="relative top-[-100px] bg-gray-400 text-white w-[90%] md:w-[85%] mx-auto rounded-lg z-30 shadow-xl">
      <div className="px-4 sm:px-6 lg:px-8 items-center">
        <div className="grid sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center">
          <FeatureCard
            imgSrc="../Images/technician.png"
            title="20+ Certified Technicians"
            description="We have over 20 certified AC repair technicians in Mumbai Maharashtra."
          />
          <FeatureCard
            imgSrc="../Images/M.png"
            title="All Brands Repair"
            description="Abhi Ac Service, We repair Split & Window ACs of all major brands in Mumbai Maharashtra."
          />
          <FeatureCard
            imgSrc="../Images/customer-satisfaction.png"
            title="Guaranteed Warranty"
            description="We provide a warranty on every repair job we perform with high-quality service."
          />
          <FeatureCard
            imgSrc="../Images/money-back-guarantee.png"
            title="Affordable Plans & Prices"
            description="Best prices available for each service you take with Repair City."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ imgSrc, title, description }) => (
  <div className="flex max-w-sm w-full lg:flex m-2 gap-2 h-auto lg:h-40 items-center">
    <img src={imgSrc} alt="Icon Image" className="w-14 lg:w-16 h-12" />
    <div className="border-r-2 border-blue-600 rounded-r p-4 flex flex-col justify-between leading-normal">
      <div>
        <h3 className="text-white font-extrabold text-lg lg:text-xl mb-2">{title}</h3>
        <p className="text-base  font-bold">{description}</p>
      </div>
    </div>
  </div>
);
