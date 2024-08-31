import express, { json, urlencoded } from "express";
import router from "./routes/flights.routes.js";
import { PORT } from "./utils/constants.js";
import morgan from "morgan";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
