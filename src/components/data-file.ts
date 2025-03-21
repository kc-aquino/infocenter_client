import { Siren, LifeBuoy, Flame, HeartPulse, UtilityPole, Droplet} from 'lucide-react';
import axios from "axios";

export interface DataFile {
    title?: string;
    Landline?: string | string[];
    Mobile?: string | string[];
    title1?: string;
    description?: string;
    logo?: React.ComponentType;
}


export const DataNum: DataFile[] = [
    {title: 'Police', Landline: ['123-4567', '987-6543'], logo: Siren, Mobile: ['09123453', '09123453'], },
    {title: 'Rescue', Landline: '09123453', logo: LifeBuoy, Mobile: ['09123453', '09123453']},
    {title: 'Fire', Landline: '09123453', logo: Flame, Mobile: ['09123453', '09123453']},
    {title: 'Medical', Landline: ['123-4567', '987-6543'], logo: HeartPulse, Mobile: ['09123453', '09123453']},
    {title: 'Power', Landline: '09123453', logo: UtilityPole, Mobile: ['09123453', '09123453']},
    {title: 'Water', Landline: '09123453', logo: Droplet, Mobile: ['09123453', '09123453']},
];

export const AboutUs: DataFile[] = [
    {title1: 'Our Vision', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'},
    {title1: 'Our Mission', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'},
];



const API_URL = "http://api.weatherapi.com/v1/current.json";
const API_KEY = "4630c665451a4d3584e25043252103";
const LOCATION = "14.662,120.956";


export const fetchWeatherData = async () => {
  try {
    const response = await axios.get(`${API_URL}?key=${API_KEY}&q=${LOCATION}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; 
  }
};