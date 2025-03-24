import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Fire from '../assets/Fire.png';
import { fetchData } from '@/lib/api';

const FirePage = () => {
  const [advisoryData, setAdvisoryData] = useState({
    title: 'Fire Alerts',
    description:
      'Stay informed about the latest fire incidents and safety updates in your area.',
    header: {
      image: Fire,
    },
    advisories: [],
  });

  useEffect(() => {
    const fetchFireData = async () => {
      try {
        const fetchedData = await fetchData('api/get-fire');

        // Transform fetched data to match AdvisoriesProps
        const formattedAdvisories = fetchedData.map((fire: any) => ({
          advisoryName: fire.name,
          advisoryDescription: fire.description,
          advisoryStatus: fire.severity,
          advisoryDate: new Date(fire.date).toLocaleString(),
        }));

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted Fire advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch Fire data:', error);
      }
    };

    fetchFireData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default FirePage;
