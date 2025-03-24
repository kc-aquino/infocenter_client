import React from 'react';
import LocationPage from '@/components/locationPage';
import pharmacy1img from '@/assets/pharmacyPage/pharmacy1.jpg';
import pharmacy2img from '@/assets/pharmacyPage/pharmacy2.jpg';

const PharmacyPage = () => {
  const pharmacies = {
    'pharmacy-1': {
      name: 'Barangay Dampalit Health Center (Malabon)',
      position: [14.694388970482928, 120.9325052605846],
      image: pharmacy1img,
      address:
        'Dona Juana Rodriguez-1, Barangay Dampalit, Malabon, 1470 Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      gmapLocation: 'https://maps.app.goo.gl/mJ6P7phvZkwR36Zn9',
    },
    'pharmacy-2': {
      name: 'Cabino Drugstore',
      position: [14.695339171427221, 120.9322053696048],
      image: pharmacy2img,
      address: '20 Dona Juana Rodriguez-1, Manila, Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      gmapLocation: 'https://maps.app.goo.gl/Pnc3cstQuRtoXJkLA',
    },
  };

  return (
    <LocationPage
      locations={pharmacies}
      defaultTab="pharmacy-1"
      title="Pharmacy"
    />
  );
};

export default PharmacyPage;
