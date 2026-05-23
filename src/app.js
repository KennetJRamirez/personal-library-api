import express from "express";
import dotenv from "dotenv/config";
import cookieParser from "cookie-parser";
import { apiLimiter } from "./middlewares/apiRateLimitMiddleware.js";

const app = express();

app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
export default app;
