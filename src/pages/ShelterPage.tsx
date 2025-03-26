import { useEffect, useState } from 'react';
import LocationPage from '@/components/locationPage';
import { fetchData } from '@/lib/api';
import shelter1img from '@/assets/shelterPage/shelter1.jpg';
import shelter2img from '@/assets/shelterPage/shelter2.jpg';

interface Shelter {
  id: number;
  name: string;
  address: string;
  description: string;
  locationLink: string;
  latitude: string;
  longitude: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const ShelterPage = () => {
  const [shelters, setShelters] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const data = await fetchData('api/get-shelters', 'GET');

        const transformedData = data.reduce(
          (acc: Record<string, any>, shelter: Shelter) => {
            acc[`shelter-${shelter.id}`] = {
              name: shelter.name,
              address: shelter.address,
              image: shelter.image,
              description: shelter.description,
              position: [
                parseFloat(shelter.latitude),
                parseFloat(shelter.longitude),
              ] as [number, number],
              location_link: shelter.locationLink,
            };
            return acc;
          },
          {},
        );

        setShelters(transformedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch shelters data');
        setLoading(false);
        console.error('Error fetching shelters:', err);
      }
    };

    fetchShelters();
  }, []);

  if (loading) {
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      <p className="ml-2 text-lg font-semibold">Loading pharmacies...</p>
    </div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Fallback to hardcoded data if API returns empty (for development/testing)
  const sheltersToUse =
    Object.keys(shelters).length > 0
      ? shelters
      : {
          'shelter-1': {
            name: 'Dampalit Elementary School',
            address: 'Dona Juana Rodriguez-1, Malabon, Metro Manila',
            image: shelter1img,
            description:
              'Dampalit Elementary School serves as a safe and secure shelter for evacuees during emergencies, providing essential facilities for their well-being.',
            position: [14.696209415802805, 120.93108329042654] as [
              number,
              number,
            ],
            location_link: 'https://maps.app.goo.gl/z6jctTUNfDMP46xo9',
          },
          'shelter-2': {
            name: 'Dampalit Integrated School',
            address: 'Dona Juana Rodriguez-1, Malabon, Metro Manila',
            image: shelter2img,
            description:
              'Dampalit Integrated School serves as a dedicated evacuation center, offering safe shelter, essential resources, and support for affected individuals during emergencies.',
            position: [14.696080199818804, 120.93104677688109] as [
              number,
              number,
            ],
            location_link: 'https://maps.app.goo.gl/QFoR1gzQYZqew8Ur8',
          },
        };

  return (
    <LocationPage
      locations={sheltersToUse}
      defaultTab="shelter-1"
      title="Shelter"
    />
  );
};

export default ShelterPage;
