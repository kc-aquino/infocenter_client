import '../App.css';
import EmergencyNumbers from '@/components/NotShadcnComponents/EmergencyNumbers';
import { DataNum, AboutUs, ContactUs } from '@/components/data-file';
import TermsAndPrivacyDialog from '@/components/termsAndPrivacyDialog';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import AboutUsImg from '@/assets/about.png';
import { fetchData } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

interface Advisory {
  advisoryName: string;
  advisoryDescription: string;
  advisoryStatus: string;
  advisoryDate: string;
  type: 'fire' | 'flood' | 'tsunami' | 'garbage' | 'utility';
  originalDate: Date;
}

function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentAdvisory, setCurrentAdvisory] = useState<Advisory | null>(null);
  const [showDefaultHeader, setShowDefaultHeader] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [allAdvisories, setAllAdvisories] = useState([]); // Store all advisories
  const [currentAdvisoryIndex, setCurrentAdvisoryIndex] = useState(0); // Current carousel index

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  useEffect(() => {
    const fetchLatestAdvisory = async () => {
      try {
        const response = await fetchData('api/get-recent-announcements');

        if (!response.success || !response.data) {
          console.error('Failed to fetch advisory data');
          return;
        }

        // Filter out items with no actual data and convert to advisory format
        const validAdvisories = response.data
          .filter(item => item.message !== 'No announcement yet' && item.name)
          .map(item => ({
            advisoryName: item.name,
            advisoryDescription: item.description,
            advisoryStatus: getFormattedStatus(item),
            advisoryDate: getFormattedDate(item),
            type: item.tag,
            originalDate: new Date(getDateField(item)),
          }));

        if (validAdvisories.length === 0) {
          return; // No valid advisories found
        }

        // Sort by date (newest first)
        const sortedAdvisories = validAdvisories.sort(
          (a, b) => b.originalDate.getTime() - a.originalDate.getTime(),
        );

        // Check if we have any advisories within last 24 hours

        const recentAdvisories = sortedAdvisories;

        if (recentAdvisories.length > 0) {
          setAllAdvisories(recentAdvisories); // Set all recent advisories for carousel
          setCurrentAdvisoryIndex(0); // Start with first advisory
          setShowDefaultHeader(false);
          setIsVisible(true);

          // Start carousel auto-rotation (change every 5 seconds)
          const carouselInterval = setInterval(() => {
            setCurrentAdvisoryIndex(prev =>
              prev >= recentAdvisories.length - 1 ? 0 : prev + 1,
            );
          }, 5000);

          // Auto-hide entire carousel after 2 minutes
          const hideTimeout = setTimeout(
            () => {
              setIsVisible(false);
              clearInterval(carouselInterval);
              setTimeout(() => {
                setShowDefaultHeader(true);
              }, 300);
            },
            2 * 60 * 1000,
          );

          return () => {
            clearTimeout(hideTimeout);
            clearInterval(carouselInterval);
          };
        }
      } catch (error) {
        console.error('Failed to fetch advisory data:', error);
      }
    };

    // Helper function to get the appropriate date field
    const getDateField = item => {
      return item.time || item.date || new Date().toISOString();
    };

    // Helper function to format date
    const getFormattedDate = item => {
      const dateValue = getDateField(item);
      return new Date(dateValue).toLocaleString();
    };

    // Helper function to format status based on type
    const getFormattedStatus = item => {
      switch (item.tag) {
        case 'fire':
          return item.status === 'option1'
            ? 'Ongoing'
            : item.status === 'option2'
              ? 'Fire Out'
              : item.status || 'Unknown';
        case 'flood':
        case 'tsunami':
          return item.severity || 'Unknown';
        case 'traffic':
          return item.reason || 'Unknown';
        case 'garbage':
        case 'utility':
        default:
          return item.status || 'Unknown';
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
                  <div className="flex flex-col items-start">
                    <h3>Find the emergency numbers for your area.</h3>
                    <h3>If you are in immediate danger, call 911.</h3>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`bg-[#2a2a92] text-white h-full w-full relative md:rounded-xl transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {/* Carousel Content */}
                <div className="p-8 flex flex-col justify-center items-start h-full">
                  <div className="flex gap-3 mb-4">
                    <Badge className="bg-white text-[#2a2a92]">
                      {allAdvisories[currentAdvisoryIndex]?.type.toUpperCase()}
                    </Badge>
                    <Badge className="bg-white text-[#2a2a92]">
                      {allAdvisories[currentAdvisoryIndex]?.advisoryStatus}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold mb-2">LATEST ALERTS</h1>
                  <h2 className="text-xl font-semibold mb-3">
                    {allAdvisories[currentAdvisoryIndex]?.advisoryName}
                  </h2>
                  <p className="text-base mb-4">
                    {allAdvisories[currentAdvisoryIndex]?.advisoryDescription}
                  </p>
                  <p className="text-sm opacity-90 mb-4">
                    Posted: {allAdvisories[currentAdvisoryIndex]?.advisoryDate}
                  </p>
                </div>

                {/* Carousel Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {allAdvisories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAdvisoryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentAdvisoryIndex
                          ? 'bg-white'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows (Optional) */}
                {allAdvisories.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentAdvisoryIndex(prev =>
                          prev === 0 ? allAdvisories.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentAdvisoryIndex(prev =>
                          prev >= allAdvisories.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Counter */}
                <div className="absolute top-4 right-4 text-white/70 text-sm">
                  {currentAdvisoryIndex + 1} / {allAdvisories.length}
                </div>
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
              <a
                href="/register"
                className="p-5 bg-white rounded-lg text-center text-black"
              >
                <h1 className="text-md font-semibold text-[#2a2a92]">
                  Receive an SMS Alert!
                </h1>
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
          <div className="bg-[#2a2a92] w-1"></div>
          {toastMessage}
        </div>
      )}
    </>
  );
}

export default Home;

