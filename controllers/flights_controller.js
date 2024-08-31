import {
  COUNTRY_ENG,
  DEP_TIME,
  EST_DEP_TIME,
  TLV_CHECK_IN_COUNTER,
} from "../utils/constants.js";
import {
  createFlightDictionary,
  fetchFlightData,
  getMax,
} from "../utils/utils.js";

/**
 * Get the total number of flights.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getAllFlights = async (req, res) => {
  try {
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const numberOfFlights = flightsData.length;

    res.status(200).send(JSON.stringify(numberOfFlights));
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the total number of inbound flights (flights without a check-in counter).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getInboundFlights = async (req, res) => {
  try {
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const inboundFlights = flightsData.filter(
      (flight) => !flight[TLV_CHECK_IN_COUNTER]
    );

    res.status(200).send(JSON.stringify(inboundFlights.length));
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the total number of outbound flights (flights with a check-in counter).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getOutboundFlights = async (req, res) => {
  try {
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const outboundFlights = flightsData.filter(
      (flight) => flight[TLV_CHECK_IN_COUNTER]
    );

    res.status(200).send(JSON.stringify(outboundFlights.length));
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the total number of flights by country name.
 * @param {Object} req - The request object containing the country name in the body.
 * @param {Object} res - The response object.
 */
export const getFlightsByCountryName = async (req, res) => {
  let country = req.body["country"];
  if (!country) {
    return res.status(400).send("No country name was provided");
  }

  try {
    country = country.toUpperCase();
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const flightsByCountry = flightsData.filter(
      (flight) => flight[COUNTRY_ENG] === country
    );

    res.status(200).send(JSON.stringify(flightsByCountry.length));
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the total number of inbound flights by country name.
 * @param {Object} req - The request object containing the country name in the body.
 * @param {Object} res - The response object.
 */
export const getInboundFlightsByCountryName = async (req, res) => {
  let country = req.body["country"];
  if (!country) {
    return res.status(400).send("No country name was provided");
  }
  try {
    country = country.toUpperCase();
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const flightsByCountry = flightsData.filter(
      (flight) =>
        flight[COUNTRY_ENG] === country && !flight[TLV_CHECK_IN_COUNTER]
    );

    res.status(200).send(JSON.stringify(flightsByCountry.length));
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the total number of outbound flights by country name.
 * @param {Object} req - The request object containing the country name in the body.
 * @param {Object} res - The response object.
 */
export const getOutboundFlightsByCountryName = async (req, res) => {
  let country = req.body["country"];
  if (!country) {
    return res.status(400).send("No country name was provided");
  }
  try {
    country = country.toUpperCase();
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const flightsByCountry = flightsData.filter(
      (flight) =>
        flight[COUNTRY_ENG] === country && flight[TLV_CHECK_IN_COUNTER]
    );

    res.status(200).send(JSON.stringify(flightsByCountry.length));
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the total number of delayed flights.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getDelayedFlights = async (req, res) => {
  try {
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const delayedFlights = flightsData.filter(
      (flight) => flight[EST_DEP_TIME] !== flight[DEP_TIME]
    );

    if (delayedFlights.length === 0) {
      res.status(200).send("All flights departed on time");
    } else {
      res.status(200).send(JSON.stringify(delayedFlights.length));
    }
  } catch (error) {
    res.status(400).send("No flights found");
    console.error("Failed to make request:", error.message);
  }
};

/**
 * Get the most popular destination based on outbound flights.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const getMostPopularDestination = async (req, res) => {
  try {
    const limit = req.query['limit'];
    const flightsData = await fetchFlightData(limit ? limit : undefined);
    const outboundFlights = flightsData.filter(
      (flight) => flight[TLV_CHECK_IN_COUNTER]
    );
    const flightsDictionary = createFlightDictionary(outboundFlights);
    const mostPopularDestination = getMax(flightsDictionary);

    res.status(200).send(JSON.stringify(mostPopularDestination));
  } catch (error) {
    res.status(400).send("Most popular destination not found");
    console.error("Failed to make request:", error.message);
  }
};
