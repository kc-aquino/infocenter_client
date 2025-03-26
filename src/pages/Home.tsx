import '../App.css';
import EmergencyNumbers from '@/components/NotShadcnComponents/EmergencyNumbers';
import { DataNum, AboutUs } from '@/components/data-file';
import TermsAndPrivacyDialog from '@/components/termsAndPrivacyDialog';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import AboutUsImg from '@/assets/about.png';

function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };
  return (
    <>
      <div className="flex flex-col xl:flex-row h-full md:p-5 md:gap-5">
        <div className="flex flex-col w-full xl:w-3/4 md:gap-5">
          {/* Dashboard Header */}
          <div className="">
            <div className="bg-no-repeat bg-cover bg-right-bottom bg-[url('/src/assets/registerBG.png')] h-[298px] w-full p-5 flex justify-end items-end md:rounded-xl">
              <div className="flex flex-col text-white p-5 rounded-lg justify-end items-start ">
                <h1 className="text-lg font-black">EMERGENCY NUMBERS</h1>
                <div className='flex flex-col items-start'>
                  <h3>
                    Find the emergency numbers for your area.
                  </h3>
                  <h3>
                    If you are in immediate danger, call 911.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Numbers List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-5 p-2">
            {DataNum.map((data, index) => (
              <EmergencyNumbers
                key={index}
                title={data.title ?? 'No Title'}
                Mobile={data.Mobile ?? 'No Number'}
                Landline={data.Landline ?? 'No Number'}
                logo={data.logo}
                showToast={showToast}
              />
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col w-full h-full xl:w-1/4 rounded-xl text-white">
        {/* Orange Background Content */}
        <div className="bg-[#FF6F00] p-5 flex flex-col gap-1 justify-between w-full h-full rounded-t-xl">
            <h2 className="text-md font-bold">About Us</h2>

            {/* About Us Image */}
            <div className="bg-no-repeat bg-cover w-full flex justify-center">
            <img src={AboutUsImg} alt="About Us" className="rounded-lg" />
            </div>

            {/* About Us Details (Loop through `AboutUs` array) */}
            <div className="p-5 flex flex-col gap-5">
            {AboutUs.map((item, index) => (
                <div key={index}>
                <h1 className="text-sm font-semibold">{item.title1}</h1>
                <p className="text-xs">{item.description}</p>
                </div>
            ))}
            </div>

            {/* SMS Alert Section */}
            <div className="flex flex-col gap-5 justify-center items-center">
            <a href="/register" className="p-5 bg-white rounded-lg text-center text-black">
                <h1 className="text-md font-semibold text-[#FF6F00]">Receive an SMS Alert!</h1>
            </a>
            </div>
        </div>

        {/* White Background for Social Media & Terms */}
        <div className="bg-white rounded-b-xl">
            {/* Social Media Links */}
            <div className="flex flex-row justify-between p-5 h-20 border border-[#FF6F00] rounded-b-xl">
            <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
                <Facebook className="w-full h-full text-blue-600 hover:text-blue-800 transition duration-300" />
            </a>

            <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
                <Twitter className="w-full h-full text-blue-400 hover:text-blue-600 transition duration-300" />
            </a>

            <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
                <Instagram className="w-full h-full text-pink-600 hover:text-pink-800 transition duration-300" />
            </a>

            <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300"
            >
                <Youtube className="w-full h-full text-red-600 hover:text-red-800 transition duration-300" />
            </a>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center p-3">
            <TermsAndPrivacyDialog />
            </div>
        </div>
        </div>
      </div>
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-white text-[#FF6F00] text-xs px-5 py-3 rounded-md shadow-md transition-opacity duration-300 flex gap-10 pl-0">
          <div className='bg-[#FF6F00] w-1'></div>
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default Home;
