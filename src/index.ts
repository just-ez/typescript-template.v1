import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import { logger } from "./utils/logger.js";
import { config } from "./core/config.js";
import dotenv from "dotenv";
dotenv.config();

// app init
const app = express();

// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));

import dev from "./config/developement.js";
import prod from "./config/production.js";
import test from "./config/test.js";



if (process.env.NODE_ENV === "dev") {
  dev.db().then(() =>
    app.listen(config.PORT, () => {
      logger.info(`backend running on port ${config.PORT}`);
    })
  );
}

if (process.env.NODE_ENV === "prod") {
  prod.db().then(() =>
    app.listen(config.PORT, () => {
      logger.info(`backend running on port ${config.PORT}`);
    })
  );
}

if (process.env.NODE_ENV === "test") {
  test.db().then(() =>
    app.listen(config.PORT, () => {
      logger.info(`backend running on port ${config.PORT}`);
    })
  );
}
