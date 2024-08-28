import { useLayoutEffect, useRef, useState } from "react";
import * as Icons from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export const Game = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect>();

  const { countriesMap, countryToGuess, globeRef, guesses, onSelectCountry } =
    useGame();

  const [sortOrder, setSortOrder] = useState("newest");

  const [search, setSearch] = useState("");

  const handleGuess = (countryName: string) => {
    if (!search) {
      return;
    }

    onSelectCountry(countryName);
    setSearch("");
  };

  const sortedGuesses = [...guesses].sort((a, b) => {
    if (sortOrder === "nearest") return a.distance - b.distance;
    if (sortOrder === "farthest") return b.distance - a.distance;
    return 0;
  });

  useLayoutEffect(() => {
    if (containerRef.current) {
      setDimensions(containerRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div className="max-h-screen h-dvh bg-gray-100 text-gray-800 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full p-4 gap-4">
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
            Guess the Country
          </h1>

          <div className="relative flex-1 mb-4 overflow-hidden rounded-lg shadow-lg bg-white">
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
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-lg p-4 shadow-md flex flex-col h-full">
            <Command
              className="rounded-lg border border-gray-200 mb-4 relative h-fit overflow-visible"
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
                      <Icons.CheckIcon className="mr-2 h-4 w-4 opacity-0" />
                      {country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>

            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Previous Guesses</h2>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="nearest">Nearest</SelectItem>
                    <SelectItem value="farthest">Farthest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="flex-1 rounded-md border border-gray-200">
                <div className="p-4">
                  {sortedGuesses.map((guess, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <span>{guess.country.properties.name}</span>
                      <span className="text-gray-500">{guess.distance} km</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Icons.InfoCircledIcon className="mr-2 text-gray-500" /> Game
              Rules
            </h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>
                Guess the hidden country by typing and selecting from the list
              </li>
              <li>Each guess will show the distance from the target country</li>
              <li>Try to guess the country in as few attempts as possible</li>
              <li>
                Use the map and previous guesses to inform your next guess
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
