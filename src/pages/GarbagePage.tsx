import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import { fetchData } from '@/lib/api';

const GarbagePage = () => {
  const [advisoryData, setAdvisoryData] = useState({
    title: 'Garbage Alerts',
    description:
      'Stay informed about the latest garbage collection updates and safety measures in your area.',
    header: {
      type: 'garbage',
    },
    advisories: [],
  });

  useEffect(() => {
    const fetchGarbageData = async () => {
      try {
        const fetchedData = await fetchData('api/get-garbage-collection');

        if (!Array.isArray(fetchedData)) {
          console.error('Unexpected API response format:', fetchedData);
          return;
        }

        // Transform fetched data to match AdvisoriesProps
        const formattedAdvisories = fetchedData.map(garbage => ({
          advisoryName: garbage.name || 'No name provided',
          advisoryDescription:
            garbage.description || 'No description available',
          advisoryStatus: garbage.status || 'Unknown',
          advisoryDate: garbage.time
            ? new Date(garbage.time).toLocaleString()
            : 'No date provided',
        }));

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted Garbage advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch Garbage data:', error);
      }
    };

    fetchGarbageData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5 overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default GarbagePage;
