export type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};
export type PolygonGeometry = {
  type: "Polygon";
  coordinates: number[][][];
};
export type Geometry = MultiPolygonGeometry | PolygonGeometry;

type FeatureProperties = {
  name: string; // The name of the country (lowercase)
  bbox: [number, number, number, number]; // The bounding box of the country
  centroid: [number, number]; // The centroid of the country
};

export type Feature = {
  type: "Feature";
  properties: FeatureProperties;
  geometry: Geometry;
};

export type WorldGeoData = {
  type: "FeatureCollection";
  features: Feature[];
};
