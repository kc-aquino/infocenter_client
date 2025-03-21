import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Fix missing marker icons in Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

interface LocationPageProps {
  name: string;
  address: string;
  description: string;
  position: [number, number];
  image: string;
  location_link: string;
}

const LocationPage = ({ locations, defaultTab, title }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const activeLocation = locations[activeTab];

  return (
    <div className="p-4">
      <Tabs
        defaultValue={defaultTab}
        className="space-y-4"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-orange-500">
            {activeLocation.name}
          </h1>

          <TabsList className="flex w-auto justify-end items-center">
            {Object.keys(locations).map(key => (
              <TabsTrigger key={key} value={key}>
                {title} {key.split('-')[1]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <div className="flex flex-col md:flex-row gap-4 h-full">
            {/* Map Card */}
            <div className="flex-1 bg-white/80 shadow-lg rounded-lg border border-orange-500">
              <MapContainer
                center={activeLocation.position}
                zoom={15}
                className="w-full h-[300px] md:h-full rounded-md" // Fixed height for small devices
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={activeLocation.position}
                  icon={
                    new L.Icon({
                      iconUrl: markerIconPng,
                      shadowUrl: markerShadowPng,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>{activeLocation.name}</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Location Details */}
            <Card className="flex-1 bg-white/80 shadow-lg rounded-lg border border-orange-500">
              <CardContent>
                <Avatar className="mx-auto mb-4 w-full h-80 rounded-lg">
                  <AvatarImage
                    src={activeLocation.image}
                    alt={`${title} Image ${activeTab}`}
                  />
                  <AvatarFallback>{activeLocation.name}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-[#FF6F00]">
                  {activeLocation.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={25} color="red" />
                  <p className="text-[#FF6F00]">{activeLocation.address}</p>
                </div>
                <p className="text-justify mt-2">
                  {activeLocation.description}
                </p>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() =>
                    window.open(activeLocation.location_link, '_blank')
                  }
                >
                  Go to Location
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LocationPage;
