import axios from "axios";
import { BASE_URL, CITY_ENG, DEFAULT_LIMIT } from "./constants.js";

// function to fetch flight data from base URL
const fetchFlightData = async (limit = DEFAULT_LIMIT) => {
  const response = await axios.get(`${BASE_URL}&limit=${limit}`);
  const flightsData = response.data.result["records"];

  return flightsData;
};

// function to get the key with max value from a dictionary
const getMax = (map) => {
  const max = Math.max(...map.values());

  const results = Array.from(map.entries())
    .filter(([key, value]) => value === max)
    .map(([key, value]) => key);

  return results[0];
};

// creating flight dictionary where the key is the destanation name and
// value is number of outbound flights to that destination
const createFlightDictionary = (flightsData) => {
  const flightsMap = new Map();

  for (const flight of flightsData) {
    if (!flightsMap.has(flight[CITY_ENG])) {
      flightsMap.set(flight[CITY_ENG], 1);
    } else {
      const value = flightsMap.get(flight[CITY_ENG]);
      flightsMap.set(flight[CITY_ENG], value + 1);
    }
  }

  return flightsMap;
};

export { createFlightDictionary, fetchFlightData, getMax };
