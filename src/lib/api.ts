const API_URL = import.meta.env.VITE_API_URL;
export const fetchData = async (endpoint: string) => {
  if (!API_URL) {
    console.warn(
      'VITE_API_URL is not defined. Please check your environment variables.',
    );
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    return [];
  }
};
