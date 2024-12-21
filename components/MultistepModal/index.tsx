import React, { useState, useEffect, MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Select, { SingleValue } from "react-select";

import { fetchCardSuggestions } from "../../hooks/useScryfall";
import useDebounce from "../../hooks/useDebounce";

interface MultiStepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlayerData {
  name: string;
  commander: string;
}

interface GameData {
  game_name: string;
  players: PlayerData[];
}

interface DropdownOption {
  value: string,
  label: string,
}

const MultiStepModal: React.FC<MultiStepModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const [step, setStep] = useState(1);
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [gameName, setGameName] = useState("");
  const [players, setPlayers] = useState([
    { name: "", commander: "", suggestions: [], life_total: 40 },
  ]);
  const [startingLife, setStartingLife] = useState(40);
  const [query, setQuery] = useState<string[]>(Array(players.length).fill(""));
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    debouncedQuery.forEach((q, index) => {
      if (!q) return; // Skip empty queries

      const fetchData = async () => {
        try {
          const suggestions = await fetchCardSuggestions(q); // API call
          setPlayers((prevPlayers) => {
            const updatedPlayers = [...prevPlayers];
            updatedPlayers[index].suggestions = suggestions; // Update suggestions
            return updatedPlayers;
          });
        } catch (error) {
          console.error(`Error fetching data for player ${index + 1}:`, error);
        }
      };

      fetchData();
    });
  }, [debouncedQuery]);

  const handleNext = () => {
    if (step === 1) {
      setPlayers(
        Array.from({ length: numberOfPlayers }, () => ({
          name: "",
          commander: "",
          suggestions: [],
          life_total: 40
        }))
      );
    } else if (step === 3) {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers.map((p) => {
          return p.suggestions = [];
        });
        return updatedPlayers;
      });
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    setStep(1);
    setNumberOfPlayers(2);
    setPlayers([{ name: "", commander: "", suggestions: [], life_total: 40 }]);
    onClose();
  };

  async function createGame(gameData: GameData) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create game");
      }

      const data = await response.json();
      console.log("Game created:", data);
      onClose();
      return data;
    } catch (error: unknown) {
      if (typeof error === "string") {
        console.error("Error creating game:", error.toUpperCase());
      } else if (error instanceof Error) {
        console.error("Error creating game:", error.message);
      }
    }
  }

  const handleCommanderSelect = (index: number, selectedOption: SingleValue<DropdownOption>) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index].commander = selectedOption?.value || '';
      return updatedPlayers;
    });
  };

  const handleLifeTotal = (lifeTotal: number) => {
    setStartingLife(lifeTotal);
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      for (const player of updatedPlayers) {
        player.life_total = lifeTotal;
      }
      return updatedPlayers;
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const gameData: GameData = {
      game_name: gameName,
      players,
    };

    await createGame(gameData);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/50 inset-0" />
        <Dialog.Content
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            maxWidth: "500px",
            maxHeight: "500px",
            height: "90%",
            width: "90%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Dialog.Title className="text-black mb-4 font-bold text-2xl">
            Create New Game
          </Dialog.Title>
          <Dialog.Description/>

          <DialogClose asChild>
            <button
              className="cursor-pointer text-2xl absolute top-4 right-4 border-none"
              aria-label="close"
            >
              &times;
            </button>
          </DialogClose>

          {step === 1 && (
            <div>
              <label>
                Name of Game
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                  type="text"
                  placeholder="Friday Night Magic"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                />
              </label>
            </div>
          )}
          {step === 2 && (
            <div>
              <label>
                Number of Players:
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                  type="number"
                  min="2"
                  max="6"
                  value={numberOfPlayers}
                  onChange={(e) =>
                    setNumberOfPlayers(
                      e.target.value ? parseInt(e.target.value, 10) : 2
                    )
                  }
                />
              </label>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col max-h-dvh">
              <div>
                {players.map((player, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <label>
                      Player {index + 1} Name:
                      <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                        type="text"
                        value={player.name}
                        onChange={(e) => {
                          const updatedPlayers = [...players];
                          updatedPlayers[index].name = e.target.value;
                          setPlayers(updatedPlayers);
                        }}
                      />
                    </label>
                    <label style={{ marginLeft: "1rem" }}>
                      Commander:
                      <div className="w-full">
                        <Select
                          classNamePrefix="react-select"
                          options={
                            player?.suggestions?.length > 0
                              ? player.suggestions.map((suggestion) => ({
                                  value: suggestion,
                                  label: suggestion,
                                }))
                              : []
                          }
                          value={{
                            value: player.commander,
                            label: player.commander,
                          }}
                          onInputChange={(inputValue) => {
                            // Update query for the specific player
                            setQuery((prevQuery) => {
                              const updatedQuery = [...prevQuery];
                              updatedQuery[index] = inputValue;
                              return updatedQuery;
                            });
                          }}
                          onChange={(selectedOption) =>
                            handleCommanderSelect(index, selectedOption)
                          }
                          placeholder="Search for a commander..."
                          isSearchable
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <label>
                Starting Life Total:
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-500"
                  type="number"
                  min="20"
                  value={startingLife}
                  onChange={(e) =>
                    handleLifeTotal(parseInt(e.target.value, 10))
                  }
                />
              </label>
            </div>
          )}

          <div className="flex justify-end">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                style={{
                  marginRight: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#eee",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                Previous
              </button>
            )}
            {step < 4 && (
              <button
                onClick={handleNext}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                onClick={handleSubmit}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Start Game
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MultiStepModal;
