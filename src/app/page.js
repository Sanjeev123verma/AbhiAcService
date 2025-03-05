import Head from "next/head";
import Image from "next/image";

import AcServiceInfo from "@/components/AcServiceInfo";
import ExperienceSection from "@/components/Experience";
import Banner from "@/components/Banner";
import AuthorizeServiceCentres from "@/components/AuthorizeServiceCentres";

export default function Home() {
  return (
    <>
      <Head>
        <title>Abhi AC Service - Best AC Services</title>
        <meta
          name="description"
          content="Book the best AC services for your home and office. Reliable and affordable."
        />
        <meta
          name="keywords"
          content="AC service, AC repair, AC maintenance"
        />
        <meta name="author" content="Abhi AC Service" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Abhi AC Service - Best AC Services" />
        <meta
          property="og:description"
          content="Book the best AC services for your home and office. Reliable and affordable."
        />
        <meta property="og:url" content="https://www.abhiacservice.com/" />
        <meta property="og:image" content="/static/images/og-image.jpg" />
        <link rel="canonical" href="https://www.abhiacservice.com/" />
      </Head>

      <main className="flex flex-col items-center justify-between w-full overflow-x-hidden">
        <Banner />
        <Features />
        <AcServiceInfo />
        <ExperienceSection />
        <AuthorizeServiceCentres />
      </main>
    </>
  );
}

const Features = () => {
  return (
    <div className="relative mt-4 bg-gray-400 text-white w-[90%] md:w-[85%] mx-auto rounded-lg z-30 shadow-xl">
      <div className="px-8 py-2 sm:px-6 lg:px-8 items-center">
        <div className="grid sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center">
          <FeatureCard
            imgSrc="/Images/technician.png"
            title="20+ Certified Technicians"
            description="We have over 20 certified AC repair technicians in Mumbai Maharashtra."
          />
          <FeatureCard
            imgSrc="/Images/M.png"
            title="All Brands Repair"
            description="Abhi Ac Service, We repair Split & Window AC of all major brands in Mumbai Maharashtra."
          />
          <FeatureCard
            imgSrc="/Images/customer-satisfaction.png"
            title="Guaranteed Warranty"
            description="We provide a warranty on every repair job we perform with high-quality service."
          />
          <FeatureCard
            imgSrc="/Images/money-back-guarantee.png"
            title="Affordable Plans & Prices"
            description="Best prices available for each service you take with Repair City."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ imgSrc, title, description }) => (
  <div className="flex max-w-sm w-full m-2 gap-4 items-center">
    {/* A larger container for the image */}
    <div className="relative w-20 h-20">
      <Image
        src={imgSrc}
        alt={title}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
      />
    </div>

    <div className="border-r-2 border-blue-600 rounded-r p-4 flex flex-col justify-between leading-normal">
      <h3 className="text-white font-extrabold text-lg lg:text-xl mb-2">
        {title}
      </h3>
      <p className="text-base font-bold">{description}</p>
    </div>
  </div>
);
