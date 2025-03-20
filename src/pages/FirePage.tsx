import React from 'react';
import { Advisories } from '../components/advisories';
import Fire from '../assets/Fire.png';

const FirePage = () => {
    const advisoryData = {
        title: 'Fire Alerts',
        description: 'Stay informed about the latest fire incidents and safety updates in your area.',
        header: {
            image: Fire
        },
        advisories: [
          {
            advisoryName: 'Forest Fire in Green Valley',
            advisoryDescription: 'A forest fire has been reported in Green Valley. Evacuation orders are in place for nearby residents.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 20, 2025',
          },
          {
            advisoryName: 'Controlled Burn in Pine Woods',
            advisoryDescription: 'A controlled burn is scheduled in Pine Woods to reduce wildfire risk. Smoke may be visible in the area.',
            advisoryStatus: 'Upcoming',
            advisoryDate: 'March 21, 2025',
          },
          {
            advisoryName: 'Fire Contained in Riverside',
            advisoryDescription: 'The fire in Riverside has been successfully contained. Crews are monitoring for any flare-ups.',
            advisoryStatus: 'Resolved',
            advisoryDate: 'March 19, 2025',
          },
          {
            advisoryName: 'Wildfire Near Sunset Hills',
            advisoryDescription: 'A wildfire is spreading near Sunset Hills. Firefighters are working to control the blaze. Stay alert for updates.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 18, 2025',
          },
          {
            advisoryName: 'Fire Safety Advisory',
            advisoryDescription: 'Due to dry conditions, residents are advised to avoid outdoor burning and report any signs of fire immediately.',
            advisoryStatus: 'Advisory',
            advisoryDate: 'March 22, 2025',
          },
        ],
      }

    return (
        <div className='m-0 md:m-10 md:my-5  overflow-hidden'>
            <Advisories  {...advisoryData}/>
        </div>
    );
};

export default FirePage;
