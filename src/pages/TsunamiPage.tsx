import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Tsunami from '../assets/Tsunami.png';
import { fetchData } from '@/lib/api';

const TsunamiPage = () => {
  const [advisoryData, setAdvisoryData] = useState({
    title: 'Tsunami Alerts',
    description:
      'Stay informed about the latest tsunami advisories and safety measures in your area.',
    header: {
      image: Tsunami,
    },
    advisories: [],
  });

  useEffect(() => {
    const fetchTsunamiData = async () => {
      try {
        const fetchedData = await fetchData('api/get-tsunamis');

        // Transform fetched data to match AdvisoriesProps
        const formattedAdvisories = fetchedData.map((tsunami: any) => ({
          advisoryName: tsunami.name,
          advisoryDescription: tsunami.description,
          advisoryStatus: tsunami.severity,
          advisoryDate: new Date(tsunami.date).toLocaleString(), // Formatting date
        }));

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted tsunami advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch tsunami data:', error);
      }
    };

    fetchTsunamiData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default TsunamiPage;
