import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/apiConfig';

export const useVectorSearch = (query: string) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = getApiUrl();

  useEffect(() => {
    if (!query) return; // avoid unnecessary fetches

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Failed to fetch search results");

        const data = await response.json();
        setResults(data);
        setError(null);
      } catch (err: unknown) {
        if (typeof err === "string") {
          setError(err.toUpperCase());
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, apiUrl]);

  return { results, error, loading };
};
