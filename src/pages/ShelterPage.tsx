import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import shelter1img from '@/assets/ShelterPage/shelter1.png';
import shelter2img from '@/assets/ShelterPage/shelter2.png';

// Fix missing marker icons in Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const ShelterPage = () => {
  const [activeTab, setActiveTab] = useState('shelter-1');

  const position1 = [14.694323, 120.932227]; // Shelter 1 coordinates
  const position2 = [14.69842600780549, 120.92931017185543]; // Shelter 2 coordinates

  const shelters = {
    'shelter-1': {
      name: 'Dampalit Barangay Hall (Malabon)',
      position: position1,
      image: shelter1img,
      address: 'MWVM+Q2W, M. Sioson St, Malabon, 1470 Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      gmapLocation: 'https://maps.app.goo.gl/AwVf3dMR5JpzVNoGA',
    },
    'shelter-2': {
      name: 'Hayagan Medical Laboratory',
      position: position2,
      image: shelter2img,
      address: 'MWVM+Q2W, M. Sioson St, Malabon, 1470 Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      gmapLocation: 'https://maps.app.goo.gl/dmiuhszLig7wTZ2G9',
    },
  };

  const activeShelter = shelters[activeTab];

  return (
    <div className="p-4">
      <Tabs
        defaultValue="shelter-1"
        className="space-y-4"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">{activeShelter.name}</h1>
          <TabsList className="flex w-50 justify-end items-center">
            <TabsTrigger value="shelter-1">Shelter 1</TabsTrigger>
            <TabsTrigger value="shelter-2">Shelter 2</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map API */}
            <Card className="bg-white/80 shadow-lg rounded-lg h-auto border border-orange-500">
              <CardContent className="p-0  h-full">
                <MapContainer
                  center={activeShelter.position}
                  zoom={100}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '0.5rem',
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={activeShelter.position}
                    icon={
                      new L.Icon({
                        iconUrl: markerIconPng,
                        shadowUrl: markerShadowPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                  >
                    <Popup>{activeShelter.name}</Popup>
                  </Marker>
                </MapContainer>
              </CardContent>
            </Card>

            {/* Shelter Details */}
            <Card className="bg-white/80 shadow-lg rounded-lg h-auto border border-orange-500">
              <CardContent>
                <Avatar className="mx-auto mb-4 w-full h-80 rounded-lg">
                  <AvatarImage
                    src={activeShelter.image}
                    alt={`Shelter Image ${activeTab}`}
                  />
                  <AvatarFallback>{activeShelter.name}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-[#FF6F00]">
                  {activeShelter.name}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={25} color="red" />
                  <p className="text-[#FF6F00]">{activeShelter.address}</p>
                </div>

                <p className="text-justify mt-2">{activeShelter.description}</p>
              </CardContent>

              <CardFooter className="mt-10">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() =>
                    window.open(activeShelter.gmapLocation, '_blank')
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

export default ShelterPage;
