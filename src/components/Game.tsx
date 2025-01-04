import { Globe } from "./Globe";
import { useGame } from "@/hooks/useGame";
import { Feature } from "@/types";

import { Rules } from "./Rules";
import { CountryCombobox } from "./CountryCombobox";
import { GuessList } from "./GuessList";

export const Game = () => {
  const { countriesMap, countryToGuess, globeRef, guesses, onSelectCountry } =
    useGame();

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full h-full rounded-md overflow-hidden container">
        <div className="flex h-full gap-4">
          <div className="w-2/3 relative flex-1 overflow-hidden rounded-md shadow-lg bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            <Globe
              globeRef={globeRef}
              countryToGuess={countryToGuess as Feature}
              guesses={guesses}
            />
          </div>

          <div className="w-1/3 flex flex-col gap-4">
            <Rules />
            <div className="bg-white p-4 flex-1 flex flex-col rounded-md overflow-hidden">
              <CountryCombobox
                countryList={Array.from(countriesMap.keys())}
                onSelectCountry={onSelectCountry}
              />
              <GuessList guesses={guesses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
