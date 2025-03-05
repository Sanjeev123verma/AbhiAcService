"use client";
import Image from "next/image";

const AcServiceInfo = () => {
  return (
    <section className="bg-white w-full sm:h-screen justify-center items-center text-center my-4 mx-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-xl mx-auto mt-2">
          <h2 className="text-4xl font-headerfont font-semibold mb-4">
            Best AC Repair Service at Home
          </h2>
          <p className="text-gray-600 text-xl py-2">
            Facing trouble with your Air Conditioner and do not know any technician in Mumbai?
            Then don’t worry as we are here to help you out. We provide the following AC installation
            & repair services at home:
          </p>
        </div>

        <div className="mx-auto flex sm:gap-16 items-center justify-center">
          <div className="flex flex-col md:flex-row mb-8 sm:mb-2 mt-2">
            <ul className="list-none list-inside text-left text-black text-2xl font-headerfont space-y-2">
              <li className="bg-yellow-200 lg:px-8 p-2 rounded-md">
                ✔ Split & Window AC Installation
              </li>
              <li className="bg-blue-200 lg:px-8 p-2 rounded-md">
                ✔ Split & Window AC Repair
              </li>
              <li className="bg-red-200 lg:px-8 p-2 rounded-md">
                ✔ AC Dry & Wet Service
              </li>
              <li className="bg-gray-200 lg:px-8 p-2 rounded-md">
                ✔ AC Gas Charging
              </li>
              <li className="bg-green-200 lg:px-8 p-2 rounded-md">
                ✔ PCB Repair
              </li>
              <li className="bg-yellow-200 lg:px-8 p-2 rounded-md">
                ✔ Other Issues
              </li>
            </ul>
          </div>

          <div className="hidden md:flex z-10">
            <Image
              src="/Images/AC.png"
              alt="AC Service"
              width={600}
              height={600}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcServiceInfo;
