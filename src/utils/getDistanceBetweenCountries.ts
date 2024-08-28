import { distance, point } from "@turf/turf";
import { Feature } from "@/types";

export const getDistanceBetweenCountries = (
  { geometry: countryAGeometry }: Feature,
  { geometry: countryBGeometry }: Feature
): number => {
  // Use Turf.js to calculate the distance

  const country1Polygons =
    countryAGeometry.type === "MultiPolygon"
      ? countryAGeometry.coordinates
      : [countryAGeometry.coordinates];
  const country2Polygons =
    countryBGeometry.type === "MultiPolygon"
      ? countryBGeometry.coordinates
      : [countryBGeometry.coordinates];

  let minDistance = Infinity;

  // Iterate over each polygon in the first multipolygon
  for (const polygon1Coords of country1Polygons) {
    // Iterate over each polygon in the second multipolygon
    for (const polygon2Coords of country2Polygons) {
      // Iterate over each point in the first polygon
      for (const ring1 of polygon1Coords) {
        for (const coord1 of ring1) {
          const point1 = point(coord1);

          // Iterate over each point in the second polygon
          for (const ring2 of polygon2Coords) {
            for (const coord2 of ring2) {
              const point2 = point(coord2);

              const currentDistance = distance(point1, point2, {
                units: "kilometers",
              });

              if (currentDistance === 0) {
                return 0;
              }

              if (currentDistance < minDistance) {
                minDistance = currentDistance;
              }
            }
          }
        }
      }
    }
  }

  return minDistance;
};
