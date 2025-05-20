import { useWorldGeoDataQuery } from "@/api";
import { Feature, Guess } from "@/types";

import { getCountryGeoCoords } from "@/utils/getCountryGeoCoords";
import { getDistanceBetweenCountries } from "@/utils/getDistanceBetweenCountries";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GlobeMethods } from "react-globe.gl";

export const useGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: worldGeoData } = useWorldGeoDataQuery();
  const [countryToGuess, setCountryToGuess] = useState<Feature>();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const globeRef = useRef<GlobeMethods>();

  const countriesMap = useMemo(() => {
    const map = new Map<string, Feature>();
    worldGeoData?.features.forEach((feature) => {
      map.set(feature.properties.name, feature);
    });
    return map;
  }, [worldGeoData]);

  const onSelectCountry = useCallback(
    async (countryName: string) => {
      const country = countriesMap.get(countryName);

      if (country && globeRef.current) {
        const geoCoords = await getCountryGeoCoords(country, globeRef.current);
        globeRef.current.pointOfView(geoCoords, 700);
        const distance = getDistanceBetweenCountries(
          country,
          countryToGuess as Feature
        );

        const normalizedDistance = Math.floor(distance);
        setGuesses((prev) => [
          {
            country,
            distance: normalizedDistance,
          },
          ...prev,
        ]);
      }
    },
    [countriesMap, countryToGuess]
  );

  useEffect(() => {
    if (worldGeoData) {
      const randomIndex = Math.floor(
        Math.random() * worldGeoData.features.length
      );
      setCountryToGuess(worldGeoData.features[randomIndex]);
    }
  }, [worldGeoData]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [setIsLoading]);

  return {
    countriesMap,
    guesses,
    onSelectCountry,
    globeRef,
    countryToGuess,
    isLoading,
  };
};
