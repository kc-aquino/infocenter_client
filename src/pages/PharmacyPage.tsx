import { useEffect, useState } from 'react';
import LocationPage from '@/components/locationPage';
import { fetchData } from '@/lib/api';
import pharmacy1img from '@/assets/pharmacyPage/pharmacy1.jpg';
import pharmacy2img from '@/assets/pharmacyPage/pharmacy2.jpg';

interface Pharmacy {
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

const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const data = await fetchData('api/get-pharmacies', 'GET');

        const transformedData = data.reduce(
          (acc: Record<string, any>, pharmacy: Pharmacy) => {
            acc[`pharmacy-${pharmacy.id}`] = {
              name: pharmacy.name,
              address: pharmacy.address,
              image: pharmacy.image,
              description: pharmacy.description,
              position: [
                parseFloat(pharmacy.latitude),
                parseFloat(pharmacy.longitude),
              ] as [number, number],
              location_link: pharmacy.locationLink,
            };
            return acc;
          },
          {},
        );

        setPharmacies(transformedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pharmacies data');
        setLoading(false);
        console.error('Error fetching pharmacies:', err);
      }
    };

    fetchPharmacies();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-lg font-semibold">Loading pharmacies...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Fallback to hardcoded data if API returns empty (for development/testing)
  const pharmaciesToUse =
    Object.keys(pharmacies).length > 0
      ? pharmacies
      : {
          'pharmacy-1': {
            name: 'Sabino Drugstore',
            address: '23 Dona Juana Rodriguez-1, Malabon, Metro Manila',
            image: pharmacy1img,
            description:
              'Sabino Drugstore is a local pharmacy located at 23 Dona Juana Rodriguez-1, Malabon, Metro Manila. It provides a variety of pharmaceutical products, over-the-counter medicines, and essential health supplies. Conveniently situated, the drugstore serves the community with accessible healthcare products and services.',
            position: [14.695335789605576, 120.93223831155441] as [
              number,
              number,
            ],
            location_link: 'https://maps.app.goo.gl/MG6r8uaPTf4gYxiQA',
          },
          'pharmacy-2': {
            name: 'A-Cure Pharmacy',
            address: '18 M. Sioson St, Malabon, 1470 Metro Manila',
            image: pharmacy2img,
            description:
              'A-Cure Pharmacy provides essential medicines and health supplies, ensuring easy access for local residents.',
            position: [14.68609786727696, 120.94023914922326] as [
              number,
              number,
            ],
            location_link: 'https://maps.app.goo.gl/wdfJ3pTS5AfiX4LL9',
          },
        };

  return (
    <LocationPage
      locations={pharmaciesToUse}
      defaultTab="pharmacy-1"
      title="Pharmacy"
    />
  );
};

export default PharmacyPage;
