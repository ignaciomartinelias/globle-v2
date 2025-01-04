import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GlobeIcon } from "@radix-ui/react-icons";
import { colorScale } from "@/lib/colorScale";
import { useState } from "react";
import { Guess } from "@/types";

const sortByOptions = [
  { label: "Distance", value: "distance" },
  { label: "Guess Order", value: "guessOrder" },
];

export const GuessList = ({ guesses }: { guesses: Guess[] }) => {
  const [sortOrder, setSortOrder] =
    useState<(typeof sortByOptions)[number]["value"]>("distance");

  const sortedGuesses = [...guesses].sort((a, b) => {
    if (sortOrder === "distance") {
      return a.distance - b.distance;
    }
    return 0;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Your Guesses</h2>

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
    </>
  );
};
