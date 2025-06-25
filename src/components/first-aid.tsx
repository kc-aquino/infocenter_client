import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

type FirstAidItems = {
  itemTitle: string;
  itemDescription: string;
  itemLink: string;
};

interface FirstAidProps {
  title: string;
  description: string;
  firstAidItems: FirstAidItems[];
}

export function FirstAid({ title, description, firstAidItems }: FirstAidProps) {
  const [selectedLink, setSelectedLink] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<FirstAidItems[]>([]);

  // Update selectedLink when firstAidItems updates
  useEffect(() => {
    if (firstAidItems.length > 0) {
      setSelectedLink(firstAidItems[0].itemLink);
      setFilteredItems(firstAidItems);
    }
  }, [firstAidItems]);

  // Filter items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredItems(firstAidItems);
      return;
    }

    const filtered = firstAidItems.filter(
      item =>
        item.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemDescription.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setFilteredItems(filtered);

    // If there are filtered results, select the first one
    if (filtered.length > 0) {
      setSelectedIndex(0);
      setSelectedLink(filtered[0].itemLink);
    }
  }, [searchQuery, firstAidItems]);

  const handleCardClick = (index: number, link: string) => {
    setSelectedIndex(index);
    setSelectedLink(link);
  };

  const clearSearch = () => {
    setSearchQuery('');
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

        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search first aid videos..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a2a92] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <CardContent className="flex-grow overflow-y-auto space-y-2 pt-0">
          {filteredItems.length > 0 ? (
            filteredItems.map((firstAidItem, index) => (
              <div
                key={`${firstAidItem.itemTitle}-${index}`}
                onClick={() => handleCardClick(index, firstAidItem.itemLink)}
                className={`p-4 rounded-lg flex justify-between items-start shadow-sm cursor-pointer transition-colors ${
                  index === selectedIndex
                    ? 'bg-[#2a2a92] text-white'
                    : 'bg-white hover:bg-gray-50'
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
                    <h3
                      className={`text-sm font-medium ${
                        index === selectedIndex
                          ? 'text-white/80'
                          : 'text-gray-500'
                      }`}
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
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try searching with different keywords</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
