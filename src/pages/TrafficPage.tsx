import React from 'react';
import { Button } from '@/components/ui/button';
import { Advisories } from '@/components/advisories';

const TrafficPage = () => {
  const fbPageLink = 'https://www.facebook.com/profile.php?id=61558093977723';
  const advisoryData = {
    title: 'Traffic Alerts',
    description: 'A record of traffic advisories along nearby locations',
    header: {
      type: 'traffic',
    },
    advisories: [
      {
        advisoryName: 'Lightweight Traffic',
        advisoryDescription:
          'Lightweight traffic along M. Sioson St. due to active road construction along Merville. March 17 2025.',
        advisoryStatus: 'Road Construction',
        advisoryDate: 'March 20, 2025',
      },
      {
        advisoryName: 'Heavy Traffic',
        advisoryDescription:
          'Heavy traffic along C4 Road due to a vehicular accident. Expect delays and use alternate routes.',
        advisoryStatus: 'Vehicular Accident',
        advisoryDate: 'March 19, 2025',
      },
      {
        advisoryName: 'Road Closure',
        advisoryDescription:
          'A section of Main Street is closed for repairs. Please use detour routes to avoid delays.',
        advisoryStatus: 'Road Construction',
      },
      {
        advisoryName: 'Heavy Traffic',
        advisoryDescription:
          'Heavy traffic along C4 Road due to a vehicular accident. Expect delays and use alternate routes.',
        advisoryStatus: 'Vehicular Accident',
        advisoryDate: 'March 19, 2025',
      },
      {
        advisoryName: 'Road Closure',
        advisoryDescription:
          'A section of Main Street is closed for repairs. Please use detour routes to avoid delays.',
        advisoryStatus: 'Road Construction',
      },
      {
        advisoryName: 'Heavy Traffic',
        advisoryDescription:
          'Heavy traffic along C4 Road due to a vehicular accident. Expect delays and use alternate routes.',
        advisoryStatus: 'Vehicular Accident',
        advisoryDate: 'March 19, 2025',
      },
    ],
  };

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <div className="bg-orange-500 text-white flex justify-between items-center rounded-0 md:rounded-xl p-6">
        <div className=" sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold ">
              Want real-time traffic updates across Malabon City? Click this to
              get redirected to the official Facebook page.
            </h2>
          </div>
          <div className="flex items-center justify-between  w-full mt-4 sm:mt-0">
            <p className="text-sm text-white/90 max-w-xl">
              Malabon City Central Commands and Communications Center
              periodically provides real-time traffic updates through Facebook
              live.
            </p>
            <Button
              className="bg-white text-orange-500 font-semibold self-end mr-2 w-1/4 "
              onClick={() => window.open(fbPageLink, '_blank')}
            >
              Click to visit Facebook page
            </Button>
          </div>
        </div>
      </div>

      <Advisories {...advisoryData} />
    </div>
  );
};

export default TrafficPage;
