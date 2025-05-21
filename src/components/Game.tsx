import { Globe } from "./Globe";
import { useGame } from "@/hooks/useGame";
import { Feature } from "@/types";

import { Rules } from "./Rules";
import { CountryCombobox } from "./CountryCombobox";
import { GuessList } from "./GuessList";
import { GameLoader } from "./GameLoader";
import { AnimatePresence } from "motion/react";

export const Game = () => {
  const {
    countriesMap,
    countryToGuess,
    globeRef,
    guesses,
    onSelectCountry,
    isLoading,
  } = useGame();

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex gap-4 w-full h-full  container">
        <div className="w-3/5 relative flex-1 overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
          <Globe
            globeRef={globeRef}
            countryToGuess={countryToGuess as Feature}
            guesses={guesses}
          />
          <AnimatePresence>{isLoading && <GameLoader />}</AnimatePresence>
        </div>

        <div className="w-2/5 flex flex-col gap-4">
          <Rules />
          <div className=" p-4 flex-1 flex flex-col  overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100">
            <CountryCombobox
              countryList={Array.from(countriesMap.keys()).filter((c) =>
                guesses.every((guess) => guess.country.properties.name !== c)
              )}
              onSelectCountry={onSelectCountry}
              disabled={guesses.some(
                (guess) => guess.country === countryToGuess
              )}
            />
            <GuessList guesses={guesses} countryToGuess={countryToGuess} />
          </div>
        </div>
      </div>
    </div>
  );
};
