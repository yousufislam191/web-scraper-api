import { Request, Response, NextFunction } from "express";
import { getOllyoData } from "../services/ollyo.service";
import { authenticate } from "../services/auth.service";

/**
 * Retrieves Ollyo data and sends it as a JSON response if successful, otherwise passes the error to the next middleware.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware function
 * @return {Promise<void>} Promise that resolves when the function completes
 */
const getOllyoDataController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sheets = await authenticate();
    const jobData = await getOllyoData(sheets);
    return res
      .status(201)
      .json({ msg: "Data inserted successfully", data: jobData });
    // .json(jobData);
  } catch (error) {
    next(error);
  }
};

export { getOllyoDataController };
