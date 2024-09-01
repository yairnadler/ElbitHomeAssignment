import { Router } from "express";
import {
  getAllFlights,
  getDelayedFlights,
  getFlightsByCountryName,
  getInboundFlights,
  getInboundFlightsByCountryName,
  getMostPopularDestination,
  getOutboundFlights,
  getOutboundFlightsByCountryName,
  getQuickGetaway,
} from "../controllers/flights.controller.js";

const router = Router();

// route that returns the amount of all flights
router.get("/all", getAllFlights);

// route that returns number of all inbound flights
router.get("/inbound", getInboundFlights);

// route that returns number of all outbound flights
router.get("/outbound", getOutboundFlights);

// route that returns number of flights by country's name
router.get("/country", getFlightsByCountryName);

// route that returns all inbound flights by country's name
router.get("/inbound/country", getInboundFlightsByCountryName);

// route that returns all outbound flights by country's name
router.get("/outbound/country", getOutboundFlightsByCountryName);

// route that returns all delayed flights
router.get("/delayed", getDelayedFlights);

// route that returns the most popular destination
router.get("/mostPopular", getMostPopularDestination);

// route that returns if there is an option for a quick getaway
router.get("/getAway", getQuickGetaway);

export default router;
