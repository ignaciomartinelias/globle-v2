import { fetchWorldGeoData } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useWorldGeoDataQuery = () =>
  useQuery({
    queryKey: ["worldGeoData"],
    queryFn: fetchWorldGeoData,
    initialData: {
      features: [],
      type: "FeatureCollection",
    },
  });
