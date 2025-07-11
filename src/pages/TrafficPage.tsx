import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Advisories } from '@/components/advisories';
import { fetchData } from '@/lib/api';

interface Advisory {
  advisoryName: string;
  advisoryDescription: string;
  advisoryStatus: string;
  advisoryDate: string;
}

const TrafficPage = () => {
  const fbPageLink = 'https://www.facebook.com/profile.php?id=61558093977723';
  const [advisoryData, setAdvisoryData] = useState<{
    title: string;
    description: string;
    header: { type: string };
    advisories: Advisory[];
  }>({
    title: 'Traffic Alerts',
    description: 'A record of traffic advisories along nearby locations',
    header: {
      type: 'traffic',
    },
    advisories: [],
  });

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const fetchedData = await fetchData('api/get-traffic');

        // Transform fetched data to match AdvisoriesProps
        const formattedAdvisories =
          fetchedData.length > 0
            ? fetchedData.map((traffic: any) => ({
                advisoryName: traffic.name,
                advisoryDescription: traffic.description,
                advisoryStatus: traffic.reason,
                advisoryDate: new Date(traffic.date).toLocaleString(),
              }))
            : [
                {
                  advisoryName: 'No Current Traffic Advisories',
                  advisoryDescription:
                    'There are no traffic advisories at the moment. Stay safe and check back later.',
                  advisoryStatus: 'None',
                  advisoryDate: new Date().toLocaleString(),
                },
              ];

        setAdvisoryData(prev => ({
          ...prev,
          advisories: formattedAdvisories,
        }));

        console.log('Formatted Traffic advisories:', formattedAdvisories);
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

    fetchTrafficData();
  }, []);

  return (
    <div className="m-0 md:m-10 md:my-5 overflow-hidden">
      <div className="bg-[#2a2a92] text-white flex justify-between items-center rounded-0 md:rounded-xl p-6 m-6 mb-0 h-auto">
        <div className=" sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold">
              Want real-time traffic updates across Malabon City? Click this to
              get redirected to the official Facebook page.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4 sm:mt-0 gap-2">
            <p className="text-sm text-white/90 max-w-xl text-center sm:text-left">
              Malabon City Central Commands and Communications Center
              periodically provides real-time traffic updates through Facebook
              Live.
            </p>
            <Button
              className="bg-white text-[#2a2a92] font-semibold px-3 py-2 w-full sm:w-auto text-sm text-center whitespace-nowrap"
              onClick={() => window.open(fbPageLink, '_blank')}
            >
              Click to visit Facebook Page
            </Button>
          </div>
        </div>
      </div>

      <Advisories {...advisoryData} />
    </div>
  );
};

export default TrafficPage;
