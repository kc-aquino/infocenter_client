import { FirstAid } from '../components/first-aid';

const FirstAidPage = () => {
    const data = [
        {
            title: 'First Aid',
            description: 'Sample first aid description.',
            firstAidItems: [
                {
                    itemTitle: 'First Aid for Training',
                    itemDescription: 'How to help someone choking.',
                    itemLink: 'https://www.youtube.com/watch?v=ea1RJUOiNfQ'
                },
                {
                    itemTitle: 'How to do CPR on an Adult',
                    itemDescription: 'Learn how to perform CPR.',
                    itemLink: 'https://www.youtube.com/watch?v=BQNNOh8c8ks'
                },
                {
                    itemTitle: 'Treating Burns',
                    itemDescription: 'Steps to treat burns safely.',
                    itemLink: 'https://www.youtube.com/watch?v=XGnLkUty69g'
                },
                {
                    itemTitle: 'First Aid for Bleeding',
                    itemDescription: 'How to stop bleeding effectively.',
                    itemLink: 'https://www.youtube.com/watch?v=NxO5LvgqZe0'
                },
                {
                    itemTitle: 'Stroke First Aid',
                    itemDescription: 'Recognizing and helping stroke victims.',
                    itemLink: 'https://www.youtube.com/watch?v=EYUDS3wVWEk'
                }
            ]
        }
    ];

    return (
        <div className='m-0 md:m-10 md:my-5 overflow-hidden'>
            <FirstAid {...data[0]} />
        </div>
    );
};

export default FirstAidPage;
