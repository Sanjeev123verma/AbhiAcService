import AcServiceInfo from "@/components/AcServiceInfo";
import ExperienceSection from "@/components/Experience";
import Banner from "@/components/Banner";
import AuthorizeServiceCentres from "@/components/AuthorizeServiceCentres";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full overflow-x-hidden">
      <Banner />
      <Features />
      <AcServiceInfo />
      <ExperienceSection />
      <AuthorizeServiceCentres />
    </main>
  );
}

const Features = () => {
  return (
    <div className="relative mt-4 bg-gray-400 text-white w-[90%] md:w-[85%] mx-auto rounded-lg z-30 shadow-xl">
      <div className="px-8 py-2 sm:px-6 lg:px-8 items-center">
        <div className="grid sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center">
          <FeatureCard
            imgSrc="../Images/technician.png"
            title="20+ Certified Technicians"
            description="We have over 20 certified AC repair technicians in Mumbai Maharashtra."
          />
          <FeatureCard
            imgSrc="../Images/M.png"
            title="All Brands Repair"
            description="Abhi Ac Service, We repair Split & Window AC of all major brands in Mumbai Maharashtra."
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
