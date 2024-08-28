import { MAX_DISTANCE_BETWEEN_COUNTRIES } from "@/consts";
import * as d3 from "d3";

const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
colorScale.domain([MAX_DISTANCE_BETWEEN_COUNTRIES, 0]);

export { colorScale };
