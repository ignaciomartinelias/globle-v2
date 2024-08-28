import { Feature } from "@/types";
import { distance, point } from "@turf/turf";

export const getLongestDistanceWithinACountry = (country: Feature): number => {
  let maxDistance = 0;

  const coordinatesArray =
    country.geometry.type === "Polygon"
      ? [country.geometry.coordinates]
      : country.geometry.coordinates;

  coordinatesArray.forEach((polygonCoords) => {
    const coordinates = polygonCoords[0]; // Get the outer ring (first element)

    for (let i = 0; i < coordinates.length - 1; i++) {
      for (let j = i + 1; j < coordinates.length; j++) {
        const from = point(coordinates[i]);
        const to = point(coordinates[j]);
        const dist = distance(from, to);

        if (dist > maxDistance) {
          maxDistance = dist;
        }
      }
    }
  });

  return maxDistance;
};
