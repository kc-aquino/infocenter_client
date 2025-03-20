import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


interface EmergencyNumbersProps {
  title: string;
  number: string;
  logo?: React.ElementType;
}

const EmergencyNumbers: React.FC<EmergencyNumbersProps> = ({ title, number, logo: Logo }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white w-full rounded-lg shadow-md drop-shadow-2xl text-white">
      <div className="bg-[#FF6F00] w-full h-[75px] rounded-lg drop-shadow-lg flex items-center justify-between text-xl font-bold p-5">
        {title} {Logo && <Logo className="w-8 h-8 text-[#FF6F00]" />}
      </div>
      <div className="text-center text-lg text-gray-400 font-semibold mt-2">Contact Number:</div>
      <div className="text-center text-xl text-gray-700 font-bold">{number}</div>
      <div className="flex justify-center p-5">
        <Button className="w-full" onClick={() => navigate("/register")}>Copy to Clipboard</Button>
      </div>
    </div>
  );
};

export default EmergencyNumbers;
