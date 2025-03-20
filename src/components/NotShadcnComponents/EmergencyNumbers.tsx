import React from "react";
import { useNavigate } from "react-router-dom";

interface EmergencyNumbersProps {
  title: string;
  Landline?: string | string[];
  Mobile?: string | string[];
  logo?: React.ElementType;
}

const EmergencyNumbers: React.FC<EmergencyNumbersProps> = ({ title, Landline, Mobile, logo: Logo }) => {
  const navigate = useNavigate();

  // Function to copy a number to clipboard
  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number).then(() => {
      alert(`Copied: ${number}`);
    });
  };

  return (
    <div className="flex flex-col bg-white w-full rounded-lg shadow-md drop-shadow-2xl text-white">
      <div className="bg-[#FF6F00] w-full h-[60px] rounded-lg drop-shadow-lg flex items-center justify-between text-lg font-bold p-5">
        {title} {Logo && <Logo className="w-8 h-8 text-white" />}
      </div>
      <div className="flex flex-col gap-2 p-3">

        {/* Landline Section */}
        <div className="text-sm text-gray-400 font-semibold">Landline:</div>
        <div className="text-sm text-gray-700 font-bold flex flex-col gap-1 pl-5">
          {Landline && Array.isArray(Landline) ? (
            Landline.map((num, index) => (
              <div key={index} className="flex justify-between items-center pl-2">
                <span>{num}</span>
                <a
                  href="#"
                  className="text-[#FF6F00] underline font-bold text-sm cursor-pointer"
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
                  className="text-[#FF6F00] underline font-bold text-sm cursor-pointer"
                  onClick={() => copyToClipboard(Landline)}
                >
                  Copy
                </a>
              )}
            </div>
          )}
        </div>

        {/* Mobile Section */}
        <div className="text-sm text-gray-400 font-semibold">Mobile:</div>
        <div className="text-sm text-gray-700 font-bold flex flex-col gap-1 pl-5">
          {Mobile && Array.isArray(Mobile) ? (
            Mobile.map((num, index) => (
              <div key={index} className="flex justify-between items-center pl-2">
                <span>{num}</span>
                <a
                  href="#"
                  className="text-[#FF6F00] underline font-bold text-sm cursor-pointer"
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
                  className="text-[#FF6F00] underline font-bold text-sm cursor-pointer"
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
  );
};

export default EmergencyNumbers;
