import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";

import { Feature, Guess } from "@/types";

import { getDistanceBetweenCountries } from "@/utils/getDistanceBetweenCountries";
import { colorScale } from "@/lib/colorScale";

export const Globe = ({
  countryToGuess,
  guesses,
  globeRef,
}: {
  countryToGuess: Feature;
  guesses: Guess[];
  globeRef: MutableRefObject<GlobeMethods | undefined>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DOMRect>();

  const handleCountryColor = (arg: object) => {
    const country = arg as Feature;
    const isAnswer = countryToGuess.properties.name === country.properties.name;

    if (isAnswer) {
      return "green";
    }
    return colorScale(getDistanceBetweenCountries(country, countryToGuess));
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setDimensions(containerRef.current.getBoundingClientRect());
      }
    });

    observer.observe(containerRef.current);
    setDimensions(containerRef.current.getBoundingClientRect());

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="h-full flex items-center justify-center p-4"
      ref={containerRef}
    >
      {dimensions && (
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
      )}
    </div>
  );
};
