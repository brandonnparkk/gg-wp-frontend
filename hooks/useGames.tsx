import { useState, useEffect } from 'react';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null as unknown);
  const apiUrl = process.env.API_URL as string;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${apiUrl}/games`);
        const data = await response.json();
        setGames(data);
      } catch (error: unknown) {
        if (typeof error === "string") {
          setError(error.toUpperCase());
        } else if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchGames();
  }, [apiUrl]);

  return { games, error };
};