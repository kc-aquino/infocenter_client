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
    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    // Only set Content-Type if method isn't GET and not sending FormData
    if (method !== 'GET' && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== 'GET') {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}/${endpoint}`, options);

    const data = await response.json();

    if (!response.ok) {
      const error: any = new Error(`Error: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error; // ← Return real error so frontend can handle it
  }
};
