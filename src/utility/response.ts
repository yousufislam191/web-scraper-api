import { Response } from "express";
import { ErrorResponseParams, SuccessResponseParams } from "../interfaces";

const errorResponse = (
  res: Response,
  { statusCode = 500, message = "Internal Server Error" }: ErrorResponseParams
): Response => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res: Response,
  { statusCode = 200, message = "Success", payload = {} }: SuccessResponseParams
): Response => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload,
  });
};

export { errorResponse, successResponse };
