import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Tsunami from '../assets/Tsunami.png';
import { fetchData } from '@/lib/api';

const FloodPage = () => {
  const [advisoryData, setAdvisoryData] = useState({
    title: 'Flood Alerts',
    description:
      'Stay informed about the latest flood advisories and safety measures in your area.',
    header: {
      image: Tsunami,
    },
    advisories: [],
  });

  useEffect(() => {
    const fetchFloodData = async () => {
      try {
        const fetchedData = await fetchData('api/get-floods');
        const formattedAdvisories =
          fetchedData.length > 0
            ? fetchedData.map((flood: any) => ({
                advisoryName: flood.name,
                advisoryDescription: flood.description,
                advisoryStatus: flood.severity,
                advisoryDate: new Date(flood.date).toLocaleString(),
              }))
            : [
                {
                  advisoryName: 'No Current Flood Advisories',
                  advisoryDescription:
                    'There are no flood advisories at the moment. Stay safe and check back later.',
                  advisoryStatus: 'None',
                  advisoryDate: new Date().toLocaleString(),
                },
              ];

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted flood advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch flood data:', error);
      }
    };

    fetchFloodData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5 overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default FloodPage;
