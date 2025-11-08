import { useEffect, useState } from 'react';
import { Advisories } from '../components/advisories';
import Tsunami from '../assets/Tsunami.jpg';
import { fetchData } from '@/lib/api';

interface Advisory {
    advisoryName: string;
    advisoryDescription: string;
    advisoryStatus: string;
    advisoryDate: string;
  }

const TsunamiPage = () => {
  const [advisoryData, setAdvisoryData] = useState<{
    title: string;
    description: string;
    header: { image: string };
    advisories: Advisory[];
  }>({
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
        const formattedAdvisories =
          fetchedData.length > 0
            ? fetchedData.map((tsunami: any) => ({
                advisoryName: tsunami.name,
                advisoryDescription: tsunami.description,
                advisoryStatus: tsunami.severity,
                advisoryDate: new Date(tsunami.date).toLocaleString(),
              }))
            : [
                {
                  advisoryName: 'No Current Tsunami Advisories',
                  advisoryDescription:
                    'There are no tsunami advisories at the moment. Stay safe and check back later.',
                  advisoryStatus: 'None',
                  advisoryDate: new Date().toLocaleString(),
                },
              ];

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted tsunami advisories:', formattedAdvisories);
      } catch (error) {
        console.error('Failed to fetch tsunami data:', error);

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

    fetchTsunamiData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default TsunamiPage;
