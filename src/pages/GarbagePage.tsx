import React from 'react';
import { Advisories } from '../components/advisories';

const GarbagePage = () => {
    const advisoryData = {
        title: 'Garbage Alerts',
        description: 'Stay informed about the latest garbage collection updates and safety measures in your area.',
        header: {
            type: 'garbage'
        },
        advisories: [
          {
            advisoryName: 'Garbage Collection Delay',
            advisoryDescription: 'Garbage collection has been delayed due to inclement weather. Please keep your trash containers secure.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 20, 2025',
          },
          {
            advisoryName: 'Recycling Reminder',
            advisoryDescription: 'Remember to recycle paper, plastic, glass and metal. Reduce waste and help the environment.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 19, 2025',
          },
          {
            advisoryName: 'Bulky Pickup',
            advisoryDescription: 'Bulky items will be collected on the next scheduled pickup. Please place them at the curb by 6am.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 18, 2025',
          },
          {
            advisoryName: 'Composting Tips',
            advisoryDescription: 'Composting is an easy way to reduce waste and create nutrient-rich soil. Learn how to compost at home.',
            advisoryStatus: 'Active',
            advisoryDate: 'March 21, 2025',
          },
          {
            advisoryName: 'Garbage Collection Schedule',
            advisoryDescription: 'Garbage collection will resume its regular schedule starting next week. Check the city website for details.',
            advisoryStatus: 'Upcoming',
            advisoryDate: 'March 23, 2025',
          },
        ],
      }

  return (
    <div className='m-0 md:m-10 md:my-5  overflow-hidden'>
        <Advisories  {...advisoryData}/>
    </div>
  );
};

export default GarbagePage;
