import { useState, useEffect } from 'react';
import { getApiUrl } from '../utils/apiConfig';

type Player = {
  name: string;
  commander: string;
  life_total?: number;
  suggestions?: string[];
};

type Game = {
  id: string;
  game_name: string;
  created_at: string;
  ended_at: string | null;
  players: Player[];
};

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null as unknown);
  const apiUrl = getApiUrl() as string;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${apiUrl}/games-in-progress`);
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

export const useGame = (gameId: string) => {
  const [gameData, setGameData] = useState({} as Game);
  const [error, setError] = useState(null as unknown);
  const apiUrl = getApiUrl() as string;

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`${apiUrl}/game/${gameId}`);
        const data = await response.json();
        const { game } = data;
        const result = game[0];
        setGameData(result);
      } catch (error: unknown) {
        if (typeof error === "string") {
          setError(error.toUpperCase());
        } else if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchGameData();
  }, [apiUrl]);

  return { gameData, error };
};