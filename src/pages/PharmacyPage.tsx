import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import pharmacy1img from '@/assets/pharmacyPage/pharmacy1.jpg';
import pharmacy2img from '@/assets/pharmacyPage/pharmacy2.jpg';

// Fix missing marker icons in Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const PharmacyPage = () => {
  const [activeTab, setActiveTab] = useState('pharmacy-1');
  const position1 = [14.694388970482928, 120.9325052605846];
  const position2 = [14.695339171427221, 120.9322053696048];

  const pharmacies = {
    'pharmacy-1': {
      name: 'Barangay Dampalit Health Center (Malabon)',
      position: position1,
      image: pharmacy1img,
      address:
        'Dona Juana Rodriguez-1, Barangay Dampalit, Malabon, 1470 Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      gmapLocation: 'https://maps.app.goo.gl/mJ6P7phvZkwR36Zn9',
    },
    'pharmacy-2': {
      name: 'Cabino Drugstore',
      position: position2,
      image: pharmacy2img,
      address: '20 Dona Juana Rodriguez-1, Manila, Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      gmapLocation: 'https://maps.app.goo.gl/Pnc3cstQuRtoXJkLA',
    },
  };

  const activePharmacy = pharmacies[activeTab];

  return (
    <div className="p-4">
      <Tabs
        defaultValue="pharmacy-1"
        className="space-y-4"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-orange-500">
            {activePharmacy.name}
          </h1>
          <TabsList className="flex w-50 justify-end items-center">
            <TabsTrigger value="pharmacy-1">Pharmacy 1</TabsTrigger>
            <TabsTrigger value="pharmacy-2">Pharmacy 2</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map API */}
            <Card className="bg-white/80 shadow-lg rounded-lg h-auto border border-orange-500 p-[-10]">
              <CardContent className="w-full h-full p-0">
                <MapContainer
                  center={activePharmacy.position}
                  zoom={100}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: '0.5rem',
                  }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={activePharmacy.position}
                    icon={
                      new L.Icon({
                        iconUrl: markerIconPng,
                        shadowUrl: markerShadowPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                  >
                    <Popup>{activePharmacy.name}</Popup>
                  </Marker>
                </MapContainer>
              </CardContent>
            </Card>

            {/* Pharmacy Details */}
            <Card className="bg-white/80 shadow-lg rounded-lg h-auto border border-orange-500">
              <CardContent>
                <Avatar className="mx-auto mb-4 w-full h-80 rounded-lg">
                  <AvatarImage
                    src={activePharmacy.image}
                    alt={`Pharmacy Image ${activeTab}`}
                  />
                  <AvatarFallback>{activePharmacy.name}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-[#FF6F00]">
                  {activePharmacy.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={25} color="red" />
                  <p className="text-[#FF6F00]">{activePharmacy.address}</p>
                </div>
                <p className="text-justify mt-2">
                  {activePharmacy.description}
                </p>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant="default"
                  onClick={() =>
                    window.open(activePharmacy.gmapLocation, '_blank')
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

export default PharmacyPage;
