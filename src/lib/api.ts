const API_URL = import.meta.env.VITE_API_URL;

export const fetchData = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: any,
) => {
  if (!API_URL) {
    console.warn(
      'API_URL is not defined. Please check your environment variables.',
    );
    return [];
  }

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(`${API_URL}/${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    return [];
  }
};
