import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import { fetchData } from '@/lib/api';

const GarbagePage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      try {
        const fetchedData = await fetchData('api/get-garbage-collection');

        if (!Array.isArray(fetchedData)) {
          console.error('Unexpected API response format:', fetchedData);
          return;
        }
        const formattedAdvisories =
          fetchedData.length > 0
            ? fetchedData.map(garbage => ({
                advisoryName: garbage.name || 'No name provided',
                advisoryDescription:
                  garbage.description || 'No description available',
                advisoryStatus: garbage.status || 'Unknown',
                advisoryDate: garbage.time
                  ? new Date(garbage.time).toLocaleString()
                  : 'No date provided',
              }))
            : [
                {
                  advisoryName: 'No Current Garbage Collection Advisories',
                  advisoryDescription:
                    'There are no garbage collection advisories at the moment. Stay safe and check back later.',
                  advisoryStatus: 'None',
                  advisoryDate: new Date().toLocaleString(),
                },
              ];

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted Garbage advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch Garbage data:', error);

        setAdvisoryData(prev => ({
          ...prev,
          advisories: [
            {
              advisoryName: 'Failed to Load Data',
              advisoryDescription:
                'Unable to retrieve garbage collection advisories. Please check your connection or try again later.',
              advisoryStatus: 'Unavailable',
              advisoryDate: new Date().toLocaleString(),
            },
          ],
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGarbageData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5 overflow-hidden">
      <Advisories {...advisoryData} isLoading={isLoading} />
    </div>
  );
};

export default GarbagePage;
