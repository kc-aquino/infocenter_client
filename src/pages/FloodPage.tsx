import React from 'react';
import { Advisories } from '../components/advisories';
import Tsunami from '../assets/Tsunami.png';

const FloodPage = () => {
  const advisoryData = {
    title: 'Flood Alerts',
    description:
      'Stay informed about the latest flood advisories and safety measures in your area.',
    header: {
      image: Tsunami,
    },
    advisories: [
      {
        advisoryName: 'River Flood Warning',
        advisoryDescription:
          'Rivers are expected to overflow due to continuous heavy rainfall. Evacuate low-lying areas.',
        advisoryStatus: 'Active',
        advisoryDate: 'March 20, 2025',
      },
      {
        advisoryName: 'Urban Flood Advisory',
        advisoryDescription:
          'Flooding expected in urban areas due to poor drainage systems. Avoid unnecessary travel.',
        advisoryStatus: 'Active',
        advisoryDate: 'March 19, 2025',
      },
      {
        advisoryName: 'Flash Flood Watch',
        advisoryDescription:
          'Flash floods likely in hilly regions. Stay away from streams and rivers.',
        advisoryStatus: 'Active',
        advisoryDate: 'March 18, 2025',
      },
      {
        advisoryName: 'Coastal Flood Warning',
        advisoryDescription:
          'High tides and storm surges expected to cause flooding in coastal areas. Evacuate if necessary.',
        advisoryStatus: 'Active',
        advisoryDate: 'March 21, 2025',
      },
      {
        advisoryName: 'Dam Overflow Alert',
        advisoryDescription:
          'Water levels in nearby dams are critically high. Prepare for potential flooding.',
        advisoryStatus: 'Active',
        advisoryDate: 'March 22, 2025',
      },
      {
        advisoryName: 'Flood Recovery Advisory',
        advisoryDescription:
          'Floodwaters are receding. Follow local authorities for cleanup and recovery guidelines.',
        advisoryStatus: 'Upcoming',
        advisoryDate: 'March 23, 2025',
      },
    ],
  };

  return (
    <div className="m-0 md:m-10 md:my-5  overflow-hidden">
      <Advisories {...advisoryData} />
    </div>
  );
};

export default FloodPage;
