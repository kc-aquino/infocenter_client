import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';

type FirstAidItems = {
  itemTitle: string;
  itemDescription: string;
  itemLink: string; // Now contains YouTube links
};

interface FirstAidProps {
  title: string;
  description: string;
  firstAidItems: FirstAidItems[];
}

export function FirstAid({ title, description, firstAidItems }: FirstAidProps) {
    const [selectedLink, setSelectedLink] = useState<string>('');
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    // Update selectedLink when firstAidItems updates
    useEffect(() => {
      if (firstAidItems.length > 0) {
        setSelectedLink(firstAidItems[0].itemLink);
      }
    }, [firstAidItems]);

  const handleCardClick = (index: number, link: string) => {
    setSelectedIndex(index);
    setSelectedLink(link);
  };

  return (
    <div className="h-screen flex flex-col space-y-4">
      <div>
        <iframe
          src={
            selectedLink.includes('youtube')
              ? selectedLink.replace('watch?v=', 'embed/') +
                '?autoplay=1&mute=1'
              : selectedLink
          }
          className="w-full h-48 sm:h-80 rounded-2xl md:h-[400px]"
          allowFullScreen
        ></iframe>
      </div>

      <div className="sm:hidden bg-gray-700/80 text-white p-3 w-3/4 rounded-none rounded-r-sm">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <Card className="flex flex-col flex-grow overflow-hidden rounded-none md:rounded-xl border-0 md:border-1 shadow-none md:shadow">
        <CardHeader className="hidden sm:block">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-grow overflow-y-auto space-y-2">
          {firstAidItems.map((firstAidItem, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index, firstAidItem.itemLink)}
              className={`p-4 rounded-lg flex justify-between items-start shadow-sm cursor-pointer ${
                index === selectedIndex
                  ? 'bg-orange-500 text-white'
                  : 'bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                <div>
                  <h1
                    className={`font-semibold text-lg ${
                      index === selectedIndex ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {firstAidItem.itemTitle}
                  </h1>
                  <h3 className={`text-sm font-medium ${index === selectedIndex ? 'text-white/80' : 'text-gray-500'}`}
                  >
                    {firstAidItem.itemDescription}
                  </h3>
                  <span
                    className={`text-xs font-medium ${
                      index === selectedIndex
                        ? 'text-white/80'
                        : 'text-gray-500'
                    }`}
                  >
                    Reference: {firstAidItem.itemLink}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
