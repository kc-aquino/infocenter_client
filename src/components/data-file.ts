import {
  Siren,
  LifeBuoy,
  Flame,
  HeartPulse,
  UtilityPole,
  Droplet,
  Building,
  Home,
  Truck,
  Zap,
} from 'lucide-react';
import axios from 'axios';

export interface DataFile {
  title?: string;
  Landline?: string | string[];
  Mobile?: string | string[];
  Hotline?: string;
  Schedule?: string;
  Email?: string;
  TextSMS?: string | string[];
  title1?: string;
  description?: string;
  logo?: React.ComponentType;
}

export const DataNum: DataFile[] = [
  {
    title: 'Baranggay Office',
    Hotline: '8-351-5223',
    Schedule: 'Monday to Friday 8am-5pm',
    Email: 'dampalit.malabon2023@gmail.com',
    logo: Building,
  },
  {
    title: 'Baranggay Command Center',
    Hotline: '0968-304-8471',
    Schedule: 'Mon.-Fri 8am-5pm / Sat-Sun 9am-3pm',
    Email: 'piodampalit.malabon2023@gmail.com',
    logo: LifeBuoy,
  },
  {
    title: 'Baranggay Merville Outpost',
    Hotline: '0968-317-4165',
    Schedule: '24/7',
    logo: Home,
  },
  {
    title: 'Baranggay Rescue Vehicle',
    Hotline: '0961-992-0955',
    Schedule: '24/7',
    logo: Truck,
  },
  {
    title: 'Power',
    Hotline: '16211',
    TextSMS: ['Smart - 0920-971-6211', 'Globe - 0917-551-6211'],
    Email: 'customercare@meralco.com.ph',
    logo: Zap,
  },
  {
    title: 'Water',
    Hotline: '1626',
    TextSMS: 'Smart - 0998-8641446',
    Email: 'customer.helpdesk@mayniladwater.com.ph',
    logo: Droplet,
  },
];

export const AboutUs: DataFile[] = [
  {
    title1: 'Our Vision',
    description:
      'We aim to create a safer and more connected community by providing quick access to essential emergency and utility services.',
  },
  {
    title1: 'Our Mission',
    description:
      'Our mission is to ensure that every individual has immediate access to reliable emergency contacts, fostering a sense of security and preparedness in times of need.',
  },
];

export const ContactUs: DataFile[] = [
  {
    title1: "LET'S CONNECT TxtMJS",
    description: 'TXTMJS_KEYWORD_MESSAGE - SEND TO 0917-689-8657',
  },
  {
    title1: 'MALABON CITY COMMAND CENTER',
    description: '8-921-6029, 8-921-6009, 0942-372-9891',
  },
  {
    title1: 'MALABON POLICE SS7 (HULONG DUHAT)',
    description: '0963-420-4862',
  },
  {
    title1: 'MALABON POLICE (CATMON)',
    description: '0921-705-0770',
  },
  {
    title1: 'BUREAU OF FIRE PROTECTION (MALABON)',
    description: '0966-140-3605',
  },
  {
    title1: 'TXTFIRE PHILIPPINES',
    description: '0963-420-4862',
  },
  {
    title1: 'UNITED FIRE',
    description: '0921-705-0770',
  },
];

const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const LOCATION = import.meta.env.VITE_WEATHER_LOCATION || 'Dampalit';
const DAYS = import.meta.env.VITE_WEATHER_DAYS; // Fetch the full week

export const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}?key=${API_KEY}&q=${LOCATION}&days=${DAYS}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
