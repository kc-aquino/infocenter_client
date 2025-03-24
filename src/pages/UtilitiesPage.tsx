import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Utilities from '../assets/Utilities.png';
import { fetchData } from '@/lib/api';

const UtilitiesPage = () => {
  const [advisoryData, setAdvisoryData] = useState({
    title: 'Utility Alerts',
    description:
      'Stay informed about the latest power interruptions and restoration updates in your area.',
    header: {
      image: Utilities,
    },
    advisories: [],
  });

  useEffect(() => {
    const fetchUtilitiesData = async () => {
      try {
        const fetchedData = await fetchData('api/get-utility');

        const formattedAdvisories = fetchedData.map((utility: any) => ({
          advisoryName: utility.name,
          advisoryDescription: utility.description,
          advisoryStatus: utility.status,
          advisoryDate: new Date(utility.date).toLocaleString(),
        }));

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        // console.log('Formatted Traffic advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch Traffic data:', error);
      }
    };

    fetchUtilitiesData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default UtilitiesPage;
