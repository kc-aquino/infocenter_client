import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmergencyNumbers from "@/components/NotShadcnComponents/EmergencyNumbers";
import { DataNum, AboutUs } from "@/components/data-file"; // Import the data
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import "../App.css";
import { useState } from "react";
function Home() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<"terms" | "privacy" | null>(null);


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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec.
                </h3>
              </div>
            </div>
          </div>

          {/* Emergency Numbers List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {DataNum.map((data, index) => (
              <EmergencyNumbers 
                key={index}
                title={data.title ?? "No Title"}
                Mobile={data.Mobile ?? "No Number"}
                Landline={data.Landline ?? "No Number"}
                logo={data.logo}             />
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col justify-between w-full h-full lg:w-1/4 bg-[#FF6F00] rounded-xl pb-0 text-white">
          <div className="p-5 flex flex-col gap-5">
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
            <div className="p-10 flex flex-col gap-5 justify-center items-center">
              <div className="p-5 bg-white rounded-lg text-center text-black">
                <h1 className="text-md font-semibold">Receive an SMS Alert!</h1>
                <img src="/src/assets/mail-check.png" alt="Mail Check" className="mx-auto mt-2" />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-row justify-between p-5 h-20 bg-gray-300 rounded-lg">
            <a href="https://www.facebook.com/paul.vasquez.5895834" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300">
              <Facebook className="w-full h-full text-blue-600 hover:text-blue-800 transition duration-300" />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300">
              <Twitter className="w-full h-full text-blue-400 hover:text-blue-600 transition duration-300" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300">
              <Instagram className="w-full h-full text-pink-600 hover:text-pink-800 transition duration-300" />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#FF6F00] rounded-full p-2 transition duration-300">
              <Youtube className="w-full h-full text-red-600 hover:text-red-800 transition duration-300" />
            </a>
          </div>

          <div className="p-4">
            {/* Hyperlinks */}
            <a
              href="#"
              className="text-blue-500 underline cursor-pointer mr-4"
              onClick={(e) => {
                e.preventDefault();
                setModalType("terms");
              }}
            >
              Terms and Conditions
            </a>
            
            <a
              href="#"
              className="text-blue-500 underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setModalType("privacy");
              }}
            >
              Privacy Policy
            </a>

            {/* Modal */}
            {modalType && (
              <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                  <h2 className="text-xl font-bold mb-2">
                    {modalType === "terms" ? "Terms and Conditions" : "Privacy Policy"}
                  </h2>
                  <p className="text-gray-600">
                    {modalType === "terms"
                      ? "Here are the terms and conditions..."
                      : "Here is the privacy policy..."}
                  </p>
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setModalType(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
