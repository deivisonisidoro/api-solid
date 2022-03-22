import 'dotenv/config'
import "reflect-metadata";
import "express-async-errors";
import "./database";

import express,  { NextFunction, Response, Request } from "express";
import swaggerUi from'swagger-ui-express';
import path from 'path';

import { routes } from "./routes";
import swaggerDocs from './swagger.json';


const app = express();

app.use(express.json());

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  }
);
export {app}; 