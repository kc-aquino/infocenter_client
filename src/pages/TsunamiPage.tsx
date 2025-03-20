import React from 'react';
import { Advisories } from '../components/advisories';
import Tsunami from '../assets/Tsunami.png';

const TsunamiPage = () => {
    const advisoryData = {
        title: 'Tsunami Alerts',
        description: 'Stay informed about the latest tsunami advisories and safety measures in your area.',
        header: {
            image: Tsunami
        },
        advisories: [
            {
                advisoryName: 'Tsunami Warning',
                advisoryDescription: 'A tsunami has been detected. Move immediately to higher ground or inland areas.',
                advisoryStatus: 'Active',
                advisoryDate: 'March 20, 2025',
            },
            {
                advisoryName: 'Tsunami Watch',
                advisoryDescription: 'A tsunami is possible. Stay tuned for updates and be prepared to evacuate if necessary.',
                advisoryStatus: 'Active',
                advisoryDate: 'March 19, 2025',
            },
            {
                advisoryName: 'Tsunami Advisory',
                advisoryDescription: 'A tsunami is expected to affect the area. Stay away from coastal areas and do not attempt to watch the tsunami from close proximity.',
                advisoryStatus: 'Active',
                advisoryDate: 'March 18, 2025',
            },
            {
                advisoryName: 'Coastal Tsunami Warning',
                advisoryDescription: 'A tsunami is expected to cause widespread flooding in coastal areas. Evacuate immediately.',
                advisoryStatus: 'Active',
                advisoryDate: 'March 21, 2025',
            },
            {
                advisoryName: 'Tsunami Recovery Advisory',
                advisoryDescription: 'The tsunami has passed. Follow local authorities for cleanup and recovery guidelines.',
                advisoryStatus: 'Upcoming',
                advisoryDate: 'March 23, 2025',
            },
        ],
    }

    return (
        <div className='m-0 md:m-10 md:my-5  overflow-hidden'>
            <Advisories  {...advisoryData} />
        </div>
    );
};

export default TsunamiPage;
