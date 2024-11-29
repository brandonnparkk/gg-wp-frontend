import { useState, useEffect } from 'react';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.API_URL as string;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${apiUrl}/games`);
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGames();
  }, [apiUrl]);

  return { games, error };
};