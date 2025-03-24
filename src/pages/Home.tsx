import '../App.css';
import EmergencyNumbers from '@/components/NotShadcnComponents/EmergencyNumbers';
import { DataNum, AboutUs } from '@/components/data-file';
import TermsAndPrivacyDialog from '@/components/termsAndPrivacyDialog';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function Home() {
  return (
    <>
      <div className="flex flex-col lg:flex-row h-full p-10 gap-10">
        <div className="flex flex-col w-full lg:w-3/4 gap-5">
          {/* Dashboard Header */}
          <div className="">
            <div className="text-lg font-bold">Dashboard</div>
            <div className="bg-no-repeat bg-cover bg-right-bottom bg-[url('/src/assets/registerBG.png')] h-[298px] w-full p-5 flex justify-end items-end rounded-xl">
              <div className="flex flex-col text-white p-5 rounded-lg">
                <h1 className="text-lg font-bold">Emergency Numbers</h1>
                <h3>
                  Find the emergency numbers for your area. If you are in
                  immediate danger, call 911.
                </h3>
              </div>
            </div>
          </div>

          {/* Emergency Numbers List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {DataNum.map((data, index) => (
              <EmergencyNumbers
                key={index}
                title={data.title ?? 'No Title'}
                Mobile={data.Mobile ?? 'No Number'}
                Landline={data.Landline ?? 'No Number'}
                logo={data.logo}
              />
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col justify-between w-full h-full lg:w-1/4 bg-[#FF6F00] rounded-xl pb-0 text-white overflow-hidden max-h-[calc(100%-3rem)] ">
          <div className="p-5 flex flex-col gap-5 overflow-y-auto max-h-[calc(100%-5rem)]">
            <h2 className="text-lg font-bold">About Us</h2>

            {/* About Us Image */}
            <div className="bg-no-repeat bg-cover w-full flex justify-center">
              <img src="/src/assets/about.png" alt="About Us" />
            </div>

            {/* About Us Details (Loop through `AboutUs` array) */}
            <div className="p-5 flex flex-col gap-5">
              {AboutUs.map((item, index) => (
                <div key={index}>
                  <h1 className="text-md font-semibold">{item.title1}</h1>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            {/* SMS Alert Section */}
            <div className="pb-10 flex flex-col gap-5 justify-center items-center">
              <div className="p-5 bg-white rounded-lg text-center text-black">
                <h1 className="text-md font-semibold">Receive an SMS Alert!</h1>
                <img
                  src="/src/assets/mail-check.png"
                  alt="Mail Check"
                  className="mx-auto mt-2"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-row justify-between p-5 h-20 bg-gray-300 ">
            <a
              href="https://www.facebook.com/paul.vasquez.5895834"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
              <Facebook className="w-full h-full text-blue-600 hover:text-blue-800 transition duration-300" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
              <Twitter className="w-full h-full text-blue-400 hover:text-blue-600 transition duration-300" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
              <Instagram className="w-full h-full text-pink-600 hover:text-pink-800 transition duration-300" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
              <Youtube className="w-full h-full text-red-600 hover:text-red-800 transition duration-300" />
            </a>
          </div>
          <TermsAndPrivacyDialog className="text-white m-5 self-center" />
        </div>
      </div>
    </>
  );
}

export default Home;
