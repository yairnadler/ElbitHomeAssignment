import express, { json, urlencoded } from "express";
import {
  getAllFlights,
  getDelayedFlights,
  getFlightsByCountryName,
  getInboundFlights,
  getInboundFlightsByCountryName,
  getMostPopularDestinationv,
  getOutboundFlights,
  getOutboundFlightsByCountryName,
} from "./controllers/flights.controller.js";
import { PORT } from "./utils/constants.js";
import morgan from "morgan";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use('/', router);

// route that returns the amount of all flights
app.get("/all", getAllFlights);

// route that returns number of all inbound flights
app.get("/inbound", getInboundFlights);

// route that returns number of all outbound flights
app.get("/outbound", getOutboundFlights);

// route that returns number of flights by country's name
app.get("/country", getFlightsByCountryName);

// route that returns all inbound flights by country's name
app.get("/inbound/country", getInboundFlightsByCountryName);

// route that returns all outbound flights by country's name
app.get("/outbound/country", getOutboundFlightsByCountryName);

// route that returns all delayed flights
app.get("/delayed", getDelayedFlights);

// route that returns the most popular destination
app.get("/mostPopular", getMostPopularDestinationv);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
