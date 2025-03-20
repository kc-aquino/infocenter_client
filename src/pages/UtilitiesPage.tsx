import React from 'react';
import { Advisories } from '../components/advisories';
import Utilities from '../assets/Utilities.png';

const UtilitiesPage = () => {
    const advisoryData = {
        title: 'Power Alerts',
        description: 'Stay informed about the latest power interruptions and restoration updates in your area.',
        header: {
            image: Utilities
        },
        advisories: [
          {
            advisoryName: 'Power Outage in Downtown',
            advisoryDescription: 'A power outage has been reported in the downtown area due to maintenance work. Estimated restoration time is 6 PM.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 20, 2025',
          },
          {
            advisoryName: 'Scheduled Maintenance',
            advisoryDescription: 'Scheduled maintenance will cause a temporary power outage in the north district from 2 PM to 4 PM.',
            advisoryStatus: 'Upcoming',
            advisoryDate: 'March 21, 2025',
          },
          {
            advisoryName: 'Power Restored in Westside',
            advisoryDescription: 'Power has been successfully restored in the westside area after an unexpected outage.',
            advisoryStatus: 'Resolved',
            advisoryDate: 'March 19, 2025',
          },
          {
            advisoryName: 'Storm-Related Outage',
            advisoryDescription: 'Severe weather has caused power outages in multiple areas. Crews are working to restore power as quickly as possible.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 18, 2025',
          },
          {
            advisoryName: 'Energy Conservation Request',
            advisoryDescription: 'Due to high demand, residents are requested to conserve energy during peak hours to avoid outages.',
            advisoryStatus: 'Advisory',
            advisoryDate: 'March 22, 2025',
          },
        ],
      }

    return (
    <div className='m-0 md:m-10 my-5  overflow-hidden'>
        <Advisories  {...advisoryData}/>
    </div>
  );
};

export default UtilitiesPage;
