import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8080;
const limit = 300;
const baseURL = `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`;

// function to fetch flight data from base URL
const fetchFlightData = async () => {
  const response = await axios.get(baseURL);
  const flightsData = response.data.result["records"];

  return flightsData;
};

// function to get the key with max value from a dictionary
const getMax = (object) => {
  return Object.keys(object).filter((x) => {
    return object[x] == Math.max.apply(null, Object.values(object));
  });
};

// creating flight dictionary where the key is the destanation name and
// value is number of outbound flights to that destination
const createFlightDictionary = (flightsData) => {
  let flightsDictionary = {};
  for (let i = 0; i < flightsData.length; i++) {
    let flight = flightsData[i];
    if (flightsDictionary[flight["CHLOC1T"]] == null) {
      flightsDictionary[flight["CHLOC1T"]] = 1;
    } else {
      flightsDictionary[flight["CHLOC1T"]] += 1;
    }
  }

  return flightsDictionary;
};

app.use(bodyParser.json({ extended: true }));

// route that returns the amount of all flights
app.get("/all", async (req, res) => {
  try {
    const flightsData = await fetchFlightData();
    const numberOfFlights = flightsData.length;
    res.json(numberOfFlights);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns number of all inbound flights
app.get("/inbound", async (req, res) => {
  try {
    const flightsData = await fetchFlightData();
    const inboundFlights = flightsData.filter(
      (flight) => flight["CHCINT"] === null
    );
    res.json(inboundFlights.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns number of all outbound flights
app.get("/outbound", async (req, res) => {
  try {
    const flightsData = await fetchFlightData();
    const outboundFlights = flightsData.filter(
      (flight) => flight["CHCINT"] !== null
    );
    res.json(outboundFlights.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns number of flights by country's name
app.get("/country", async (req, res) => {
  const country = req.body["country"].toUpperCase();
  try {
    const flightsData = await fetchFlightData();
    const flightsByCountry = flightsData.filter(
      (flight) => flight["CHLOCCT"] == country
    );
    res.json(flightsByCountry.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns all inbound flights by country's name
app.get("/inbound/country", async (req, res) => {
  const country = req.body["country"].toUpperCase();
  try {
    const flightsData = await fetchFlightData();
    const flightsByCountry = flightsData.filter(
      (flight) => flight["CHLOCCT"] == country && flight["CHCINT"] === null
    );
    res.json(flightsByCountry.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns all outbound flights by country's name
app.get("/outbound/country", async (req, res) => {
  const country = req.body["country"].toUpperCase();
  try {
    const flightsData = await fetchFlightData();
    const flightsByCountry = flightsData.filter(
      (flight) => flight["CHLOCCT"] == country && flight["CHCINT"] !== null
    );
    res.json(flightsByCountry.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns all delayed flights
app.get("/delayed", async (req, res) => {
  try {
    const flightsData = await fetchFlightData();
    const delayedFlights = flightsData.filter(
      (flight) => flight["CHPTOL"] !== flight["CHSTOL"]
    );
    res.json(delayedFlights.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// route that returns the most popular destination
app.get("/mostPopular", async (req, res) => {
  try {
    const flightsData = await fetchFlightData();
    const outboundFlights = flightsData.filter(
      (flight) => flight["CHCINT"] !== null
    );
    const flightsDictionary = createFlightDictionary(outboundFlights);
    const max = getMax(flightsDictionary);

    res.json(max[0]);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
