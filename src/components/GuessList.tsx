"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { colorScale } from "@/lib/colorScale";
import { useState } from "react";
import type { Feature, Guess } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sortByOptions = [
  { label: "Distance", value: "distance" },
  { label: "Guess Order", value: "guessOrder" },
];

const ColorLegend = () => {
  return (
    <div className="flex gap-2 mb-4 items-center">
      <div className="w-full bg-gradient-to-r from-yellow-50 via-orange-400 to-red-800 h-2 rounded-full" />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="inline-flex items-center">
              <InfoCircledIcon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p>
              Colors indicate how close your guess is to the target country. Red
              means very close, yellow means far away.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const GuessList = ({
  guesses,
  countryToGuess,
}: {
  guesses: Guess[];
  countryToGuess?: Feature;
}) => {
  const [sortOrder, setSortOrder] =
    useState<(typeof sortByOptions)[number]["value"]>("distance");

  const sortedGuesses = [...guesses].sort((a, b) => {
    if (sortOrder === "distance") {
      return a.distance - b.distance;
    }
    return 0;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
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

      <ColorLegend />

      <div className="flex-1 overflow-y-auto rounded-md border border-gray-200 px-4 py-2">
        {guesses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-blue-500 py-8">
            <GlobeIcon className="h-12 w-12 mb-2 opacity-50 text-b" />
            <p>No guesses yet</p>
            <p>Start guessing countries!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {sortedGuesses.map((guess, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
              >
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <GlobeIcon
                      className="h-5 w-5"
                      style={{
                        color:
                          countryToGuess?.properties.name ===
                          guess.country.properties.name
                            ? "green"
                            : colorScale(guess.distance),
                      }}
                    />
                    {countryToGuess?.properties.name ===
                      guess.country.properties.name && (
                      <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <span>{guess.country.properties.name}</span>
                </div>
                <span className="text-gray-500">{guess.distance} km</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
