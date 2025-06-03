'use client'

import { useGame } from "@/hooks/useGames"
import { useParams } from 'next/navigation';
import React, { useState } from "react"

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

function Page() {
  const params = useParams();
  const { gameId } = params;
  const { gameData, error }: { gameData: Game, error: unknown } = useGame(gameId as string);
  const [ editingState, setEditingState ] = useState(false);

  const finishGame = (): void => {
    // call finish game
    // popup confirmation modal
  }

  const resumeOrSave = (): void => {
    if (editingState) {
      setEditingState(false);
    } else {
      setEditingState(true)
    }
  }

  const handleLifeTotal = (): void => {
    // setLifeTotal
    // add +1 / -1 buttons
  }

  return (
    gameData && !error ? (
      <>
        <div>Game: {gameId}</div>
        <div>
          <div>Name: {gameData?.game_name}</div>
          <div className="flex gap-4">
            <button
              onClick={resumeOrSave}
              className="
                rounded-lg
                px-4
                py-2
                bg-green-500
                text-white
                hover:bg-green-600
                duration-300">
                {editingState ? 'Save Changes' : 'Resume Game'}
            </button>
            <button
              onClick={finishGame}
              className="
                rounded-lg
                px-4
                py-2
                bg-blue-500
                text-white
                hover:bg-blue-600
                duration-300">
                Finish Game
            </button>
          </div>
          <div>
            {gameData?.players ? ( gameData.players.map((p, idx) => (
              <div key={idx}>
                <div>{p.name}</div>
                <div>{p.commander}</div>
                {editingState ? (
                  <input
                    type="number"
                    min="0"
                    value={p?.life_total}
                    onChange={() => handleLifeTotal}
                  ></input>
                ) : <div>{p?.life_total}</div>}
              </div>
            ))
            ) : ""}
          </div>
        </div>
      </>
    ) : (<div>error</div>)

  )
}

export default Page;