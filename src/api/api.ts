import { WorldGeoData } from "@/types";

export const fetchWorldGeoData = async () => {
  const response = await fetch("/countries.geo.json.gz");
  const data = await response.json();
  return data as WorldGeoData;
};
