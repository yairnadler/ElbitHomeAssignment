import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const limit = 300;

const getMax = (object) => {
  return Object.keys(object).filter((x) => {
    return object[x] == Math.max.apply(null, Object.values(object));
  });
};

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

app.get("/all", async (req, res) => {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const numberOfFlights = flightsData.length;
    res.json(numberOfFlights);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/inbound", async (req, res) => {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const inboundFlights = flightsData.filter(
      (flight) => flight["CHCINT"] === null
    );
    res.json(inboundFlights.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/outbound", async (req, res) => {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const outboundFlights = flightsData.filter(
      (flight) => flight["CHCINT"] !== null
    );
    res.json(outboundFlights.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/country", async (req, res) => {
  const country = req.body["country"];
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const flightsByCountry = flightsData.filter(
      (flight) => flight["CHLOCCT"] == country
    );
    res.json(flightsByCountry.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/inbound/country", async (req, res) => {
  const country = req.body["country"];
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const flightsByCountry = flightsData.filter(
      (flight) => flight["CHLOCCT"] == country && flight["CHCINT"] === null
    );
    res.json(flightsByCountry.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/outbound/country", async (req, res) => {
  const country = req.body["country"];
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const flightsByCountry = flightsData.filter(
      (flight) => flight["CHLOCCT"] == country && flight["CHCINT"] !== null
    );
    res.json(flightsByCountry.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/delayed", async (req, res) => {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const delayedFlights = flightsData.filter(
      (flight) => flight["CHPTOL"] !== flight["CHSTOL"]
    );
    res.json(delayedFlights.length);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/mostPopular", async (req, res) => {
  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );
    const flightsData = response.data.result["records"];
    const flightsDictionary = createFlightDictionary(flightsData);
    console.log(flightsDictionary);
    const max = getMax(flightsDictionary);

    res.json(max[0]);
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
