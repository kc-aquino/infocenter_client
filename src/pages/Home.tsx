import '../App.css';
import EmergencyNumbers from '@/components/NotShadcnComponents/EmergencyNumbers';
import { DataNum, AboutUs, ContactUs } from '@/components/data-file';
import TermsAndPrivacyDialog from '@/components/termsAndPrivacyDialog';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import AboutUsImg from '@/assets/about.png';
import { fetchData } from '@/lib/api';
import { Badge } from "@/components/ui/badge";

interface Advisory {
  advisoryName: string;
  advisoryDescription: string;
  advisoryStatus: string;
  advisoryDate: string;
  type: 'fire' | 'flood' | 'tsunami' | 'garbage';
  originalDate: Date;
}

function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentAdvisory, setCurrentAdvisory] = useState<Advisory | null>(null);
  const [showDefaultHeader, setShowDefaultHeader] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  useEffect(() => {
    const fetchLatestAdvisory = async () => {
      try {
        const [fireData, floodData, tsunamiData, garbageData] = await Promise.all([
          fetchData('api/get-fire'),
          fetchData('api/get-floods'),
          fetchData('api/get-tsunamis'),
          fetchData('api/get-garbage-collection')
        ]);

        const allAdvisories: Advisory[] = [];

        // Process fire data
        if (fireData && fireData.length > 0) {
          fireData.forEach((fire: any) => {
            allAdvisories.push({
              advisoryName: fire.name,
              advisoryDescription: fire.description,
              advisoryStatus: fire.status === 'option1' ? 'Ongoing' : 
                           fire.status === 'option2' ? 'Fire Out' : 'Unknown',
              advisoryDate: new Date(fire.date).toLocaleString(),
              type: 'fire',
              originalDate: new Date(fire.date)
            });
          });
        }

        // Process flood data
        if (floodData && floodData.length > 0) {
          floodData.forEach((flood: any) => {
            allAdvisories.push({
              advisoryName: flood.name,
              advisoryDescription: flood.description,
              advisoryStatus: flood.severity,
              advisoryDate: new Date(flood.date).toLocaleString(),
              type: 'flood',
              originalDate: new Date(flood.date)
            });
          });
        }

        // Process tsunami data
        if (tsunamiData && tsunamiData.length > 0) {
          tsunamiData.forEach((tsunami: any) => {
            allAdvisories.push({
              advisoryName: tsunami.name,
              advisoryDescription: tsunami.description,
              advisoryStatus: tsunami.severity,
              advisoryDate: new Date(tsunami.date).toLocaleString(),
              type: 'tsunami',
              originalDate: new Date(tsunami.date)
            });
          });
        }

        // Process garbage data
        if (garbageData && garbageData.length > 0) {
          garbageData.forEach((garbage: any) => {
            allAdvisories.push({
              advisoryName: garbage.name || 'No name provided',
              advisoryDescription: garbage.description || 'No description available',
              advisoryStatus: garbage.status || 'Unknown',
              advisoryDate: garbage.time ? new Date(garbage.time).toLocaleString() : 'No date provided',
              type: 'garbage',
              originalDate: garbage.time ? new Date(garbage.time) : new Date()
            });
          });
        }

        // Sort by date (newest first)
        allAdvisories.sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime());

        // Get the most recent advisory if any exists
        if (allAdvisories.length > 0) {
          const latest = allAdvisories[0];
          const now = new Date();
          const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
          
          if (latest.originalDate > twentyFourHoursAgo) {
            setCurrentAdvisory(latest);
            setShowDefaultHeader(false);
            setIsVisible(true);
            
            // Set timeout to revert to default after 5 minutes
            const timeout = setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                setShowDefaultHeader(true);
              }, 300);
            }, 5 * 60 * 1000);
            
            return () => clearTimeout(timeout);
          }
        }
      } catch (error) {
        console.error('Failed to fetch advisory data:', error);
      }
    };

    fetchLatestAdvisory();

    // Check for new advisories every minute
    const interval = setInterval(fetchLatestAdvisory, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col xl:flex-row h-full md:p-5 md:gap-5">
        <div className="flex flex-col w-full xl:w-3/4 md:gap-5">
          {/* Header Section - Switches between default and advisory */}
          <div className="h-[298px]">
            {showDefaultHeader ? (
              <div className="bg-no-repeat bg-cover bg-right-bottom bg-[url('/src/assets/registerBG.png')] h-full w-full p-5 flex justify-end items-end md:rounded-xl">
                <div className="flex flex-col text-white p-5 rounded-lg justify-end items-start">
                  <h1 className="text-lg font-black">EMERGENCY NUMBERS</h1>
                  <div className='flex flex-col items-start'>
                    <h3>Find the emergency numbers for your area.</h3>
                    <h3>If you are in immediate danger, call 911.</h3>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`bg-[#2a2a92] text-white h-full w-full p-8 flex flex-col justify-center items-start md:rounded-xl transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex gap-3 mb-4">
                  <Badge className="bg-white text-[#2a2a92]">
                    {currentAdvisory?.type.toUpperCase()}
                  </Badge>
                  <Badge className="bg-white text-[#2a2a92]">
                    {currentAdvisory?.advisoryStatus}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold mb-2">LATEST ALERT</h1>
                <h2 className="text-xl font-semibold mb-3">
                  {currentAdvisory?.advisoryName}
                </h2>
                <p className="text-base mb-4">
                  {currentAdvisory?.advisoryDescription}
                </p>
                <p className="text-sm opacity-90">
                  Posted: {currentAdvisory?.advisoryDate}
                </p>
              </div>
            )}
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
          <div className="bg-[#2a2a92] p-5 flex flex-col gap-1 justify-between w-full h-full rounded-t-xl">
            <h2 className="text-md font-bold">About Us</h2>
            <div className="bg-no-repeat bg-cover w-full flex justify-center">
              <img src={AboutUsImg} alt="About Us" className="rounded-lg" />
            </div>
            <div className="p-5 flex flex-col gap-5">
              {AboutUs.map((item, index) => (
                <div key={index}>
                  <h1 className="text-sm font-semibold">{item.title1}</h1>
                  <p className="text-xs">{item.description}</p>
                </div>
              ))}
              <hr className="border-white opacity-40 my-1" />
              <h2 className="text-sm font-bold mt-2">Contact Us</h2>
              {ContactUs.map((item, index) => (
                <div key={index}>
                  <h1 className="text-sm font-semibold">{item.title1}</h1>
                  <p className="text-xs">{item.description}</p>
                </div>
              ))}
            </div>

             {/* SMS Alert Section */}
            <div className="flex flex-col gap-5 justify-center items-center">
              <a href="/register" className="p-5 bg-white rounded-lg text-center text-black">
                <h1 className="text-md font-semibold text-[#2a2a92]">Receive an SMS Alert!</h1>
              </a>
            </div>
          </div>
          <div className="bg-white rounded-b-xl">
             {/* Social Media Links */}
            <div className="flex flex-row justify-between p-5 h-20 border border-[#2a2a92] rounded-b-xl">
              <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#2a2a92] rounded-full p-2 transition duration-300"
              >
                <Facebook className="w-full h-full text-blue-600 hover:text-blue-800 transition duration-300" />
              </a>
              <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#2a2a92] rounded-full p-2 transition duration-300"
              >
                <Twitter className="w-full h-full text-blue-400 hover:text-blue-600 transition duration-300" />
              </a>
              <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#2a2a92] rounded-full p-2 transition duration-300"
              >
                <Instagram className="w-full h-full text-pink-600 hover:text-pink-800 transition duration-300" />
              </a>
              <a
                href="https://www.facebook.com/share/1BddTEECtQ/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#2a2a92] rounded-full p-2 transition duration-300"
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
        <div className="fixed top-5 right-5 bg-white text-[#2a2a92] text-xs px-5 py-3 rounded-md shadow-md transition-opacity duration-300 flex gap-10 pl-0">
          <div className='bg-[#2a2a92] w-1'></div>
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default Home;