import {
  MAX_ALTITUDE,
  MAX_LONGEST_DISTANCE,
  MIN_ALTITUDE,
  MIN_LONGEST_DISTANCE,
} from "@/consts";

export const getCountryAltitude = (x: number) => {
  const a =
    (MAX_ALTITUDE - MIN_ALTITUDE) /
    (Math.log10(MAX_LONGEST_DISTANCE) - Math.log10(MIN_LONGEST_DISTANCE));
  const b = MIN_ALTITUDE - a * Math.log10(MIN_LONGEST_DISTANCE);
  return a * Math.log10(x) + b;
};
