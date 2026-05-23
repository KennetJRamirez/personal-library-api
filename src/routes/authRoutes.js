import { Router } from "express";
import authController from "../controllers/authController.js";
import { loginSchema } from "../validators/loginValidator.js";
import { validateRequest } from "../middlewares/validateRequestMiddleware.js";
import { authLimiter } from "../middlewares/authRateLimitMiddleware.js";

const router = Router();

router.post(
  "/login",
  authLimiter,
  validateRequest(loginSchema),
  authController.login,
);

router.post("/logout", authController.logout);

export default router;
