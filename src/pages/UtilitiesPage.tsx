import React, { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Utilities from '../assets/Utilities.png';
import { fetchData } from '@/lib/api';

const UtilitiesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
      try {
        const fetchedData = await fetchData('api/get-utility');
        const formattedAdvisories =
          fetchedData.length > 0
            ? fetchedData.map((utility: any) => ({
                advisoryName: utility.name,
                advisoryDescription: utility.description,
                advisoryStatus: utility.status,
                advisoryDate: new Date(utility.date).toLocaleString(),
              }))
            : [
                {
                  advisoryName: 'No Current Utility Advisories',
                  advisoryDescription:
                    'There are no utility advisories at the moment. Stay safe and check back later.',
                  advisoryStatus: 'None',
                  advisoryDate: new Date().toLocaleString(),
                },
              ];

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));
      } catch (error) {
        console.error('Failed to fetch Traffic data:', error);

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

    fetchUtilitiesData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <Advisories {...advisoryData} isLoading={isLoading} />
    </div>
  );
};

export default UtilitiesPage;
