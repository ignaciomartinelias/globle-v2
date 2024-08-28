import { MutableRefObject, useLayoutEffect } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import * as d3 from "d3";

import { Feature, Guess } from "./types";

import { MAX_DISTANCE_BETWEEN_COUNTRIES } from "./consts";
import { getDistanceBetweenCountries } from "./utils/getDistanceBetweenCountries";

const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
colorScale.domain([MAX_DISTANCE_BETWEEN_COUNTRIES, 0]);

export const Globe = ({
  dimensions,
  countryToGuess,
  guesses,
  globeRef,
}: {
  dimensions: DOMRect;
  countryToGuess: Feature;
  guesses: Guess[];
  globeRef: MutableRefObject<GlobeMethods | undefined>;
}) => {
  const handleCountryColor = (arg: object) => {
    const country = arg as Feature;
    const isAnswer = countryToGuess.properties.name === country.properties.name;

    if (isAnswer) {
      return "green";
    }
    return colorScale(getDistanceBetweenCountries(country, countryToGuess));
  };

  useLayoutEffect(() => {
    globeRef.current?.pointOfView({ altitude: 3.5 });
  }, [globeRef]);

  return (
    <ReactGlobe
      width={dimensions.width - 32}
      height={dimensions.height - 32}
      ref={globeRef}
      globeImageUrl="/earth-day.webp"
      backgroundImageUrl="/night-sky.png"
      polygonsData={guesses.map((guess) => guess.country)}
      polygonAltitude={0.005}
      polygonCapColor={handleCountryColor}
      polygonSideColor={() => "black"}
      polygonStrokeColor={() => "black"}
      polygonsTransitionDuration={300}
    />
  );
};
