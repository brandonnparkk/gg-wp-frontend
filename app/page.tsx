"use client"
import Image from "next/image";
import { useGames } from '../hooks/useGames';

type Player = {
  name: string;
  commander: string;
};

type Game = {
  id: string;
  game_name: string;
  created_at: string;
  ended_at: string | null;
  players: Player[];
};

export default function Home() {
  const { games } = useGames();

  const convertTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();

    const formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
    return formattedDate;
  }

  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] gap-4">
          <h1 className="text-2xl font-semibold">Recent Games</h1>
          {games?.length > 0 ?
          <div className="flex flex-col gap-6">
            {games.map((g: Game) => {
              return (
                <div className="bg-white shadow-md rounded-lg p-6 space-y-4" key={g.id}>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800">{g.game_name}</span>
                    <span className={`text-sm ${g.ended_at ? 'text-gray-500' : 'text-green-700'}`}>{g.ended_at ? `Ended: ${convertTimestamp(g.created_at)}` : 'In Progress'}</span>
                    <span className="text-sm text-gray-400">{`Created: ${convertTimestamp(g.created_at)}`}</span>
                  </div>
                  { g.players.map((p, index) => {
                    return (
                      <div className="flex flex-col justify-between bg-gray-50 rounded-lg p-4 shadow-sm" key={index}>
                        <span className="font-medium text-gray-700">{p.name}</span>
                        <span className="text-sm text-gray-500">{`Commander: ${p.commander}`}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div> :
          <div className="text-lg font-semibold">No Games Available</div>}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/game"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/card-dark.svg"
            alt="start icon"
            width={16}
            height={16}
          />
          Start a new game!
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          My Collection
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Browse Cards
        </a>
      </footer>
    </>
  );
}
