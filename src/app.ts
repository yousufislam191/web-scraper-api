import express, { Application, Request, NextFunction, Response } from "express";
import { errorResponse } from "./utility/response";
import { OllyoRoute } from "./routes/ollyo.routes";

const app: Application = express();
app.use(express.json());

// app.get("/", (req: Request, res: Response): Response => {
//   return res.status(200).json("Service is running.");
// });

app.use("/api/v1/scrape", OllyoRoute);

// server error handling --> all errors handeled finally
app.use(
  (err: any, req: Request, res: Response, next: NextFunction): Response => {
    return errorResponse(res, {
      statusCode: err.status,
      message: err.message,
    });
  }
);

export { app };
