import express from "express";
import { getOllyoDataController } from "../controllers/ollyo.controller";

const router = express.Router();

router.get("/", getOllyoDataController);

export const OllyoRoute = router;
