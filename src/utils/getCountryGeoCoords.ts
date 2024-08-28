import { Feature } from "@/types";
import { centroid } from "@turf/turf";
import { getLongestDistanceWithinACountry } from "./getLongestDistanceWithinACountry";
import { GlobeMethods } from "react-globe.gl";
import { getCountryAltitude } from "./getCountryAltitude";

export const getCountryGeoCoords = async (
  country: Feature,
  globeMethods: GlobeMethods
) => {
  const countryCentroid = centroid(country);

  const countryLongestDistance = getLongestDistanceWithinACountry(country);

  const cartesianCoords = globeMethods.getCoords(
    countryCentroid.geometry.coordinates[1],
    countryCentroid.geometry.coordinates[0],
    getCountryAltitude(countryLongestDistance)
  );

  return globeMethods.toGeoCoords(cartesianCoords);
};
