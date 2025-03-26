import LocationPage from '@/components/locationPage';
import shelter1img from '@/assets/shelterPage/shelter1.png';
import shelter2img from '@/assets/shelterPage/shelter2.png';

const ShelterPage = () => {
  const shelters = {
    'shelter-1': {
      name: 'Dampalit Barangay Hall (Malabon)',
      position: [14.694323, 120.932227] as [number, number],
      image: shelter1img,
      address: 'MWVM+Q2W, M. Sioson St, Malabon, 1470 Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      location_link: 'https://maps.app.goo.gl/AwVf3dMR5JpzVNoGA',
    },
    'shelter-2': {
      name: 'Hayagan Medical Laboratory',
      position: [14.69842600780549, 120.92931017185543] as [number, number],
      image: shelter2img,
      address: 'MWVM+Q2W, M. Sioson St, Malabon, 1470 Metro Manila',
      description:
        'The maximum temperature today is near 86 degrees. A partly cloudy and warm day is expected. The lowest relative humidity is near 33 percent. Expect 13 hours of sunshine...',
      location_link: 'https://maps.app.goo.gl/dmiuhszLig7wTZ2G9',
    },
  };

  return (
    <LocationPage locations={shelters} defaultTab="shelter-1" title="Shelter" />
  );
};

export default ShelterPage;
