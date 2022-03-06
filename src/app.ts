import "reflect-metadata";
import express,  { NextFunction, Response, Request } from "express";
import "express-async-errors";
import { routes } from "./routes";
import "./database";
import "dotenv/config";
import swaggerUi from'swagger-ui-express';
import swaggerDocs from './swagger.json';


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

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