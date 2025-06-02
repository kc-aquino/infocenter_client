import React, { useState } from "react";

interface EmergencyNumbersProps {
  title: string;
  Landline?: string | string[];
  Mobile?: string | string[];
  logo?: React.ElementType;
  showToast: (message: string) => void; // Receive the function
}

const EmergencyNumbers: React.FC<EmergencyNumbersProps> = ({
  title,
  Landline,
  Mobile,
  logo: Logo,
  showToast,
}) => {
  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number).then(() => {
      showToast(` Copied to clipboard`); // Call global toast function
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col bg-white w-full md:rounded-lg shadow-md drop-shadow-2xl text-white">
      <div
        className="bg-[#2a2a92] w-full h-[60px] rounded-lg drop-shadow-lg flex items-center justify-between text-md font-bold p-5 cursor-pointer hover:bg-gradient-to-b from-[#2a2a92] to-blue-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {Logo && <Logo className="w-5 h-5 text-white" />}
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 md:max-h-0" : "max-h-0 md:max-h-96"}`}>
        <div className="flex flex-col gap-4 p-3">
          <div>
            <div className="text-sm text-gray-400 font-semibold">Landline:</div>
            <div className="text-xs text-gray-700 font-bold flex flex-col gap-1 ">
              {Landline && Array.isArray(Landline) ? (
                Landline.map((num, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{num}</span>
                    <a
                      href="#"
                      className="text-[#2a2a92] underline font-bold text-xs cursor-pointer"
                      onClick={() => copyToClipboard(num)}
                    >
                      Copy
                    </a>
                  </div>
                ))
              ) : (
                <div className="flex justify-between">
                  <span>{Landline}</span>
                  {Landline && (
                    <a
                      href="#"
                      className="text-[#2a2a92] underline font-bold text-xs  cursor-pointer"
                      onClick={() => copyToClipboard(Landline)}
                    >
                      Copy
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 font-semibold">Mobile:</div>
            <div className="text-xs text-gray-700 font-bold flex flex-col gap-1">
              {Mobile && Array.isArray(Mobile) ? (
                Mobile.map((num, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{num}</span>
                    <a
                      href="#"
                      className="text-[#2a2a92] underline font-bold text-xs cursor-pointer"
                      onClick={() => copyToClipboard(num)}
                    >
                      Copy
                    </a>
                  </div>
                ))
              ) : (
                <div className="flex justify-between">
                  <span>{Mobile}</span>
                  {Mobile && (
                    <a
                      href="#"
                      className="text-[#2a2a92] underline font-bold text-xs cursor-pointer"
                      onClick={() => copyToClipboard(Mobile)}
                    >
                      Copy
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EmergencyNumbers;
