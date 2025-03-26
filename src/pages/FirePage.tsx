import { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Fire from '../assets/Fire.png';
import { fetchData } from '@/lib/api';

const FirePage = () => {
  interface Advisory {
    advisoryName: string;
    advisoryDescription: string;
    advisoryStatus: string;
    advisoryDate: string;
  }

  const [advisoryData, setAdvisoryData] = useState<{
    title: string;
    description: string;
    header: { image: string };
    advisories: Advisory[];
  }>({
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
        const formattedAdvisories =
          fetchedData.length > 0
            ? fetchedData.map((fire: any) => ({
                advisoryName: fire.name,
                advisoryDescription: fire.description,
                advisoryStatus: fire.severity,
                advisoryDate: new Date(fire.date).toLocaleString(),
              }))
            : [
                {
                  advisoryName: 'No Current Fire Advisories',
                  advisoryDescription:
                    'There are no fire advisories at the moment. Stay safe and check back later.',
                  advisoryStatus: 'None',
                  advisoryDate: new Date().toLocaleString(),
                },
              ];

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));
      } catch (error) {
        console.error('Failed to fetch Fire data:', error);
        setAdvisoryData(prev => ({
          ...prev,
          advisories: [
            {
              advisoryName: 'Failed to Load Data',
              advisoryDescription:
                'Unable to retrieve fire collection advisories. Please check your connection or try again later.',
              advisoryStatus: 'Unavailable',
              advisoryDate: new Date().toLocaleString(),
            },
          ],
        }));
      }
    };

    fetchFireData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5 overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default FirePage;
