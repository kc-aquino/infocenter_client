import { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Utilities from '../assets/Utilities.png';
import { fetchData } from '@/lib/api';

interface Advisory {
  advisoryName: string;
  advisoryDescription: string;
  advisoryStatus: string;
  advisoryDate: string;
}

const UtilitiesPage = () => {
  const [advisoryData, setAdvisoryData] = useState<{
    title: string;
    description: string;
    header: { image: string };
    advisories: Advisory[];
  }>({
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
