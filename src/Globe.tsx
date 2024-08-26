import React, { useMemo, useState } from "react";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import * as d3 from "d3";
import { useQuery } from "@tanstack/react-query";
import { fetchWorldGeoData } from "./api";
import { Feature } from "./types";
import {
  calculateDistanceBetweenCountries,
  calculateLongestDistanceWithinACountry,
} from "./utils";
import { centroid } from "@turf/turf";

const MAX_DISTANCE_BETWEEN_COUNTRIES = 20000;
const MAX_LONGEST_DISTANCE = 8000;
const MIN_LONGEST_DISTANCE = 80;
const MAX_ALTITUDE = 2.5;
const MIN_ALTITUDE = 0.5;

const calculateAltitude = (x: number) => {
  const a =
    (MAX_ALTITUDE - MIN_ALTITUDE) /
    (Math.log10(MAX_LONGEST_DISTANCE) - Math.log10(MIN_LONGEST_DISTANCE));
  const b = MIN_ALTITUDE - a * Math.log10(MIN_LONGEST_DISTANCE);
  return a * Math.log10(x) + b;
};

const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
colorScale.domain([MAX_DISTANCE_BETWEEN_COUNTRIES, 0]);

export const Globe = () => {
  const ref = React.useRef<GlobeMethods>();

  const [text, setText] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);

  const { data: worldGeoData } = useQuery({
    queryKey: ["worldGeoData"],
    queryFn: fetchWorldGeoData,
    initialData: {
      features: [],
      type: "FeatureCollection",
    },
  });

  const countryMap = useMemo(() => {
    const map = new Map<string, Feature>();

    worldGeoData.features.forEach((feature) => {
      map.set(feature.properties.name, feature);
    });

    return map;
  }, [worldGeoData]);

  const getColor = (feat: Feature) => {
    return colorScale(
      calculateDistanceBetweenCountries(
        feat,
        countryMap.get("Argentina") as Feature
      )
    );
  };

  return (
    <div className="h-dvh relative">
      <div className="flex gap-2 fixed left-4 top-4 p-4 bg-white z-10 rounded">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="border"
        />
        <button
          className="bg-indigo-400 text-white p-2 rounded"
          onClick={() => {
            const country = worldGeoData.features.find(
              (feature) => feature.properties.name === text
            );

            if (country && ref.current) {
              const countryCentroid = centroid(country);

              const countryLongestDistance =
                calculateLongestDistanceWithinACountry(country);

              const cartesianCoords = ref.current.getCoords(
                countryCentroid.geometry.coordinates[1],
                countryCentroid.geometry.coordinates[0],
                calculateAltitude(countryLongestDistance)
              );

              const geoCoords = ref.current.toGeoCoords(cartesianCoords);

              ref.current.pointOfView(geoCoords, 700);

              setGuesses((prev) => [...prev, text]);
            }

            setText("");
          }}
        >
          submit
        </button>
      </div>
      <ReactGlobe
        ref={ref}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        polygonsData={worldGeoData.features}
        polygonAltitude={(d) =>
          guesses.includes((d as Feature).properties.name) ? 0.01 : 0
        }
        polygonCapColor={(d) =>
          guesses.includes((d as Feature).properties.name)
            ? getColor(d as Feature)
            : "transparent"
        }
        polygonSideColor={(d) =>
          guesses.includes((d as Feature).properties.name)
            ? "black"
            : "transparent"
        }
        polygonStrokeColor={(d) =>
          guesses.includes((d as Feature).properties.name)
            ? "black"
            : "transparent"
        }
        polygonLabel={(d) => {
          return (d as Feature).properties.name;
        }}
        polygonsTransitionDuration={300}
      />
    </div>
  );
};
