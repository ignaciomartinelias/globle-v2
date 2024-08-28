import { useLayoutEffect, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "./lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Globe } from "./Globe";
import { useGame } from "./hooks/useGame";
import { Feature } from "./types";
import { CheckIcon, GlobeIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { colorScale } from "./lib/colorScale";

const sortByOptions = [
  { label: "Distance", value: "distance" },
  { label: "Guess Order", value: "guessOrder" },
];

export const Game = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect>();

  const { countriesMap, countryToGuess, globeRef, guesses, onSelectCountry } =
    useGame();

  const [sortOrder, setSortOrder] =
    useState<(typeof sortByOptions)[number]["value"]>("distance");

  const [search, setSearch] = useState("");

  const handleGuess = (countryName: string) => {
    if (!search) {
      return;
    }

    onSelectCountry(countryName);
    setSearch("");
  };

  const sortedGuesses = [...guesses].sort((a, b) => {
    if (sortOrder === "distance") {
      return a.distance - b.distance;
    }
    return 0;
  });

  useLayoutEffect(() => {
    if (containerRef.current) {
      setDimensions(containerRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full rounded-md overflow-hidden">
        <div className="flex h-full gap-4">
          <div className="w-2/3 relative flex-1 overflow-hidden rounded-md shadow-lg bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            <div
              className="h-full flex items-center justify-center p-4"
              ref={containerRef}
            >
              {dimensions && (
                <Globe
                  globeRef={globeRef}
                  dimensions={dimensions}
                  countryToGuess={countryToGuess as Feature}
                  guesses={guesses}
                />
              )}
            </div>
          </div>

          <div className="w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-md p-4 shadow-md flex flex-col">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <InfoCircledIcon className="mr-2 text-gray-500" /> Game Rules
              </h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>
                  Guess the hidden country by typing and selecting from the list
                </li>
                <li>
                  Each guess will show the distance from the target country
                </li>
                <li>Try to guess the country in as few attempts as possible</li>
                <li>
                  Use the map and previous guesses to inform your next guess
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 flex-1 flex flex-col rounded-md overflow-hidden">
              <Command
                className="rounded-md border border-gray-200 mb-4 relative h-fit overflow-visible"
                loop
              >
                <CommandInput
                  placeholder="Search country..."
                  value={search}
                  onValueChange={setSearch}
                />

                <CommandList
                  className={cn(
                    "w-full absolute -bottom-2 translate-y-full bg-white z-10 border border-gray-200 rounded drop-shadow-xl",
                    { hidden: search === "" }
                  )}
                >
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {Array.from(countriesMap.keys()).map((country) => (
                      <CommandItem
                        key={country}
                        onSelect={() => handleGuess(country)}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <CheckIcon className="mr-2 h-4 w-4 opacity-0" />
                        {country}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Guesses</h2>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortByOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 overflow-y-auto rounded-md border border-gray-200 p-4">
                <ul className="space-y-2">
                  {sortedGuesses.map((guess, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex gap-2 items-center">
                        <GlobeIcon
                          className="h-5 w-5"
                          style={{ color: colorScale(guess.distance) }}
                        />
                        <span>{guess.country.properties.name}</span>
                      </div>
                      <span className="text-gray-500">{guess.distance} km</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
