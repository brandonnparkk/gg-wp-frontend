type Game = {
  id: string;
  game_name: string;
  created_at: string;
  ended_at: string | null;
  players: Player[];
};

type Player = {
  name: string;
  commander: string;
  life_total?: number;
  suggestions?: string[];
};