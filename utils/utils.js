import axios from "axios";
import { BASE_URL, CITY_ENG, DEFAULT_LIMIT } from "./constants.js";

/**
 * Fetch flight data from base URL.
 * @param {number} limit - The maximum number of flights to retrieve.
 * @returns {Promise<Array>} - A promise that resolves to an array of flight records.
 */
const fetchFlightData = async (limit = DEFAULT_LIMIT) => {
  const response = await axios.get(`${BASE_URL}&limit=${limit}`);
  const flightsData = response.data.result["records"];

  return flightsData;
};

/**
 * Get the key with the max value from a Map.
 * @param {Map} map - A map object where the values are numbers.
 * @returns {any} - The key corresponding to the maximum value.
 */
const getMax = (map) => {
  const max = Math.max(...map.values());

  // Filter entries to get all keys with the maximum value
  const results = Array.from(map.entries())
    .filter(([key, value]) => value === max)
    .map(([key, value]) => key);

  return results[0];
};

/**
 * creating flight dictionary (Map) where the key is the destanation name and
 * value is number of outbound flights to that destination.
 * @param {Array} flightsData - An array of the flights data.
 * @returns {Map} - A map withg destination names as keys and flight counts as values.
 */
const createFlightDictionary = (flightsData) => {
  const flightsMap = new Map();

  // Iterate over the flights' data and populate the Map with destination counts
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
