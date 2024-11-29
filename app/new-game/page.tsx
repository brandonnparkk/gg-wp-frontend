"use client"
import MultiStepModal from "@/components/MultistepModal";
import React, { useState } from "react";

function Game() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [players, setPlayers] = useState([
  //   { id: 1, name: "Player 1", life: 40 },
  //   { id: 2, name: "Player 2", life: 40 },
  //   { id: 3, name: "Player 3", life: 40 },
  //   { id: 4, name: "Player 4", life: 40 },
  // ]);

  // const updateLife = (id: number, change: number) => {
  //   setPlayers((prev) =>
  //     prev.map((player) =>
  //       player.id === id ? { ...player, life: player.life + change } : player
  //     )
  //   );
  // };

  // return (
  //   <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
  //     <h1>Life Counter</h1>
  //     <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
  //       {players.map((player) => (
  //         <div
  //           key={player.id}
  //           style={{
  //             border: "1px solid #ccc",
  //             borderRadius: "8px",
  //             padding: "1rem",
  //             minWidth: "150px",
  //           }}
  //         >
  //           <h2>{player.name}</h2>
  //           <h3>{player.life}</h3>
  //           <div>
  //             <button
  //               style={{
  //                 padding: "0.5rem",
  //                 margin: "0.2rem",
  //                 backgroundColor: "lightgreen",
  //                 border: "none",
  //                 borderRadius: "4px",
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => updateLife(player.id, 1)}
  //             >
  //               +1
  //             </button>
  //             <button
  //               style={{
  //                 padding: "0.5rem",
  //                 margin: "0.2rem",
  //                 backgroundColor: "lightcoral",
  //                 border: "none",
  //                 borderRadius: "4px",
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => updateLife(player.id, -1)}
  //             >
  //               -1
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex justify-center items-center flex-col h-dvh gap-9">
      <h1 className="text-3xl md:text-4xl font-medium mb-2">Start a New Game</h1>
      {!isModalOpen ? <button
        onClick={() => setIsModalOpen(true)}
        className="
          rounded-lg
          px-4
          py-2
          bg-blue-500
          text-blue-100
          hover:bg-blue-600
          duration-300">
          Start
        </button>
        :
        <MultiStepModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      }
    </div>
  );
}

export default Game;
