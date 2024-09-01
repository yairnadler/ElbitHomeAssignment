import axios from "axios";
import {
  BASE_URL,
  CITY_ENG,
  DEFAULT_LIMIT,
  TLV_CHECK_IN_COUNTER,
  DEP_TIME,
  FLIGHT_CODE,
  FLIGHT_NUMBER,
  STATUS_ENG,
} from "./constants.js";

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
    .filter(([_, value]) => value === max)
    .map(([key, _]) => key);

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

/**
 * Compares two times to determine if the second time is later than or equal to the first time.
 *
 * @param {string} currentTime - The reference time to compare against (ISO format string).
 * @param {string} time - The time to compare (ISO format string).
 * @returns {boolean} - Returns true if 'time' is later than or equal to 'currentTime'; otherwise, false.
 */
const isLater = (currentTime, time) => {
  const currentDate = new Date(currentTime);
  const date = new Date(time);

  return date.getTime() >= currentDate.getTime();
};

/**
 * Checks if a flight is relevant according to it's status.
 * If the flight has landed/departed or has been cancelled then it is irrelevant
 * to be able to get on that flight.
 *
 * @param {string} flightStatus - The flight's status represented as string
 * @returns - Returns true if a person can't catch this flight; otherwise, false;
 */
const isIrrelevantFlight = (flightStatus) => {
  return (
    flightStatus === "CANCELED" ||
    flightStatus === "DEPARTED" ||
    flightStatus === "LANDED"
  );
};

/**
 * Creates maps of outbound and inbound flights from the given flight data.
 *
 * @param {Array} flightsData - An array of the flights data.
 * @returns {Object} - An object containing two maps:
 *                     - outbound: Map of outbound flights by destination city.
 *                     - inbound: Map of inbound flights by destination city.
 */
const createFlightMaps = (flightsData) => {
  const outboundFlights = new Map();
  const inboundFlights = new Map();

  for (const flight of flightsData) {
    if (isIrrelevantFlight(flight[STATUS_ENG])) {
      continue;
    }
    // Check if the flight is an outbound flight
    if (flight[TLV_CHECK_IN_COUNTER]) {
      // If the destination city is not in the outboundFlights map, add it
      if (!outboundFlights.has(flight[CITY_ENG])) {
        outboundFlights.set(flight[CITY_ENG], {
          time: flight[DEP_TIME],
          "flight-code": flight[FLIGHT_CODE] + flight[FLIGHT_NUMBER],
        });
      } else {
        // If city is already in the map, check if the new flight departs later
        const currentTime = outboundFlights.get(flight[CITY_ENG])["time"];
        const currentFilghtCode = outboundFlights.get(flight[CITY_ENG])[
          "flight-code"
        ];

        // Update the map with the earlier flight time and code
        outboundFlights.set(
          flight[CITY_ENG],
          isLater(currentTime, flight[DEP_TIME])
            ? { time: currentTime, "flight-code": currentFilghtCode }
            : {
                time: flight[DEP_TIME],
                "flight-code": flight[FLIGHT_CODE] + flight[FLIGHT_NUMBER],
              }
        );
      }
    } else {
      // Process inbound flights
      if (!inboundFlights.has(flight[CITY_ENG])) {
        inboundFlights.set(flight[CITY_ENG], {
          time: flight[DEP_TIME],
          "flight-code": flight[FLIGHT_CODE] + flight[FLIGHT_NUMBER],
        });
      } else {
        const currentTime = inboundFlights.get(flight[CITY_ENG])["time"];
        const currentFilghtCode = inboundFlights.get(flight[CITY_ENG])[
          "flight-code"
        ];

        // Update the map with the later flight time and code
        inboundFlights.set(
          flight[CITY_ENG],
          isLater(currentTime, flight[DEP_TIME])
            ? {
                time: flight[DEP_TIME],
                "flight-code": flight[FLIGHT_CODE] + flight[FLIGHT_NUMBER],
              }
            : { time: currentTime, "flight-code": currentFilghtCode }
        );
      }
    }
  }

  return { outbound: outboundFlights, inbound: inboundFlights };
};

export {
  createFlightDictionary,
  fetchFlightData,
  getMax,
  createFlightMaps,
  isLater,
};
