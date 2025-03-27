import { FirstAid } from '../components/first-aid';
import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/api';

interface FirstAid {
    name: string;
    description: string;
    link: string;
}

const FirstAidPage = () => {
    interface FirstAidItems {
        itemTitle: string;
        itemDescription: string;
        itemLink: string;
    }

    const [firstAidItems, setFirstAidItems] = useState<{
        title: string;
        description: string;
        firstAidItems: FirstAidItems[];
      }>({
        title: 'First Aid',
        description:
          'Watch videos to help you handle medical emergencies effectively.',
        firstAidItems: [],
      });

    useEffect(() => {
        const fetchFirstAidData = async () => {
            try {
                const fetchedData = await fetchData('api/get-first-aid');
                console.log('Fetched Data:', fetchedData);
                const formattedFirstAidItems=
                  fetchedData.length > 0
                    ? fetchedData.map((firstAid: FirstAid) => ({
                        itemTitle: firstAid.name,
                        itemDescription: firstAid.description,
                        itemLink: firstAid.link,
                      }))
                    : [];

                setFirstAidItems(prev => ({
                    ...prev,
                    firstAidItems: formattedFirstAidItems,
                }));

                console.log(firstAidItems);
            } catch (error) {
                console.error('Error fetching first aid data:', error);
                setFirstAidItems(prev => ({
                    ...prev,
                    firstAidItems: [
                        {
                            itemTitle: 'First Aid Training',
                            itemDescription: 'How to help someone choking.',
                            itemLink: 'https://www.youtube.com/watch?v=ea1RJUOiNfQ'
                        }
                    ],
                }))
            }
        }

        fetchFirstAidData();
    }, []);

    return (
        <div className='m-0 md:m-10 md:my-5 overflow-hidden'>
            <FirstAid {...firstAidItems} />
        </div>
    );
};

export default FirstAidPage;
