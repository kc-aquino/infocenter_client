import React from 'react';
import { FirstAid } from '../components/first-aid';
import RatDance from '../assets/TestVideos/ratdance.mp4'
import TestVideo1 from '../assets/TestVideos/TestVideo1.mp4'
import TestVideo2 from '../assets/TestVideos/TestVideo2.mp4'
import TestVideo3 from '../assets/TestVideos/TestVideo3.mp4'
import TestVideo4 from '../assets/TestVideos/TestVideo4.mp4'

const FirstAidPage = () => {
    const data = [
        {
            title: 'First Aid',
            description: 'Sample first aid description.',
            firstAidItems: [
                {
                    itemTitle: 'First Aid Item 1',
                    itemDescription: 'Sample first aid item 1 description.',
                    itemLink: TestVideo3
                },
                {
                    itemTitle: 'First Aid Item 2',
                    itemDescription: 'Sample first aid item 2 description.',
                    itemLink: RatDance
                },
                {
                    itemTitle: 'First Aid Item 3',
                    itemDescription: 'Sample first aid item 3 description.',
                    itemLink: TestVideo1
                },
                {
                    itemTitle: 'First Aid Item 4',
                    itemDescription: 'Sample first aid item 4 description.',
                    itemLink: TestVideo2
                },
                {
                    itemTitle: 'First Aid Item 5',
                    itemDescription: 'Sample first aid item 5 description.',
                    itemLink: TestVideo4
                }
            ]
        }
    ]

    return (
        <div className='m-0 md:m-10 md:my-5  overflow-hidden'>
            <FirstAid {...data[0]}/>
        </div>
  );
};

export default FirstAidPage;
